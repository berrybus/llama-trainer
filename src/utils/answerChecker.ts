"use client";

import Fuse from "fuse.js";
import {distance} from "fastest-levenshtein";

interface SearchResult {
    score: number;
}

const slashPattern = /^(.+)\/(.+)$/
const parenAlternateAnswerPattern = /^(.+)\s+\((.+)\)$/
const needsManyUserAnswersPattern = /((identify|name|give) (both|all)|(what (two|three) ))/;

function isFuseValid(supposedlyCorrectAnswer: string, userProvidedAnswer: string) {
    const fuse = new Fuse([supposedlyCorrectAnswer], {
        includeScore: true,
        location: supposedlyCorrectAnswer.length - userProvidedAnswer.length,
        distance: supposedlyCorrectAnswer.length * 1.2,
        threshold: 2,
    });
    const res: Array<Fuse.FuseResult<SearchResult>> = fuse.search(userProvidedAnswer);
    return res.length > 0 && res[0].score !== undefined && res[0].score <= 0.4
}

function isLevenshteinValid(supposedlyCorrectAnswer: string, userProvidedAnswer: string) {
    const totalLength = Math.max(1, supposedlyCorrectAnswer.length)
    return distance(supposedlyCorrectAnswer, userProvidedAnswer) / totalLength <= 0.25
}
export function checkSingleAnswer(supposedlyCorrectAnswer: string, userProvidedAnswer: string) {
    const fuseValid = isFuseValid(supposedlyCorrectAnswer, userProvidedAnswer);
    const levenshteinValid = isLevenshteinValid(supposedlyCorrectAnswer, userProvidedAnswer);
    return fuseValid || levenshteinValid
}

// answers of the form "national labor relations board (nlrb)"
// it is not generally true that an answer in parens is an alternate answer,
// but this is good enough. some questions will always be wrong
function getParensAnswers(answer: string): Array<string> {
    let parenAlternateAnswer = parenAlternateAnswerPattern[Symbol.match](answer)
    if (parenAlternateAnswer === null) {
        return [answer]
    } else {
        return [parenAlternateAnswer[1], parenAlternateAnswer[2]]
    }
}

// answers of the form "trefoil/shortbread"
function getSlashAnswers(answer: string): Array<string> {
    let slashAnswers = slashPattern[Symbol.match](answer)
    if (slashAnswers === null) {
        return [answer]
    } else {
        return [slashAnswers[1], slashAnswers[2]]
    }
}


export function checkAnswer(questionPrompt: string, questionAnswer: string, userInput: string): Boolean {
    // do a quick and naive but strict check
    if (checkSingleAnswer(questionAnswer, userInput)) {
        return true
    }

    let answers = getSlashAnswers(questionAnswer.toLowerCase())
        .flatMap(a => a.split(", "))
        .flatMap(getParensAnswers)

    let userAnswers = userInput.split(",")
    let markedAnswers = answers
        .map(a => userAnswers.map(ua => checkSingleAnswer(a, ua)).includes(true))
        .filter(b => b)

    let questionNeedsManyAnswers = needsManyUserAnswersPattern.test(questionPrompt)
    return markedAnswers.length > (questionNeedsManyAnswers ? 1 : 0)
}

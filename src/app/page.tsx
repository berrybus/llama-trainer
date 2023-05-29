"use client";

import type {NextPage} from "next";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import React, {useEffect, useRef, useState} from "react";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import {checkAnswer} from "@/utils/answerChecker";
import {QuestionId} from "@/app/questionId";
import {AnswerRatio} from "@/app/answerRatio";
import {LocalDatabase} from "@/app/LocalDatabase";
import ResetAnswerHistoryConfirmation from "@/app/resetAnswerHistoryConfirmation";

function randomInt(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let currentData: Question;
let isShowingAnswer = true;
let [minLeague, maxLeague] = [60, 96];
let [minDay, maxDay] = [1, 25];
let [minIndex, maxIndex] = [0, 5];

let answerRatio: AnswerRatio = {
  correct: 0,
  total: 0,
};

let answerRatioByCategory: { [category: string]: AnswerRatio } = {};
let localDatabase = new LocalDatabase(localStorage)

export interface MatchDayListing {
  date: string;
  league: string;
  day: string;
  questions: Array<Question>;
}

export interface Question {
  image: string;
  answer: string;
  prompt: string;
  category: string;
  a_percent: string;
  b_percent: string;
  c_percent: string;
  d_percent: string;
  e_percent: string;
}

const Home: NextPage = () => {
  const [searchParams, setSearchParams] = useState<ReadonlyURLSearchParams>(useSearchParams());
  const [questionId, setQuestionId] = useState<QuestionId>({ league: 0, day: 0, index: 0 });
  const [prompt, setPrompt] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [a, setA] = useState<string>(" ");
  const [b, setB] = useState<string>(" ");
  const [c, setC] = useState<string>(" ");
  const [d, setD] = useState<string>(" ");
  const [e, setE] = useState<string>(" ");
  const [input, setInput] = useState<string>("");
  const [correct, setCorrect] = useState<boolean>(true);
  const [isConfirmingReset, setIsConfirmingReset] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function inputClassName() {
    if (isShowingAnswer) {
      return correct ? " input-success" : " input-error";
    } else {
      return "";
    }
  }

  function getNumericQuery(q: string | null): number | null {
    if (q === null) {
      return null
    }

    return parseInt(q, 10)
  }
  function getNextQuestion(): QuestionId {
    const randomQuestion = {
      league: randomInt(minLeague, maxLeague),
      day: randomInt(minDay, maxDay),
      index: randomInt(minIndex, maxIndex)
    }

    const queryLeague = getNumericQuery(searchParams.get("league"))
    if (queryLeague !== null && queryLeague >= minLeague && queryLeague <= maxLeague) {
      randomQuestion.league = queryLeague
    }

    const queryDay = getNumericQuery(searchParams.get("day"))
    if (queryDay !== null && queryDay >= minDay && queryDay <= maxDay ) {
      randomQuestion.day = queryDay
    }

    const queryIndex = getNumericQuery(searchParams.get("index"))
    if (queryIndex !== null && queryIndex >= minIndex && queryIndex <= maxIndex) {
      randomQuestion.index = queryIndex
    }

    return randomQuestion
  }

  const fetchData = async () => {
    try {
      const nextQuestionId = getNextQuestion()
      setQuestionId(nextQuestionId)
      console.log(`fetching league ${nextQuestionId.league} on day ${nextQuestionId.day}`);
      const response = await fetch(`data/league${nextQuestionId.league}_day${nextQuestionId.day}.json`);
      const jsonData: MatchDayListing = await response.json();
      const qData: Question = jsonData.questions[nextQuestionId.index];
      currentData = qData;
      setPrompt(qData.prompt);
      setCategory(qData.category);
      setDate(jsonData.date);
      if (qData.image != null) {
        const imageURL =
          "https://learnedleague.com" + String(currentData.image);
        setImage(imageURL);
      } else {
        setImage("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "n") {
        if (isShowingAnswer) {
          HandleNext();
          event.preventDefault();
        }
      }
    };

    HandleNext();

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isShowingAnswer && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowingAnswer]);

  const HandleNext = () => {
    if (isShowingAnswer) {
      fetchData();
      setAnswer("");
      setInput("");
      setA("");
      setB("");
      setC("");
      setD("");
      setE("");
    } else {

      let answerIsCorrect = checkAnswer(currentData.prompt, currentData.answer, input)

      if (answerRatioByCategory[currentData.category] === undefined) {
        answerRatioByCategory[currentData.category] = { correct: 0, total: 0 };
      }

      if (answerIsCorrect) {
        answerRatio.correct += 1;
        answerRatioByCategory[currentData.category].correct += 1;
        setCorrect(true);
        localDatabase.markAnswerAsCorrect(questionId)
      } else {
        setCorrect(false);
        localDatabase.markAnswerAsIncorrect(questionId)
      }
      setAnswer(currentData.answer);
      setA(currentData.a_percent);
      setB(currentData.b_percent);
      setC(currentData.c_percent);
      setD(currentData.d_percent);
      setE(currentData.e_percent);
      answerRatio.total += 1;
      answerRatioByCategory[currentData.category].total += 1;
    }
    isShowingAnswer = !isShowingAnswer;
  };

  const resetAnswerHistory = () => {
    localDatabase.reset()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isShowingAnswer) {
      const value = event.target.value;
      setInput(value);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isShowingAnswer && event.key === "Enter" && input != "") {
      HandleNext();
    }
  };

  const renderRatio = (ratio: AnswerRatio) => {
    let literalFraction = `${ratio.correct}/${ratio.total}`
    let totalDenominator = ratio.total === 0 ? 1 : ratio.total
    let percentage = ratio.correct / totalDenominator * 100

    return <span>{literalFraction} ({percentage.toFixed(2)}%)</span>
  }

  let shouldShowImage =
    image !== "" && (image.endsWith(".jpg") || image.endsWith(".png"));
  let shouldShowLink =
    image !== "" && !(image.endsWith(".jpg") || image.endsWith(".png"));

  return (
    <div className="container mx-auto">
      <ResetAnswerHistoryConfirmation
          isOpen={isConfirmingReset}
          onConfirm={() => {
            resetAnswerHistory()
            setIsConfirmingReset(false)
          }}
          onCancel={() => setIsConfirmingReset(false)}/>
      <div className="flex flex-row items-start gap-4 flex-wrap md:flex-nowrap">
        <div className="container basis-full shrink-0 md:basis-2/3">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex flex-row justify-between flex-wrap">
                <h3 className="card-title">
                  {category} - {date}
                </h3>
                <h3 className="card-title">
                  League {questionId.league} - Day {questionId.day}
                </h3>
              </div>
              <p>{prompt}</p>
              {shouldShowImage ? (
                <figure className="px-10 pt-10">
                  <img src={image} alt={image}></img>
                </figure>
              ) : (
                ""
              )}
              {shouldShowLink ? (
                <a
                  className="link"
                  href={image}
                  target="_blank"
                  hidden={image == ""}
                >
                  Click here
                </a>
              ) : (
                ""
              )}
              <h2
                className={
                  "font-bold mt-2" + (isShowingAnswer ? "" : " hidden")
                }
              >
                ANSWER - {answer}
              </h2>
              <div className="flex flex-row gap-4 mt-6">
                <input
                  type="text"
                  placeholder="Type the answer"
                  className={"input input-bordered w-full" + inputClassName()}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  ref={inputRef}
                  readOnly={isShowingAnswer}
                />
                <div
                  className="tooltip tooltip-primary hidden md:block"
                  data-tip={isShowingAnswer ? "Shortcut: N" : "Shortcut: Enter"}
                >
                  <button
                    className="btn btn-primary"
                    onClick={HandleNext}
                    disabled={input == ""}
                  >
                    {isShowingAnswer ? "Next" : "Check"}
                  </button>
                </div>
                <button
                  className="btn btn-primary block md:hidden"
                  onClick={HandleNext}
                  disabled={input == ""}
                >
                  {isShowingAnswer ? "Next" : "Check"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow basis-full shrink md:basis-1/3">
          <div className="card-body">
            <h3 className="card-title">Correct % per level</h3>
            <table className="table table-compact text-center">
              <thead>
                <tr>
                  <th style={{zIndex: 10}}>A</th>
                  <th>B</th>
                  <th>C</th>
                  <th>D</th>
                  <th>E</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{a}</td>
                  <td>{b}</td>
                  <td>{c}</td>
                  <td>{d}</td>
                  <td>{e}</td>
                </tr>
              </tbody>
            </table>
            <h3 className="card-title">
              Total score: {renderRatio(answerRatio)}
            </h3>
            <table className="table table-compact text-center">
              <thead>
                <tr>
                  <th style={{zIndex: 10}}>Category</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(answerRatioByCategory).map(
                  ([category, answerRatio]) => {
                    return (
                      <tr key={category}>
                        <td>{category}</td>
                        <td>
                          {renderRatio(answerRatio)}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            <h3 className="card-title">Settings</h3>
              <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setIsConfirmingReset(true)}
                >
                  Reset Answer History
                </button>
              </div>
            <p>TODO: Add more features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

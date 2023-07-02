"use client";

import type {NextPage} from "next";
import React, {useEffect, useRef, useState} from "react";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import {checkAnswer} from "@/utils/answerChecker";
import {QuestionId} from "@/app/questionId";
import {AnswerRatio} from "@/app/answerRatio";
import {LocalDatabase} from "@/app/localDatabase";
import ResetAnswerHistoryConfirmation from "@/app/resetAnswerHistoryConfirmation";
import {GameMode} from "@/app/gameMode";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {Question} from "@/app/question";
import {AnswerAction} from "@/app/answerAction";

function randomInt(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let currentData: Question;
let [minLeague, maxLeague] = [60, 96];
let [minDay, maxDay] = [1, 25];
let [minIndex, maxIndex] = [0, 5];

let answerRatio: AnswerRatio = {
  correct: 0,
  total: 0,
};

let answerRatioByCategory: { [category: string]: AnswerRatio } = {};

export interface MatchDayListing {
  date: string;
  league: string;
  day: string;
  questions: Array<Question>;
}

const Home: NextPage = () => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [searchParams, _] = useState<ReadonlyURLSearchParams>(
    useSearchParams()
  );
  const [localDatabase, setLocalDatabase] = useState<LocalDatabase>(
    new LocalDatabase(typeof window === "undefined" ? undefined : localStorage)
  );
  const [questionId, setQuestionId] = useState<QuestionId>({
    league: 0,
    day: 0,
    index: 0,
  });
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.REGULAR);
  const [prompt, setPrompt] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [currentAnswerAction, setCurrentAnswerAction] = useState<AnswerAction | null>(null);
  const [image, setImage] = useState<string>("");
  const [a, setA] = useState<string>(" ");
  const [b, setB] = useState<string>(" ");
  const [c, setC] = useState<string>(" ");
  const [d, setD] = useState<string>(" ");
  const [e, setE] = useState<string>(" ");
  const [input, setInput] = useState<string>("");
  const [correct, setCorrect] = useState<boolean>(true);
  const [showCategoryDetail, setShowCategoryDetail] = useState<boolean>(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState<boolean>(false);
  const [isShowingAnswer, setIsShowingAnswer] = useState<boolean>(true);
  const [gradeWasMarkedWrong, setGradeWasMarkedWrong] = useState<boolean>(false);

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
      return null;
    }

    return parseInt(q, 10);
  }

  function getNextRegularQuestion(): QuestionId {
    const randomQuestion = {
      league: randomInt(minLeague, maxLeague),
      day: randomInt(minDay, maxDay),
      index: randomInt(minIndex, maxIndex),
    };

    const queryLeague = getNumericQuery(searchParams.get("league"));
    if (
      queryLeague !== null &&
      queryLeague >= minLeague &&
      queryLeague <= maxLeague
    ) {
      randomQuestion.league = queryLeague;
    }

    const queryDay = getNumericQuery(searchParams.get("day"));
    if (queryDay !== null && queryDay >= minDay && queryDay <= maxDay) {
      randomQuestion.day = queryDay;
    }

    const queryIndex = getNumericQuery(searchParams.get("index"));
    if (
      queryIndex !== null &&
      queryIndex >= minIndex &&
      queryIndex <= maxIndex
    ) {
      randomQuestion.index = queryIndex;
    }

    return randomQuestion;
  }

  function getNextPracticeQuestion(): QuestionId {
    const questions = localDatabase.getPracticeQuestions();
    const index = randomInt(0, questions.length);
    console.log(questions);
    return questions[index];
  }

  function getNextQuestion(): QuestionId {
    if (gameMode === GameMode.PRACTICE) {
      return getNextPracticeQuestion();
    } else {
      return getNextRegularQuestion();
    }
  }

  const fetchData = async () => {
    try {
      console.log("GameMode[gameMode] in fetchData");
      console.log(GameMode[gameMode]);
      const nextQuestionId = getNextQuestion();
      setQuestionId(nextQuestionId);
      console.log(
        `fetching league ${nextQuestionId.league} on day ${nextQuestionId.day} for mode ${GameMode[gameMode]}`
      );
      const response = await fetch(
        `data/league${nextQuestionId.league}_day${nextQuestionId.day}.json`
      );
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "n") {
      if (isShowingAnswer) {
        HandleNext();
        event.preventDefault();
      }
    }
  };

  const changeGameMode = (mode: GameMode) => {
    setGameMode(mode);
  };

  // attachment of event listener has dependencies, and so we must
  // reregister every time these dependencies change
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShowingAnswer, gameMode]);

  useEffect(() => {
    setHasMounted(true);
    HandleNext();
  }, []);

  useEffect(() => {
    if (!isShowingAnswer && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowingAnswer]);

  useEffect(() => {
    console.log("game mode changed");
    fetchData();
  }, [gameMode]);

  const HandleNext = () => {
    console.log("handling next");
    console.log(isShowingAnswer);
    if (isShowingAnswer) {
      fetchData();
      setAnswer("");
      setInput("");
      setGradeWasMarkedWrong(false);
      setA("");
      setB("");
      setC("");
      setD("");
      setE("");
    } else {
      let answerIsCorrect = checkAnswer(
        currentData.prompt,
        currentData.answer,
        input
      );

      let answerAction: AnswerAction = {
        currentData,
        questionId,
        isCorrect: answerIsCorrect
      }

      setCurrentAnswerAction(answerAction);

      if (answerRatioByCategory[currentData.category] === undefined) {
        answerRatioByCategory[currentData.category] = { correct: 0, total: 0 };
      }

      if (answerIsCorrect) {
        answerRatio.correct += 1;
        answerRatioByCategory[currentData.category].correct += 1;
        setCorrect(true);
        localDatabase.markAnswerAsCorrect(questionId);
      } else {
        setCorrect(false);
        localDatabase.markAnswerAsIncorrect(questionId);
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

    console.log(`setting is showing answer :${!isShowingAnswer}`);
    setIsShowingAnswer(!isShowingAnswer);
  };

  const handleUndoAnswerAction = (answerAction: AnswerAction) => {
    setGradeWasMarkedWrong(true);
    if (answerAction.isCorrect) {
      answerRatio.correct -= 1;
      answerRatioByCategory[answerAction.currentData.category].correct -= 1;
      localDatabase.unmarkAnswerAsCorrect(answerAction.questionId)
    } else {
      answerRatio.correct += 1;
      answerRatioByCategory[answerAction.currentData.category].correct += 1;
      localDatabase.unmarkAnswerAsIncorrect(answerAction.questionId)
    }
    setCorrect(!answerAction.isCorrect)
  }


  const resetAnswerHistory = () => {
    localDatabase.reset();
  };

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

  const handleToggleCategory = () => {
    setShowCategoryDetail(!showCategoryDetail);
  };

  const renderRatio = (ratio: AnswerRatio) => {
    let literalFraction = `${ratio.correct}/${ratio.total}`;
    let totalDenominator = ratio.total === 0 ? 1 : ratio.total;
    let percentage = (ratio.correct / totalDenominator) * 100;

    return (
      <span>
        {literalFraction} ({percentage.toFixed(2)}%)
      </span>
    );
  };

  const renderGradeUndoButton = () => {
    return <button
        className="btn btn-warning"
        onClick={() => currentAnswerAction ? handleUndoAnswerAction(currentAnswerAction) : null}
        disabled={gradeWasMarkedWrong}
    >
      { gradeWasMarkedWrong ? 'Fixed!' : 'Wrong?' }
    </button>
  }

  let shouldShowImage =
    image !== "" && (image.endsWith(".jpg") || image.endsWith(".png"));
  let shouldShowLink =
    image !== "" && !(image.endsWith(".jpg") || image.endsWith(".png"));

  let isEligibleForPractice = localDatabase.isEligibleForPractice();

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <ResetAnswerHistoryConfirmation
        isOpen={isConfirmingReset}
        onConfirm={() => {
          resetAnswerHistory();
          setIsConfirmingReset(false);
        }}
        onCancel={() => setIsConfirmingReset(false)}
      />
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
              <div className="flex flex-row gap-2 mt-6">
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
                {
                  isShowingAnswer ? (
                        gradeWasMarkedWrong ? renderGradeUndoButton() :
                          <div                   className="tooltip tooltip-warning hidden md:block"
                                                 data-tip={"Fix incorrect grading"}>
                            {renderGradeUndoButton()}
                          </div>
                      )
                       : null

                }
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
            <h3 className={"card-title" + (isShowingAnswer ? "" : " hidden")}>
              Correct % per level
            </h3>
            <table
              className={
                "table table-compact text-center" +
                (isShowingAnswer ? "" : " hidden")
              }
            >
              <thead>
                <tr>
                  <th style={{ zIndex: 10 }}>A</th>
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
            <div className={"py-1" + (isShowingAnswer ? "" : " hidden")}></div>
            <div className="flex flex-row justify-between flex-wrap">
              <h3 className="card-title">
                Total score: {renderRatio(answerRatio)}
              </h3>

              <button
                className="btn btn-square btn-sm btn-outline"
                onClick={handleToggleCategory}
              >
                {showCategoryDetail ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                )}
              </button>
            </div>

            <table
              className={
                "table table-compact text-center w-full" +
                (showCategoryDetail ? "" : " hidden")
              }
            >
              <thead>
                <tr>
                  <th style={{ zIndex: 10 }}>Category</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(answerRatioByCategory).map(
                  ([category, answerRatio]) => {
                    return (
                      <tr key={category}>
                        <td>{category}</td>
                        <td>{renderRatio(answerRatio)}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>

            <div className="divider"></div>

            <div className="flex flex-row gap-4 flex-wrap">
              <div className="flex flex-row items-center">
                <h3 className="text-lg">Mode</h3>
                <div
                  className="tooltip tooltip-primary"
                  data-tip="Practice mode is available when you answer over 20 questions with <= 50% accuracy"
                >
                  <AiOutlineInfoCircle />
                </div>
              </div>
              <div className="btn-group">
                <button
                  className={
                    "btn btn-outline" +
                    (gameMode == GameMode.REGULAR ? " btn-active" : "")
                  }
                  onClick={() => changeGameMode(GameMode.REGULAR)}
                >
                  Regular
                </button>
                <button
                  className={
                    "btn btn-outline" +
                    (gameMode == GameMode.PRACTICE ? " btn-active" : "")
                  }
                  onClick={() => changeGameMode(GameMode.PRACTICE)}
                  disabled={!isEligibleForPractice}
                >
                  Practice
                </button>
              </div>
            </div>

            <div className="py-1"></div>

            <div className="flex flex-row flex-wrap gap-4 items-center">
              <h3 className="text-lg">
                Lifetime questions: {localDatabase.size()}
              </h3>
              <button
                className="btn btn-sm btn-error"
                onClick={() => setIsConfirmingReset(true)}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

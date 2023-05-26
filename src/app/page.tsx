"use client";

import Fuse from "fuse.js";
import type {NextPage} from "next";
import React, {useEffect, useRef, useState} from "react";

function randomInt(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let currentData: Question;
let isShowingAnswer = true;
let score = 0;
let totalQuestions = 0;

export interface MatchDayListing {
  date: string;
  league: string;
  day: string;
  questions: Array<Question>
}

export interface MatchDay {
  "1": Question;
  "2": Question;
  "3": Question;
  "4": Question;
  "5": Question;
  "6": Question;
  date: string;
  league: string;
  day: string;
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

interface SearchResult {
  score: number;
}

const Home: NextPage = () => {
  const [minLeague, setMinLeague] = useState<number>(60);
  const [maxLeague, setMaxLeague] = useState<number>(72);
  const [day, setDay] = useState<number>(1);
  const [league, setLeague] = useState<number>(60);
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
  const inputRef = useRef<HTMLInputElement>(null);

  function inputClassName() {
    if (isShowingAnswer) {
      return correct ? " input-success" : " input-error";
    } else {
      return "";
    }
  }

  // This is awful I don't know how to get TypeScript to
  // just read the stupid random integer value if you
  // ever want to maintain this please fix this insanity
  function getRandomMatchQuestion(qData: MatchDayListing): Question {
    return qData.questions[randomInt(0, 5)]
  }

  const fetchData = async () => {
    try {
      const newDay = randomInt(1, 25);
      const newLeague = randomInt(minLeague, maxLeague);
      setDay(newDay);
      setLeague(newLeague);
      console.log(`fetching league ${newLeague} on day ${newDay}`);
      const response = await fetch(`data/league${newLeague}_day${newDay}.json`);
      const jsonData: MatchDayListing = await response.json();
      const idx = String(randomInt(1, 6));
      const qData: Question = getRandomMatchQuestion(jsonData);
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
      const fuse = new Fuse([currentData.answer], { includeScore: true });
      const res: Array<Fuse.FuseResult<SearchResult>> = fuse.search(input);
      if (res.length > 0 && res[0].score !== undefined && res[0].score <= 0.3) {
        score += 1;
        setCorrect(true);
      } else {
        setCorrect(false);
      }
      setAnswer(currentData.answer);
      setA(currentData.a_percent);
      setB(currentData.b_percent);
      setC(currentData.c_percent);
      setD(currentData.d_percent);
      setE(currentData.e_percent);
      totalQuestions += 1;
    }
    isShowingAnswer = !isShowingAnswer;
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

  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-start gap-4 flex-wrap md:flex-nowrap">
        <div className="container basis-full shrink-0 md:basis-2/3">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex flex-row justify-between flex-wrap">
                <h3 className="card-title">
                  {category} - {date}
                </h3>
                <h3 className="card-title">
                  League {league} - Day {day}
                </h3>
              </div>
              <p>{prompt}</p>
              <a
                className="link"
                href={image}
                target="_blank"
                hidden={image == ""}
              >
                Click here
              </a>
              <h2
                className={
                  "font-bold mt-2" + (isShowingAnswer ? "" : " hidden")
                }
              >
                ANSWER - {answer}
              </h2>
              <div className="flex flex-row gap-4">
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
                  className="tooltip tooltip-primary"
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
                  <th>A</th>
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
              Score: {score}/{totalQuestions}
            </h3>
            <h3 className="card-title">Settings</h3>
            <p>TODO: Add more features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

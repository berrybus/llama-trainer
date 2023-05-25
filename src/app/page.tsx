"use client";

import Fuse from "fuse.js";
import type { NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
function randomInt(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var currentData: JSON;
var isShowingAnswer = true;
var score = 0;
var totalQuestions = 0;

const Home: NextPage = () => {
  const [minLeague, setMinLeague] = useState(60);
  const [maxLeague, setMaxLeague] = useState(72);
  const [day, setDay] = useState(1);
  const [league, setLeague] = useState(60);
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [answer, setAnswer] = useState("");
  const [image, setImage] = useState("");
  const [a, setA] = useState(" ");
  const [b, setB] = useState(" ");
  const [c, setC] = useState(" ");
  const [d, setD] = useState(" ");
  const [e, setE] = useState(" ");
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  function inputClassName() {
    if (isShowingAnswer) {
      return correct ? " input-success" : " input-error";
    } else {
      return "";
    }
  }

  const fetchData = async () => {
    try {
      const newDay = randomInt(1, 25);
      const newLeague = randomInt(minLeague, maxLeague);
      setDay(newDay);
      setLeague(newLeague);
      console.log(`fetching league ${newLeague} on day ${newDay}`);
      const response = await fetch(`data/league${newLeague}_day${newDay}.json`);
      const jsonData = await response.json();
      const idx = String(randomInt(1, 6));
      const qData = jsonData[idx];
      setPrompt(qData.prompt);
      setCategory(qData.category);
      setDate(jsonData.date);
      currentData = jsonData[idx];
      if (currentData.image != null) {
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
      const res = fuse.search(input);
      if (res.length > 0 && res[0]?.score <= 0.3) {
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
    if (event.key === "Enter" && input != "") {
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

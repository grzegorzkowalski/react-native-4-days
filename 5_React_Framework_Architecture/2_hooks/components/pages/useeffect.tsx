import next from "next";
import React, { useEffect, useState } from "react";

const capitals = [
  {
    country: "France",
    capital: "Paris",
  },
  {
    country: "Poland",
    capital: "Warsaw",
  },
  {
    country: "Italy",
    capital: "Rome",
  },
];

const UseState: React.FC = (): JSX.Element => {
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [time, setTime] = useState(0);

  useEffect(() => {
    setCorrectAnswer(null);
    setInput("");
  }, [currentQuestion]);

  useEffect(() => {
    const int = setInterval(() => {
      setTime((prev) => prev + 1);
      console.log("Time", time);
    }, 1000);

    return () => {
      clearInterval(int)
    }
  }, []);

  return (
    <div>
      <h1>The capital of {capitals[currentQuestion].country} is ?</h1>
      <input value={input} onChange={(e) => setInput(e.currentTarget.value)} />
      <button
        onClick={() => {
          setCorrectAnswer(input === capitals[currentQuestion].capital);
        }}
      >
        Check the answer
      </button>
      <button onClick={() => setCurrentQuestion((prev) => (prev + 1) % 3)}>
        Next question
      </button>

      {correctAnswer === true && "Correct Answer"}
      {correctAnswer === false && "Wrong Answer"}

      <p>Time: {time}</p>
    </div>
  );
};

export default () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 10000);
  })

  if (show) {
    return <UseState />;
  }

  return null
};


const S = ({children} : {
  children: React.ReactNode
}) => {
  const [s, setS] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setS((prev) => prev + 1);
    }, 1000);
  }, []);

  return <div>
    {/* <ChildComponent /> // rerender each state change  */}
    {children}
  </div>
}
import React from "react";
import { useQuiz } from "../contexts/useQuiz";

export default function StartScreen() {
  const { questions, handleClick } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleClick}>
        Start Quiz
      </button>
    </div>
  );
}

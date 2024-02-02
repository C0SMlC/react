import React from "react";
import { useQuiz } from "../contexts/useQuiz";

function Progress() {
  const { index, questions, points, maxPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={index + Number(answer !== null)}
      />
      <p>
        Question<strong>{index + 1}</strong>/{questions.length}
      </p>

      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}

export default Progress;

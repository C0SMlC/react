import React from "react";
import Options from "./Options";
import { useQuiz } from "../contexts/useQuiz";

function Question() {
  const { index, questions, handleAnswer, answer } = useQuiz();
  const currentQuestion = questions[index];

  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Options
        currentQuestion={currentQuestion}
        handleAnswer={handleAnswer}
        answer={answer}
      />
    </div>
  );
}

export default Question;

import React from "react";
import { useQuiz } from "../contexts/useQuiz";

function Button() {
  const { answer, dispatch, questions, status, index } = useQuiz();
  const maxQuestions = questions.length;

  return (
    <>
      {answer !== null && status !== "finish" && index === maxQuestions - 1 ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      ) : null}

      {answer !== null && index < maxQuestions - 1 ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : null}

      {status === "finish" ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart", payload: 0 })}
        >
          Restart
        </button>
      ) : null}
    </>
  );
}

export default Button;

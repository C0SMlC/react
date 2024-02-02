import React from "react";
import { useQuiz } from "../contexts/useQuiz";

function FinishScreen() {
  const { points, maxPoints } = useQuiz();
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPoints}(
      {Math.ceil((points / maxPoints) * 100)}%)
    </p>
  );
}

export default FinishScreen;

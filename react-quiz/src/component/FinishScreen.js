import React from 'react';

function FinishScreen({ points, maxPoints }) {
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPoints}(
      {Math.ceil((points / maxPoints) * 100)}%)
    </p>
  );
}

export default FinishScreen;

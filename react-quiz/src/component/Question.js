import React from 'react';
import Options from './Options';

function Question({ currentQuestion, handleAnswer, answer }) {
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

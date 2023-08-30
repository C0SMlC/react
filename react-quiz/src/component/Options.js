import React from 'react';

function Options({ currentQuestion, handleAnswer, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {currentQuestion.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              hasAnswered
                ? index === currentQuestion.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={index}
            disabled={hasAnswered}
            onClick={() => handleAnswer(index)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;

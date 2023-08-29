import React from 'react';

function Options({ currentQuestion }) {
  return (
    <div className="options">
      {currentQuestion.options.map((option, index) => {
        return (
          <button className="btn btn-option" key={index}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;

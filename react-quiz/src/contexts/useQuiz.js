import { useReducer, useEffect, createContext, useContext } from "react";

const QuizContext = createContext();

const SEC_PER_QUESTION = 30;

const INITIAL_STATE = {
  questions: [],
  // 'loaading', 'error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "startGame":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
      };
    case "restart":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
      };
    case "answer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "tick":
      return {
        ...state,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
        secondsRemaining: state.secondsRemaining - 1,
      };
    default:
      throw new Error("undefined action");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, INITIAL_STATE);

  const maxPoints = questions.reduce((prev, next) => {
    return prev + next.points;
  }, 0);

  useEffect(function () {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  function handleClick() {
    dispatch({ type: "startGame" });
  }

  function handleAnswer(answer) {
    dispatch({ type: "answer", payload: answer });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        secondsRemaining,
        maxPoints,
        dispatch,
        handleClick,
        handleAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };

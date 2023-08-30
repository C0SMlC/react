import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],
  // 'loaading', 'error','ready','active','finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'startGame':
      return {
        ...state,
        status: 'active',
      };
    case 'finish':
      return {
        ...state,
        status: 'finish',
      };
    case 'answer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error('undefined action');
  }
}
function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const maxPoints = questions.reduce((prev, next) => {
    return prev + next.points;
  }, 0);

  useEffect(function () {
    fetch('http://localhost:5000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  function handleClick() {
    dispatch({ type: 'startGame' });
  }

  function handleAnswer(answer) {
    dispatch({ type: 'answer', payload: answer });
  }

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen
            numQuestions={questions.length}
            handleClick={handleClick}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              points={points}
              index={index}
              numQuestions={questions.length}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              currentQuestion={questions[index]}
              handleAnswer={handleAnswer}
              answer={answer}
            />
          </>
        )}
        {status === 'finish' && (
          <FinishScreen maxPoints={maxPoints} points={points} />
        )}

        {answer !== null &&
        status !== 'finish' &&
        index === questions.length - 1 ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: 'finish' })}
          >
            Finish
          </button>
        ) : null}

        {answer !== null && index < questions.length - 1 ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: 'nextQuestion' })}
          >
            Next
          </button>
        ) : null}
      </Main>
    </div>
  );
}

export default App;

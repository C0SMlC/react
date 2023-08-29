import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
  questions: [],
  // 'loaading', 'error','ready','active','finished'
  status: 'loading',
  index: 0,
  answer: null,
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
    case 'answer':
      return {
        ...state,
        answer: action.payload,
      };
    default:
      throw new Error('undefined action');
  }
}
function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
          <Question
            currentQuestion={questions[index]}
            handleAnswer={handleAnswer}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

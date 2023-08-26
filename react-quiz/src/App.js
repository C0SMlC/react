import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

const initialState = {
  questions: [],
  
  status: 'loading',
};

function reducer(state, action) {}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch('http://localhost:5000/questions')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question 1</p>
      </Main>
    </div>
  );
}

export default App;

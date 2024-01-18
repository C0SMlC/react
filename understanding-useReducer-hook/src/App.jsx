import { useReducer } from "react";

const initialState = {
  type: "",
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { type: "incremented", count: state.count + 1 };
    case "decrement":
      return { type: "decremented", count: state.count - 1 };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button
        onClick={() => {
          console.log(state);
          dispatch({ type: "decrement" });
        }}
      >
        Decrease
      </button>
      <button
        onClick={() => {
          console.log(state);
          dispatch({ type: "increment" });
        }}
      >
        Increase
      </button>
    </div>
  );
}

export default App;

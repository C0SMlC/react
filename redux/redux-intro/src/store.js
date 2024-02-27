import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Pass in the default state if the initial state is undefined
// action is a javascript object that contains the type and payload
function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/loan":
      if (state.loan > 0) {
        return state;
      }
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.loanPurpose,
      };

    case "account/repay":
      if (state.loan === 0) {
        return state;
      }
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({
  type: "account/deposit",
  payload: 500,
});
console.log(store.getState());

store.dispatch({
  type: "account/withdraw",
  payload: 100,
});
console.log(store.getState());

store.dispatch({
  type: "account/loan",
  payload: {
    loan: 1000,
    loanPurpose: "car",
  },
});

console.log(store.getState());

store.dispatch({
  type: "account/repay",
});

console.log(store.getState());

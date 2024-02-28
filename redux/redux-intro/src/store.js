import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

// What is redux in simple way?
// Redux is a state management library for JavaScript. It is used to manage the state of an application in a predictable way.
// It is a predictable state container for JavaScript applications and is used for the entire application state management.

// Pass in the default state if the initial state is undefined
// action is a javascript object that contains the type and payload
function reducerAccount(state = initialStateAccount, action) {
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
        balance: state.balance + action.payload.loan,
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

function reducerCustomer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/update":
      return {
        ...state,
        fullName: action.payload.fullName,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: reducerAccount,
  customer: reducerCustomer,
});

const store = createStore(rootReducer);

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

function loan(loan, loanPurpose) {
  return {
    type: "account/loan",
    payload: {
      loan,
      loanPurpose,
    },
  };
}

function repay() {
  return {
    type: "account/repay",
  };
}

store.dispatch(deposit(100));
console.log(store.getState());

store.dispatch(withdraw(100));
console.log(store.getState());

store.dispatch(loan(1000, "car"));
console.log(store.getState());

store.dispatch(repay());
console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateCustomer(fullName) {
  return {
    type: "customer/update",
    payload: {
      fullName,
    },
  };
}

store.dispatch(createCustomer("John Doe", "123456789"));
console.log(store.getState());

store.dispatch(updateCustomer("Pratik Doe"));
console.log(store.getState());

// store.dispatch({
//   type: "account/deposit",
//   payload: 500,
// });
// console.log(store.getState());

// store.dispatch({s
//   type: "account/withdraw",
//   payload: 100,
// });
// console.log(store.getState());

// store.dispatch({
//   type: "account/loan",
//   payload: {
//     loan: 1000,
//     loanPurpose: "car",
//   },
// });

// console.log(store.getState());

// store.dispatch({
//   type: "account/repay",
// });

// console.log(store.getState());

// ACTION CREATORS IN REDUX

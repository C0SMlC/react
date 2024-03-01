const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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

    case "account/isLoading":
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") {
    return {
      type: "account/deposit",
      payload: amount,
    };
  }
  return async function (dispatch, getState) {
    dispatch({
      type: "account/isLoading",
    });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();

    dispatch({
      type: "account/deposit",
      payload: data.rates.USD,
    });
  };
}

export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

export function loan(loan, loanPurpose) {
  return {
    type: "account/loan",
    payload: {
      loan,
      loanPurpose,
    },
  };
}

export function repay() {
  return {
    type: "account/repay",
  };
}

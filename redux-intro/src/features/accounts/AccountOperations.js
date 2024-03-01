import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, loan, repay, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const account = useSelector((store) => store.account);

  console.log(account);

  function handleDeposit() {
    if (!depositAmount || !currency) return;
    dispatch(deposit(+depositAmount, currency));

    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(+withdrawalAmount));

    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;

    dispatch(loan(loanAmount, loanPurpose));

    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    if (!account.loan) return;
    dispatch(repay(account.loan));
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>
            {account.isLoading
              ? "Loading..."
              : `Deposit ${depositAmount} ${currency}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          {account.loan ? (
            <>
              <span>{`Pay back ${account.loan}`}</span>
              <button onClick={handlePayLoan}>Pay loan</button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
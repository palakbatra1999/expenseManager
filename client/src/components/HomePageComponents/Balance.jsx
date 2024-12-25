import { React, useEffect, useState } from "react";
import "../../App.css";
import { useAuth } from "../context/auth";
import { useTransactions } from "../Reducercontext/TransactionContext";

const Balance = () => {
  const { auth } = useAuth(); // Fetch authenticated user
  const { transactions } = useTransactions();
  const [flag, setFlag] = useState(true);

  let balanceClassName = "current-balance";
  
  // Calculate balance
  const income = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = income - expenses;

  console.log("auth from Balance:", auth);
  console.log("balance from Balance:", balance);

  // Update flag based on balance
  useEffect(() => {
    if (balance < 0) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [balance]);

  // Set class name dynamically
  balanceClassName += flag ? "" : " negative";

  return (
    <>
      <div className="balance-container">
        <h4 className="balance-label">Your Balance</h4>
        <h1 className={balanceClassName}>₹{balance}</h1>
      </div>
    </>
  );
};

export default Balance;

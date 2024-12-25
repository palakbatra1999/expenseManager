import React, { useState, useEffect } from "react";
import "../../App.css";
import { useAuth } from "../context/auth";
import { useTransactions } from "../Reducercontext/TransactionContext";

const IncomeandExpenses = () => {
  const { auth } = useAuth(); // Get the logged-in user's auth data
  const { transactions } = useTransactions();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  console.log("auth from IncomeandExpenses:", auth);

  // Calculate total income
  const plusamounttxns = transactions.filter(
    (transaction) => transaction.type === "Income"
  );
  const plusamount = plusamounttxns.map((txn) => txn.amount);
  const plustotals = plusamount.reduce((acc, item) => acc + item, 0).toFixed(2);

  // Calculate total expense
  const minusamounttxns = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );
  const minusamount = minusamounttxns.map((txn) => txn.amount);
  const minustotals = minusamount.reduce((acc, item) => acc + item, 0).toFixed(2);

  // Handle loading or error states
  if (!transactions) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">+₹{plustotals}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">-₹{minustotals}</p>
        </div>
      </div>
    </>
  );
};

export default IncomeandExpenses;

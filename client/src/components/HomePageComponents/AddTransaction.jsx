import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import { useAuth } from "../context/auth";
import { useTransactions } from "../Reducercontext/TransactionContext";

const AddTransaction = () => {
    const { refreshTransactions } = useTransactions();

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(null);
  const { auth } = useAuth();

  console.log("auth from AddTransaction:", auth);

  const addTransaction = async (userId, transactionData) => {
    console.log("entered addTransaction..")
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/transaction`,
        {...transactionData, userId}
      );

      console.log("response:", response);

      if (response.status === 200 || response.status === 201) {
        console.log("Transaction added successfully:", response.data);
        refreshTransactions();
      } else {
        console.error("Failed to add transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || !amount || !type) {
      alert("Please fill out all fields and select a transaction type!");
      return;
    }

    const transactionData = {
      text,
      type,
      amount: +amount,
      dateoftransaction: new Date().toDateString().substring(3),
    };

    console.log("transactionData:", transactionData);

    await addTransaction(auth.user.userId, transactionData);

    // Reset form
    setText("");
    setAmount("");
    setType(null);
  };

  return (
    <>
      <h3>Add a New Transaction</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>

        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>

        <div className="form-control">
          <label>Transaction Type</label>
          <div className="radio-container">
            {["Income", "Expense"].map((item) => (
              <label key={item} className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value={item}
                  checked={type === item}
                  onChange={(e) => setType(e.target.value)}
                  className="radio-input"
                />
                <span className="radio-text">{item}</span>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="btn">
          Add Transaction
        </button>
      </form>
    </>
  );
};

export default AddTransaction;

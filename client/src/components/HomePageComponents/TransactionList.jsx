import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import { BsFillArrowDownCircleFill, BsArrowUpCircle } from "react-icons/bs";
import { useAuth } from "../context/auth";
import { format } from 'date-fns';
import { useTransactions } from "../Reducercontext/TransactionContext";

const TransactionList = () => {
  const { auth } = useAuth(); // Fetch authenticated user
  const { transactions, refreshTransactions } = useTransactions();
  const [flag, setFlag] = useState(true);

  console.log("auth from TransactionList:", auth);

  const getDateTxn = (isoDate) =>{
    const formattedDate = format(new Date(isoDate), 'dd-MM-yyyy');
    return formattedDate
  }


  const handleDeleteTransaction = async (transactionId) => {
    if (!transactionId) {
      console.error("Transaction ID is required for deletion.");
      return;
    }
  
    try {
      // Send DELETE request to the backend
      const response = await axios.delete(
        `http://localhost:5000/api/v1/auth/delete/${transactionId}`
      );

      console.log("response from handleDeleteTransaction:", response);
  
      if (response.status === 200) {
        console.log("Transaction deleted successfully:", response.data);
        refreshTransactions();
  
      } else {
        console.error("Failed to delete transaction.");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  



  if (!auth) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul id="list" className="list">
        {/* History Header */}
        {transactions.length === 0 ? (
          <h3>
            History <span><BsFillArrowDownCircleFill /></span>
          </h3>
        ) : (
          <h3>
            History
            <span onClick={() => setFlag(false)}>
              {flag && <BsFillArrowDownCircleFill />}
            </span>
            <span onClick={() => setFlag(true)}>
              {!flag && <BsArrowUpCircle />}
            </span>
          </h3>
        )}

        {/* Transaction List */}
        {!flag &&
          transactions.map((transaction) => (
            <li
              key={transaction._id} // Use unique transaction ID as key
              className={transaction.type === "Expense" ? "minus" : "plus"}
            >
              {transaction.text} 
              <span>{transaction.amount}</span> 
              <span className="datedisplay">{getDateTxn(transaction.dateoftransaction)}</span>
              <button
                className="delete_button"
                onClick={() => handleDeleteTransaction(transaction._id)}
              >
                x
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TransactionList;

import React, { createContext, useState, useEffect, useContext } from 'react';
import {getTransactions} from '../helpers/getTransactions.js';
import { useAuth } from '../context/auth';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { auth } = useAuth(); // Get authenticated user details
  const [transactions, setTransactions] = useState([]); // Transactions state

  console.log("auth from TransactionProvider:", auth)

  // Fetch transactions when the component mounts or userId changes
  useEffect(() => {
    const fetchTransactions = async () => {
      if (auth?.user?.userId) {
        const data = await getTransactions(auth.user.userId);
        setTransactions(data);
      }
    };

    fetchTransactions();
  }, [auth?.user?.userId]);

  const refreshTransactions = async () => {
    if (auth?.user?.userId) {
      const data = await getTransactions(auth.user.userId);
      setTransactions(data);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, refreshTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook to use transactions context
export const useTransactions = () => useContext(TransactionContext);

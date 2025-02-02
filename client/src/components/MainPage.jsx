import React from "react";
import Header from "./Addons/Header";
import Balance from "./HomePageComponents/Balance";
import IncomeandExpenses from "./HomePageComponents/IncomeandExpenses";
import TransactionList from "./HomePageComponents/TransactionList";
import AddTransaction from "./HomePageComponents/AddTransaction";
import { GlobalProvider } from "./Reducercontext/GlobalContext";
import "../App.css";
import Layout from "./Addons/Layout";
import { AuthProvider, useAuth } from "./context/auth";
import { Navigate } from "react-router-dom";
import { TransactionProvider } from "./Reducercontext/TransactionContext";

const MainPage = () => {
  const { auth } = useAuth(); // Use auth from context

  // Check if user is not authenticated
  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  console.log("auth:", auth);

  return (
    <AuthProvider>
      <TransactionProvider>
        <GlobalProvider>
          <Layout>
            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
            <div className="container">
              <Balance />
              <IncomeandExpenses />
              <TransactionList />
              <AddTransaction />
            </div>
          </Layout>
        </GlobalProvider>
      </TransactionProvider>
    </AuthProvider>
  );
};

export default MainPage;

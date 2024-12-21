import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';


const initialState = {
    transactions: [
        { id: 1, text: 'flowers', type: 'Expense', amount: 100, dateoftransaction: 'JUL 31 2023' },
        { id: 2, text: 'Salary', type: 'Expense', amount: 300, dateoftransaction: 'JUL 31 2023' },
        { id: 3, text: 'Book', type: 'Income', amount: 10, dateoftransaction: 'JUL 30 2023' },
        { id: 4, text: 'pen', type: 'Income', amount: 5, dateoftransaction: 'JUL 29 2023' }
    ],
    users: [
        {
            id: 1,
            username: "palak1999",
            password: "123"
        },

        {
            id: 2,
            username: "raj16",
            password: "123"
        },

    ]
}


//create context
export const GlobalContext = createContext(initialState);



//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function deleteTransaction(id) {
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: id
        });
    }

    function AddTransaction(txn) {
        dispatch({
            type: "ADD_TRANSACTION",
            payload: txn
        });
    }

    function AddUser(user) {
        dispatch({
            type: "ADD_USER",
            payload: user
        });
    }

    return <GlobalContext.Provider value={
        { transactions: state.transactions, users: state.users, deleteTransaction, AddTransaction, AddUser }

    }>
        {children}
    </GlobalContext.Provider>
}
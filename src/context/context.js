import React, { useReducer, createContext } from "react";
import contextReducer from "./contextReducer.js";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 5222,
    category: "Entertainment",
    type: "Expense",
    date: "2021-03-25",
    id: "1fc13be4-6ed2-4b39-9c66-146459e15101",
  },
  {
    amount: 10000,
    category: "Rental income",
    type: "Income",
    date: "2021-03-13",
    id: "bb4900b4-d575-4c4d-aebc-c65076fb3d27",
  },
  {
    amount: 5000,
    category: "Clothes",
    type: "Expense",
    date: "2021-03-24",
    id: "766f6ca3-b4ac-4422-92b9-aaa065fdc048",
  },
  {
    amount: 75000,
    category: "Salary",
    type: "Income",
    date: "2021-03-24",
    id: "22c09853-f9bc-47c5-91c8-ca799649fd44",
  },
  {
    amount: 5000,
    category: "Extra income",
    type: "Income",
    date: "2021-03-25",
    id: "1bd63774-5f37-4e83-98ca-1c59c606640b",
  },
];

export const ExpenseTrackerContext = createContext(initialState);
export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };
  const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

  return (
    <ExpenseTrackerContext.Provider
      value={{ deleteTransaction, addTransaction, transactions,balance }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

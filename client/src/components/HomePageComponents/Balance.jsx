import { React, useContext } from 'react'
import '../../App.css';
import { GlobalContext } from '../Reducercontext/GlobalContext';
// import { GlobalContext } from './GlobalContext';

const Balance = () => {

  const { transactions } = useContext(GlobalContext);

  const plusamounttxns = transactions.filter(transaction => transaction.type === 'Income')
  const plusamount = plusamounttxns.map(plusamt => plusamt.amount);
  console.log(plusamount);
  const plustotals = plusamount.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const minusamounttxns = transactions.filter(transaction => transaction.type === 'Expense')
  const minusamount = minusamounttxns.map(plusamt => plusamt.amount);
  const minustotals = minusamount.reduce((acc, item) => (acc += item), 0).toFixed(2);


  const totals = plustotals - minustotals;

  let flag = true;
  let baltotals = totals;

  if (totals < 0) {
    flag = false;
    baltotals = (-1) * totals;
  }


  console.log(baltotals);


  return (
    <>
      <div className="balance-container">
      <h4 className="balance-label">Your Balance</h4>
      <h1 className="current-balance">{flag === false ? '-' : '+'} ₹{baltotals}</h1>
    </div>
    </>
  )
}

export default Balance

import { React, useContext } from 'react';
import '../../App.css';
import { GlobalContext } from '../Reducercontext/GlobalContext';

const IncomeandExpenses = () => {

  const { transactions } = useContext(GlobalContext);



  const plusamounttxns = transactions.filter(transaction => transaction.type === 'Income')
  const plusamount = plusamounttxns.map(plusamt => plusamt.amount);
  console.log(plusamount);
  const plustotals = plusamount.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const minusamounttxns = transactions.filter(transaction => transaction.type === 'Expense')
  const minusamount = minusamounttxns.map(plusamt => plusamt.amount);
  console.log(minusamount);
  const minustotals = minusamount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const modminustotals = (-1) * minustotals;

  return (
    <>
      <div className='inc-exp-container'>
        <div>
          <h4>Income</h4>
          <p className='money plus'>+₹{plustotals}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className='money minus'>-₹{modminustotals}</p>
        </div>
      </div>
    </>
  )
}

export default IncomeandExpenses

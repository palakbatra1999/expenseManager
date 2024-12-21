import React, { useContext, useState } from 'react';
import '../../App.css';
import { GlobalContext } from '../Reducercontext/GlobalContext';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { BsArrowDownCircle } from 'react-icons/bs';

const TransactionList = () => {

  const minus = 'minus';
  const plus = 'plus';

  const [flag, setflag] = useState(true);




  const { transactions } = useContext(GlobalContext);
 
 // console.log(transactions);
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul id="list" className='list'>
        {transactions.length === 0 ? <h3>This year <span >   <BsFillArrowDownCircleFill />  </span></h3> : <h3>This year <span onClick={() => setflag(false)}>  {flag && <BsFillArrowDownCircleFill />}  </span> <span onClick={() => setflag(true)}> {!flag && <BsArrowDownCircle />} </span> </h3>
        }
        {

          !flag && transactions.map((transaction) => {

            return (
              <li className={transaction.type === 'Expense' ? 'minus' : 'plus'}>
                {transaction.text} <span>{transaction.amount}</span> <span className='datedisplay'>{transaction.dateoftransaction}</span> <button className='delete_button' onClick={() => deleteTransaction(transaction.id)}>x</button>

              </li>
            )
          })
        }

        {/* <li className='minus'>
          {transaction.text} <span>{transaction.amount}</span> <button className='delete_button'>x</button>  )
        </li> */}


      </ul>

    </>
  )
}

export default TransactionList

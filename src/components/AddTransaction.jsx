import React, { useState, useContext } from 'react';

import '../App.css';
import { GlobalContext } from './GlobalContext';


const AddTransaction = () => {

    const[text,setText]=useState("");
    const[amount,setAmount]=useState();
    const [checkList, setCheckList] = useState(['Income', 'Expense']);
    const [isSelected, setIsSelected] = useState();
    const[type,setType]=useState(null);

    const AddText = (event) =>{
      setText(event.target.value);
    }

    const AddAmount = (event) =>{
        setAmount(event.target.value);
    }

    const { AddTransaction } = useContext(GlobalContext);

    const onChange = (e) => {
        if (e.target.checked) {
            !isSelected && setIsSelected(e.target.name);
            setType(e.target.value);
            
        } else {
            setIsSelected(null);
        }
    };

    const submit = (event) =>{
        event.preventDefault();

       
      
            const transaction = {
                id: Math.floor(Math.random() * 10000000),
                text,
                type,
                amount: +amount,
                dateoftransaction: (new Date().toDateString()).substring(3)
               

            }
       // console.log(amount, text);
        AddTransaction(transaction);
        console.log( );
      //  setIsSelected(null);
        setAmount(0);
        setText('');
    }

  
  return (
   <>
    <h3>Add a new Transaction</h3>

    <form onSubmit={submit}>
        <div className='form-control'>
            <label htmlFor='text'>Text</label>
                  <input type='text' value={text} onChange={AddText} placeholder='Enter text...'/>
        </div>
        <div className='form-control'>
            <label htmlFor='amount'>Amount
            <br/>
            </label>
            <input type='number' value={amount} onChange={AddAmount} placeholder='Enter amount...' />
            
          {
                      checkList.map((item) => {
                       return (
                            <div>
                               < input type="checkbox" disabled={isSelected ? isSelected !== item : false} name={item} key={item} onChange={onChange}
                                   value={item} />  <span>{item}</span>
                            </div>
                       )
                      })
          }
        </div>
        <button className='btn'>Add Transaction</button>
    </form>
   </>
  )
}

export default AddTransaction

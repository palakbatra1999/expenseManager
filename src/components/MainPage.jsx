import { React } from 'react'
import Header from './Header';
import Balance from './Balance';
import IncomeandExpenses from './IncomeandExpenses';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import { GlobalProvider } from './GlobalContext';
import '../App.css';

const MainPage = () => {
    return (
        <GlobalProvider>
            <Header />
            <div className='container'>
                <Balance />
                <IncomeandExpenses />
                <TransactionList />
                <AddTransaction />

            </div>
        </GlobalProvider>
    )
}

export default MainPage;


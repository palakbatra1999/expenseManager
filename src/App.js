import logo from './logo.svg';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeandExpenses from './components/IncomeandExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider } from './components/GlobalContext';

import './App.css';

function App() {
  return (
  <>
  <GlobalProvider>
        <Header />
        <div className='container'>
          <Balance />
          <IncomeandExpenses />
          <TransactionList />
          <AddTransaction />

        </div>
  </GlobalProvider>
  </>
  );
}

export default App;

import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className='main_heading'>
        <h2>Expense Tracker</h2>
      </div>
      <div className='logoutdiv'>
        <p> <NavLink className='logoutbtn' to={'/login'}>Logout</NavLink></p>
      </div>
    </>
  )
}

export default Header

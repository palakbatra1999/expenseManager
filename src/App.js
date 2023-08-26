import React from 'react';
import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Register from './components/Register';
import { GlobalContext } from './components/GlobalContext';



function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/expenses" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

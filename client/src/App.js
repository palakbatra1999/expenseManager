import React, { useState, useEffect } from "react";
import "./App.css";

import MainPage from "./components/MainPage";
import Login from "./components/Auth/Login";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Register from "./components/Auth/Register";
import { GlobalContext } from "./components/Reducercontext/GlobalContext";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./components/context/auth";

function App() {
  return (
    <> 
       <AuthProvider>
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/homepage" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </BrowserRouter>
       </AuthProvider>
    
    </>
  );
}

export default App;

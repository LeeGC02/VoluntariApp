import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./assets/views/Home";
import RegisterPage from "./assets/views/RegisterPage";
import LoginPage from './assets/views/LoginPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/RegisterPage" element={<RegisterPage/>} />
        <Route path="/LoginPage" element={<LoginPage/>} />
      </Routes>
    </div>
  )
}

export default App

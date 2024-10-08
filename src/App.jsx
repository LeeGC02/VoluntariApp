//import React from 'react'
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./assets/views/Home";
import RegisterPage from "./assets/views/RegisterPage";
import LoginPage from './assets/views/LoginPage';
import { AuthProvider, useAuth } from './context/authContext';
import HomePage from './assets/views/HomePage';
import PropTypes from "prop-types";

const ProtectedRoute = ({children}) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to = "/LoginPage"/>
};

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/RegisterPage" element={<RegisterPage/>} />
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/HomePage" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        </Routes>
      </div>
    </AuthProvider>
  )
}
// Validación de las props
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App

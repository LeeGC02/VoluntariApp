//import React from 'react'
import './App.css';

import { Routes, Route } from 'react-router-dom';
import Home from "./assets/views/Home";
import RegisterPage from "./assets/views/RegisterPage";
import LoginPage from './assets/views/LoginPage';
import { AuthProvider } from './context/authContext';
import HomePage from './assets/views/HomePage';
import ProtectedRouter from './assets/components/ProtectedRouter';
import VolunteerPage from './assets/views/VolunteerPage';
import OrganizationPage from './assets/views/OrganizationPage';
import VolunteerProfile from './assets/views/VolunteerProfile';
import ProductPage from './assets/views/ProductPage';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/RegisterPage" element={<RegisterPage/>} />
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/VolunteerPage/ProductPage" element={<ProductPage/>} />          
          <Route path="/HomePage" element={<ProtectedRouter><HomePage/></ProtectedRouter>}/>
          <Route path="/VolunteerPage" element={<ProtectedRouter> <VolunteerPage/> </ProtectedRouter>}/>
          <Route path="/OrganizationPage" element={<ProtectedRouter> <OrganizationPage/> </ProtectedRouter>}/>
          <Route path="/VolunteerPage/VolunteerProfile" element={<ProtectedRouter> <VolunteerProfile /> </ProtectedRouter>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App;

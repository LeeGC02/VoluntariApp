//import React from 'react'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const OrganizationPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.logout();
    navigate("/LoginPage");
  }
  return (
    <div>
      <h1>Bienvenido, Organizacion!!!</h1>
      <button onClick={()=>handleLogout()}>Cerrar Sesión</button>
    </div>
  )
}

export default OrganizationPage
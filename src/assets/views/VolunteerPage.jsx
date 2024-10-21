//import React from 'react'
import VolunteerProfile from './VolunteerProfile';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const VolunteerPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.logout();
    navigate("/LoginPage"); 
  }
  return (
    <div>
      <h1>Bienvenido, Voluntario!!!</h1>
      <button onClick={()=>handleLogout()}>Cerrar Sesión</button>
      <VolunteerProfile/>
    </div>
  )
}

export default VolunteerPage
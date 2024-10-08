//import React from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
//import VolunteerProfile from './VolunteerProfile';

const HomePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.logout();
    navigate("/LoginPage"); 
  }
  
  return (
    <div>
        <h1>Pagina de Inicio</h1>
        <button onClick={()=>handleLogout()}>Logout</button>
        {/* <VolunteerProfile/> */}
    </div>
  )
}

export default HomePage
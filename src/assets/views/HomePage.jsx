//import React from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import VolunteerProfile from './VolunteerProfile';
// import OrganizationProfile from './OrganizationProfile';

const HomePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const {displayName, photoURL} = auth.user;
  const handleLogout = async () => {
    await auth.logout();
    navigate("/LoginPage"); 
  }
  
  return (
    <div>
        <h1>Pagina de Inicio</h1>
        {displayName && <h3>Gracias {displayName}</h3> }
        {photoURL && <img src={photoURL} alt={displayName} /> }
        <button onClick={()=>handleLogout()}>Logout</button>
        <VolunteerProfile/>
        {/* <OrganizationProfile/> */}
    </div>
  )
}

export default HomePage
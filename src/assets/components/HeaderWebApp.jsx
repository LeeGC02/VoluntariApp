//import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import './HeaderWebApp.css'; 

const HeaderWebApp = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.logout();
    navigate("/LoginPage");
  }

  const handleProfileChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'logout') {
      handleLogout();
    } else if (selectedValue === 'profile'){
    navigate('/VolunteerPage/VolunteerProfile');
    }
  }
  return (
    
    <div>
      <header className='header-webapp'>
        <div className="webapp-name ">
          <img className='img-VoluntariApp' src="/VoluntariAppLogo.png" alt="logo VoluntariApp" />
          <h2 className=' font-extrabold text-xl '>VoluntariApp</h2>
        </div>
        <input className='searching-bar' type="text" placeholder='🔎 Buscar' />
        <div className='icons-actions-container'>
          <div className="icons-action " onClick={() => navigate("/VolunteerPage/ProductPage")} >
            <Icon icon="ic:baseline-local-grocery-store" width="24" height="24" style={{ color: "#fff" }} />
            <span>Tienda</span>
          </div>
          <div className="icons-action">
            <Icon icon="material-symbols:notifications-sharp" width="24" height="24" style={{ color: "#fff" }} />
            <span>Notificaciones</span>
          </div>
          <div className="icons-action">
            <Icon icon="solar:user-bold" width="24" height="24" style={{ color: "#fff" }} />
            <select className='select-profile' name="pro" id="pro" onChange={handleProfileChange} defaultValue="default">
              <option value="default" disabled >Yo</option>
              <option value="profile">Mi Perfil</option>
              <option value="logout">Cerrar Sesión</option>
            </select>
          </div>
        </div>
      </header>
    </div>
  )
}

export default HeaderWebApp
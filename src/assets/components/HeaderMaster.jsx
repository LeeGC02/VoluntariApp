//import React from 'react'
import { useNavigate } from 'react-router-dom';
import './HeaderMaster.css';

const HeaderMaster = () => {
  const navigate = useNavigate(); // Hook para redirigir

  return (
    <header className='header-container'>
      <div className="img-title-container">
        <img className='img-VoluntariApp' src="/VoluntariAppLogo.png" alt="logo VoluntariApp" />
        <span className='title-header'>VoluntariApp</span>
      </div>
      <div className="ref-container">
        <a className='ref-span' href="/">Inicio</a>
        <a className='ref-span' href="#Quienes Somos">Quienes Somos</a>
        <a className='ref-span' href="#Servicios">Nuestros Servicios</a>
      </div>
      <div className="btn-container">
        {/* Botones con redirección */}
        <button className='btn-login' onClick={() => navigate('/LoginPage')}>
          Inicio Sesión
        </button>
        <button className='btn-signup' onClick={() => navigate('/RegisterPage')}>
          ¡Únete Ahora!
        </button>
      </div>
    </header>
  );
}


export default HeaderMaster

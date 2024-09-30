// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <div className="logo-text-container">
          <img className="footer-logo" src="/VoluntariAppLogo.png" alt="VoluntariApp Logo" />
          <span className="footer-app-name">VoluntariApp</span>
        </div>
        <p className="footer-description">
          Explora oportunidades de voluntariado diseñadas especialmente para ti.
        </p>
        <p className="footer-rights">
          ©VoluntariApp UVOL SRL 2024. Todos los derechos reservados
        </p>
      </div>

      <div className="footer-section">
        <h3 className="footer-title">VoluntariApp</h3>
        <ul className="footer-links">
          <li><a href="/">Inicio</a></li> 
          <li><a href="#Quienes Somos">¿Quiénes somos?</a></li>
          <li><a href="#Servicios">Nuestro Servicio</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3 className="footer-title">Contactarse</h3>
        <p>La Paz, Bolivia</p>
        <p>Correo electrónico - nanna.lia.g.c@gmail.com</p>
        <p>Redes sociales - <span className="social-icons">🌐 ⨁ 🕺 📸</span></p>
      </div>
    </footer>
  );
};

export default Footer;

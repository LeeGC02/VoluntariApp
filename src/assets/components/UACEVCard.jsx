import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UACEVCard.css';

const UACEVCard = ({ 
  imagenURL, 
  titulo, 
  tipoOportunidad, // 'Evento' o 'Actividad'
  filtros, 
  duracion, 
  fechaInicio, 
  fechaFin, 
  descripcion, 
  habilidadesRequeridas, 
  donacionesPermitidas 
}) => {
  const navigate = useNavigate();

  const irADetalles = () => {
    // Aquí puedes enviar más detalles en la URL o mediante estado
    navigate('/DetalleOrg');
  };

  return (
    <div className="tarjeta-actividad">
      <div className="tarjeta-imagen">
        <img src={imagenURL} alt={titulo} />
      </div>
      <div className="tarjeta-info">
        <h3 className="tarjeta-titulo">{titulo}</h3>
        <span className="tarjeta-tipo-oportunidad">{tipoOportunidad}</span>
        
        <div className="tarjeta-filtros">
          {filtros.map((filtro, index) => (
            <span key={index} className="tarjeta-filtro">{filtro}</span>
          ))}
        </div>
        
        <div className="tarjeta-duracion-fechas">
          <div className="tarjeta-duracion">
            <strong>Duración:</strong> {duracion}
          </div>
          <div className="tarjeta-fechas">
            <strong>Fecha Inicio:</strong> {fechaInicio} <br />
            <strong>Fecha Fin:</strong> {fechaFin}
          </div>
        </div>
        
        <p className="tarjeta-descripcion">{descripcion}</p>
        
        <div className="tarjeta-habilidades">
          <strong>Habilidades Requeridas:</strong> {habilidadesRequeridas.join(", ")}
        </div>
        
        <div className="tarjeta-donaciones">
          <strong>Donaciones Permitidas:</strong> {donacionesPermitidas ? 'Sí' : 'No'}
        </div>

        <button className="tarjeta-boton-detalles" onClick={irADetalles}>Detalles</button>
      </div>
    </div>
  );
};

export default UACEVCard;

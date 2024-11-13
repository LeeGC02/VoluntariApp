import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ACEVCard.css';

const ACEVCard = ({ 
  imagenURL, 
  titulo, 
  tipoOportunidad, // 'Evento' o 'Actividad'
  filtros, 
  duracion, 
  fechaInicio, 
  fechaFin, 
  descripcion, 
  habilidadesRequeridas, 
  donacionesPermitidas, 
  onEliminar, // Función para eliminar
  onModificar // Función para modificar
}) => {
  const navigate = useNavigate();

  const irADetalles = () => {
    navigate('/DetalleOrg');
  };

  const manejarEliminar = () => {
    if (onEliminar) {
      onEliminar(); // Llamar a la función de eliminar pasada como prop
    }
  };

  const manejarModificar = () => {
    if (onModificar) {
      onModificar(); // Llamar a la función de modificar pasada como prop
    }
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

        <div className="tarjeta-botones-accion">
          <button className="tarjeta-boton-modificar" onClick={manejarModificar}>Modificar</button>
          <button className="tarjeta-boton-eliminar" onClick={manejarEliminar}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ACEVCard;

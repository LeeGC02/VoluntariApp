// src/pages/LandingPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderWebApp from "../components/HeaderWebApp";
import UACEVCard from "../components/UACEVCard"; // Importamos el componente UACEVCard

const LandingPage = () => {
  const navigate = useNavigate();
  
  const [actividades, setActividades] = useState([]);

  // Simulando la carga de actividades (puedes reemplazar esto con datos de Firebase)
  useEffect(() => {
    const fetchActividades = async () => {
      // Aquí simulas que obtienes actividades (reemplaza con datos reales si es necesario)
      const actividadesData = [
        {
          id: '1',
          imagenURL: 'https://via.placeholder.com/150',
          titulo: 'Actividad 1',
          tipoOportunidad: 'Evento',
          filtros: ['Filtro 1', 'Filtro 2'],
          duracion: '2 horas',
          fechaInicio: '2024-11-15',
          fechaFin: '2024-11-15',
          descripcion: 'Descripción de la actividad 1',
          habilidadesRequeridas: ['Habilidad 1', 'Habilidad 2'],
          donacionesPermitidas: true
        },
        {
          id: '2',
          imagenURL: 'https://via.placeholder.com/150',
          titulo: 'Actividad 2',
          tipoOportunidad: 'Actividad',
          filtros: ['Filtro 3'],
          duracion: '3 horas',
          fechaInicio: '2024-11-16',
          fechaFin: '2024-11-16',
          descripcion: 'Descripción de la actividad 2',
          habilidadesRequeridas: ['Habilidad 3'],
          donacionesPermitidas: false
        }
      ];

      setActividades(actividadesData); // Asignamos los datos a nuestro estado
    };

    fetchActividades(); // Llamamos a la función para cargar las actividades
  }, []);

  return (
    <div className="landing-page">
      <HeaderWebApp />
      <main className="landing-content">
        <h1>Bienvenido a la Página de Inicio</h1>
        <p>
          Explora nuestras oportunidades y eventos disponibles para voluntarios. 
          ¡Conéctate y comienza a ayudar a organizaciones locales!
        </p>

        <div className="actividades-container">
          {actividades.map((actividad) => (
            <UACEVCard
              key={actividad.id}
              imagenURL={actividad.imagenURL}
              titulo={actividad.titulo}
              tipoOportunidad={actividad.tipoOportunidad}
              filtros={actividad.filtros}
              duracion={actividad.duracion}
              fechaInicio={actividad.fechaInicio}
              fechaFin={actividad.fechaFin}
              descripcion={actividad.descripcion}
              habilidadesRequeridas={actividad.habilidadesRequeridas}
              donacionesPermitidas={actividad.donacionesPermitidas}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

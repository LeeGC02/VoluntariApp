import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import TarjetaActividad from '../components/ACEVCard.jsx'; // Asegúrate de que la ruta sea correcta
import HeaderWebApp from '../components/HeaderWebApp.jsx';

const OrganizationPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);
  const [eventos, setEventos] = useState([]);
  
  useEffect(() => {
    // Obtener actividades y eventos cuando el componente se monta
    const fetchOportunidades = async () => {
      const userUID = auth.user ? auth.user.uid : null;
      if (userUID) {
        try {
          // Obtener actividades
          const actividadesRef = collection(db, 'organizacion', userUID, 'actividades');
          const actividadesSnapshot = await getDocs(actividadesRef);
          const actividadesList = actividadesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setActividades(actividadesList);
          
          // Obtener eventos
          const eventosRef = collection(db, 'organizacion', userUID, 'eventos');
          const eventosSnapshot = await getDocs(eventosRef);
          const eventosList = eventosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setEventos(eventosList);

        } catch (error) {
          console.error('Error al obtener las oportunidades:', error);
        }
      }
    };

    fetchOportunidades();
  }, [auth.user]); // Se ejecuta cuando el usuario cambia

  const handleLogout = async () => {
    await auth.logout();
    navigate("/LoginPage");
  };

  const handleAF = () => {
    const userUID = auth.user ? auth.user.uid : null;
    if (userUID) {
      navigate(`/OrganizationPage/ActForm?uid=${userUID}`);
    } else {
      console.error("No se encontró el UID del usuario.");
    }
  };

  const handleShowUID = () => {
    console.log("UID del usuario:", auth.user ? auth.user.uid : "No hay usuario autenticado");
  };

  return (
    <div>
      <HeaderWebApp></HeaderWebApp>
      <h1>Bienvenido, Organizacion!!!</h1>
      <button onClick={handleAF}>Crear Actividad</button>
      <button onClick={handleShowUID}>Mostrar UID en consola</button>

      <div className="actividades-lista">
        <h2>Actividades</h2>
        {actividades.length > 0 ? (
          actividades.map((actividad) => (
            <TarjetaActividad 
              key={actividad.id}
              imagenURL={actividad.imagenURL || 'defaultImage.jpg'}
              titulo={actividad.titulo}
              tipoOportunidad="Actividad"
              filtros={actividad.categorias || []}
              duracion={actividad.duracion}
              fechaInicio={actividad.fechaInicio}
              fechaFin={actividad.fechaFin}
              descripcion={actividad.descripcion}
              habilidadesRequeridas={actividad.habilidadesRequeridas || []}
              donacionesPermitidas={actividad.donacionesPermitidas || false}
            />
          ))
        ) : (
          <p>No tienes actividades disponibles.</p>
        )}
      </div>

      <div className="eventos-lista">
        <h2>Eventos</h2>
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <TarjetaActividad 
              key={evento.id}
              imagenURL={evento.imagenURL || 'defaultImage.jpg'}
              titulo={evento.titulo}
              tipoOportunidad="Evento"
              filtros={evento.categorias || []}
              duracion={evento.duracion}
              fechaInicio={evento.fechaInicio}
              fechaFin={evento.fechaFin}
              descripcion={evento.descripcion}
              habilidadesRequeridas={evento.habilidadesRequeridas || []}
              donacionesPermitidas={evento.donacionesPermitidas || false}
            />
          ))
        ) : (
          <p>No tienes eventos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default OrganizationPage;
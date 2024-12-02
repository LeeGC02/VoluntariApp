// En VolunteerPage.jsx
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import UACEVCard from "../components/UACEVCard.jsx";
import HeaderWebApp from "../components/HeaderWebApp.jsx";
import PostulacionForm from "../components/PostulacionForm"; // Asegúrate de importar el componente
import DonacionesPage from "./DonacionesPage";

const VolunteerPage = () => {
  const [actividades, setActividades] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [modalPostulacion, setModalPostulacion] = useState(false);
  const [modalDonacion, setModalDonacion] = useState(false);
  const [selectedData, setSelectedData] = useState(null); // Datos de la actividad/evento seleccionado
  const [userId, setUserId] = useState(null); // Para almacenar el ID del usuario autenticado

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const actividadesRef = collection(db, "Actividades");
        const actividadesSnapshot = await getDocs(actividadesRef);
        const actividadesList = actividadesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActividades(actividadesList);

        const eventosRef = collection(db, "Eventos");
        const eventosSnapshot = await getDocs(eventosRef);
        const eventosList = eventosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEventos(eventosList);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    // Obtener el usuario autenticado
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid); // Establecer el ID del usuario
      const userDocId = user.uid;
    } else {
      console.log("No hay usuario autenticado");
    }

    fetchDatos();
  }, []);

  // Abrir modal de postulaciones
  const handlePostulacion = (data) => {
    setSelectedData(data);
    setModalPostulacion(true);
  };

  // Abrir modal de donaciones
  const handleDonacion = (data) => {
    setSelectedData(data);
    setModalDonacion(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <HeaderWebApp />
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Bienvenid@, Voluntari@!
        </h1> 

        {/* Lista de Actividades */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Actividades Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actividades.length > 0 ? (
              actividades.map((actividad) => (
                <UACEVCard
  key={actividad.id}
  id={actividad.id} // Pasa la ID al componente
  title={actividad.title}
  descripcion={actividad.descripcion}
  personas={actividad.personas}
  donaciones={actividad.donaciones}
  fechaInicio={actividad.fechaInicio}
  fechaFin={actividad.fechaFin}
  correoOrganizacion={actividad.correoOrganizacion}
/>

              ))
            ) : (
              <p>No hay actividades disponibles en este momento.</p>
            )}
          </div>
        </section>

        {/* Lista de Eventos */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Eventos Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventos.length > 0 ? (
              eventos.map((evento) => (
                <UACEVCard
  key={eventos.id}
  id={eventos.id} // Pasa la ID al componente
  title={eventos.title}
  descripcion={eventos.descripcion}
  personas={eventos.personas}
  donaciones={eventos.donaciones}
  fechaInicio={eventos.fechaInicio}
  fechaFin={eventos.fechaFin}
  correoOrganizacion={eventos.correoOrganizacion}
/>

              ))
            ) : (
              <p>No hay eventos disponibles en este momento.</p>
            )}
          </div>
        </section>
      </div>

      {/* Modal Postulación */}
      {modalPostulacion && (
        <PostulacionForm
          id={selectedData.id} // ID de la actividad/evento
          title={selectedData.title} // Título de la actividad/evento
          userDocId={userDocId} // Pasar el userId aquí
          onClose={() => setModalPostulacion(false)}
        />
      )}

      {/* Modal Donación */}
      {modalDonacion && (
        <DonacionesPage
          data={selectedData}
          onClose={() => setModalDonacion(false)}
        />
      )}
    </div>
  );
};

export default VolunteerPage;

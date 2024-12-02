import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import TarjetaActividad from "../components/ACEVCard.jsx";
import HeaderWebApp from "../components/HeaderWebApp.jsx";

const OrganizationPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);
  const [eventos, setEventos] = useState([]);

  const handleModificar = (id, tipo) => {
    navigate(`/OrganizationPage/edit/${tipo}/${id}`);
  };

  const handlePostulaciones = (id) => {
    navigate(`/organization/postulaciones/${id}`);
  };

  useEffect(() => {
    const fetchOportunidades = async () => {
      const userUID = auth.user ? auth.user.uid : null;
      if (userUID) {
        try {
          // Obtener actividades
          const actividadesRef = collection(
            db,
            "organizacion",
            userUID,
            "actividades"
          );
          const actividadesSnapshot = await getDocs(actividadesRef);
          const actividadesList = actividadesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setActividades(actividadesList);

          // Obtener eventos
          const eventosRef = collection(db, "organizacion", userUID, "eventos");
          const eventosSnapshot = await getDocs(eventosRef);
          const eventosList = eventosSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEventos(eventosList);
        } catch (error) {
          console.error("Error al obtener las oportunidades:", error);
        }
      }
    };

    fetchOportunidades();
  }, [auth.user]);

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <HeaderWebApp />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Bienvenido, Organización!
        </h1>
        <button
          onClick={() => navigate("/OrganizationPage/ActForm")}
          className="bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-orange-500 transition-colors mb-6"
        >
          Añadir Actividad
        </button>

        {/* Lista de Actividades */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Actividades</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {actividades.length > 0 ? (
              actividades.map((actividad) => (
                <TarjetaActividad
                  key={actividad.id}
                  imagenURL={actividad.imagenURL || "defaultImage.jpg"}
                  title={actividad.title || "Sin título"}
                  descripcion={actividad.descripcion || "Sin descripción"}
                  personas={actividad.personas || 0}
                  categorias={actividad.categorias || []}
                  donaciones={actividad.donaciones || false}
                  donacionesMonetarias={actividad.donacionesMonetarias || null}
                  donacionesMateriales={actividad.donacionesMateriales || []}
                  id={actividad.id}
                  tipo="actividades"
                  organizacionId={auth.user.uid}
                  onModificar={handleModificar}
                  onPostulaciones={handlePostulaciones}
                />
              ))
            ) : (
              <p className="text-gray-600">No tienes actividades disponibles.</p>
            )}
          </div>
        </section>

        {/* Lista de Eventos */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Eventos</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {eventos.length > 0 ? (
              eventos.map((evento) => (
                <TarjetaActividad
                  key={evento.id}
                  imagenURL={evento.imagenURL || "defaultImage.jpg"}
                  title={evento.title || "Sin título"}
                  descripcion={evento.descripcion || "Sin descripción"}
                  personas={evento.personas || 0}
                  categorias={evento.categorias || []}
                  donaciones={evento.donaciones || false}
                  donacionesMonetarias={evento.donacionesMonetarias || null}
                  donacionesMateriales={evento.donacionesMateriales || []}
                  id={evento.id}
                  tipo="eventos"
                  organizacionId={auth.user.uid}
                  onModificar={handleModificar}
                  onPostulaciones={handlePostulaciones}
                />
              ))
            ) : (
              <p className="text-gray-600">No tienes eventos disponibles.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrganizationPage;

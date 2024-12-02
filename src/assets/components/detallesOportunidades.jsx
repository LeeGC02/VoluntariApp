import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import { db } from "../../firebase/firebase.config";

const DetallesOportunidad = ({ id, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        let dataFetched = null;

        // Intentar buscar en "Actividades"
        const actividadDoc = doc(db, "Actividades", id);
        const actividadSnap = await getDoc(actividadDoc);

        if (actividadSnap.exists()) {
          dataFetched = { ...actividadSnap.data(), tipo: "Actividad" };
        } else {
          // Intentar buscar en "Eventos" si no está en "Actividades"
          const eventoDoc = doc(db, "Eventos", id);
          const eventoSnap = await getDoc(eventoDoc);

          if (eventoSnap.exists()) {
            dataFetched = { ...eventoSnap.data(), tipo: "Evento" };
          }
        }

        if (dataFetched) {
          setData(dataFetched);
        } else {
          alert("No se encontraron detalles para el ID proporcionado.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles:", error);
        alert("Ocurrió un error al obtener los detalles.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetalles();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null; // No renderizar nada si no hay datos
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>

        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        <p><strong>Tipo:</strong> {data.tipo}</p>
        <p><strong>Fecha de Creación:</strong> {new Date(data.fechaCreacion).toLocaleDateString()}</p>
        <p><strong>Fecha de Inicio:</strong> {new Date(data.fechaInicio).toLocaleDateString()}</p>
        <p><strong>Fecha de Fin:</strong> {new Date(data.fechaFin).toLocaleDateString()}</p>
        <p><strong>Edad Requerida:</strong> {data.edad || "No especificada"}</p>
        <p><strong>Descripción:</strong> {data.descripcion}</p>
        <p><strong>Duración:</strong> {data.duracion || "No especificada"}</p>
        <p><strong>Habilidades:</strong> {data.habilidades?.join(", ") || "No requeridas"}</p>
        <p><strong>Categorías:</strong> {data.categorias?.join(", ") || "No especificadas"}</p>
        <p><strong>Personas Requeridas:</strong> {data.personas || "No especificado"}</p>
        <div>
          <h2 className="text-lg font-bold mt-4">Horario Disponible</h2>
          {data.tiempoLibre?.días && data.tiempoLibre?.horario ? (
            <div>
              <p><strong>Días:</strong> {data.tiempoLibre.días.join(", ")}</p>
              <p>
                <strong>Horario:</strong> {data.tiempoLibre.horario.inicio} - {data.tiempoLibre.horario.fin}
              </p>
            </div>
          ) : (
            <p>No especificado</p>
          )}
        </div>
        <div className="mt-6">
          {data.donaciones && (
            <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => navigate(`/donaciones/${id}`)} // Redirige al formulario de donaciones
          >
            DONACIONES
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallesOportunidad;

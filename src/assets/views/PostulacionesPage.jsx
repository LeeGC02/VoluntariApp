import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom"; // Importar useNavigate
import { db } from "../../firebase/firebase.config";
import HeaderWebApp from "../components/HeaderWebApp";

const PostulacionesPage = () => {
  const { id } = useParams(); // ID de la actividad/evento desde la URL
  const navigate = useNavigate(); // Hook para navegación
  const [postulaciones, setPostulaciones] = useState([]);

  useEffect(() => {
    const fetchPostulaciones = async () => {
      try {
        const postulacionesRef = collection(db, "Postulaciones");
        const snapshot = await getDocs(postulacionesRef);
        const lista = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((postulacion) => postulacion.actividadEventoId === id); // Filtrar por actividad/evento
        setPostulaciones(lista);
      } catch (error) {
        console.error("Error al obtener las postulaciones:", error);
      }
    };

    fetchPostulaciones();
  }, [id]);

  const handleEstadoChange = async (postulacionId, nuevoEstado) => {
    try {
      const docRef = doc(db, "Postulaciones", postulacionId);
      await updateDoc(docRef, { estado: nuevoEstado });
      setPostulaciones((prev) =>
        prev.map((postulacion) =>
          postulacion.id === postulacionId
            ? { ...postulacion, estado: nuevoEstado }
            : postulacion
        )
      );
      alert("Estado actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("Hubo un error al actualizar el estado.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <HeaderWebApp />
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Postulaciones</h1>
        {postulaciones.length > 0 ? (
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead>
  <tr>
    <th className="px-4 py-2 border">Nombre Completo</th>
    <th className="px-4 py-2 border">Correo</th>
    <th className="px-4 py-2 border">Teléfono</th>
    <th className="px-4 py-2 border">Ciudad</th>
    <th className="px-4 py-2 border">Nivel Educación</th>
    <th className="px-4 py-2 border">Fecha de Postulación</th>
    <th className="px-4 py-2 border">Mensaje</th>
    <th className="px-4 py-2 border">Estado</th>
    <th className="px-4 py-2 border">Acciones</th>
  </tr>
</thead>
<tbody>
  {postulaciones.map((postulacion) => (
    <tr key={postulacion.id}>
      <td className="px-4 py-2 border">{postulacion.nombreCompleto}</td>
      <td className="px-4 py-2 border">{postulacion.email}</td>
      <td className="px-4 py-2 border">{postulacion.telefono}</td>
      <td className="px-4 py-2 border">{postulacion.ciudad}</td>
      <td className="px-4 py-2 border">{postulacion.nivelEducacion}</td>
      <td className="px-4 py-2 border">{new Date(postulacion.fechaPostulacion).toLocaleString()}</td>
      <td className="px-4 py-2 border">{postulacion.mensaje}</td>
      <td className="px-4 py-2 border">{postulacion.estado}</td>
      <td className="px-4 py-2 border">
        <button
          onClick={() => handleEstadoChange(postulacion.id, "aceptado")}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
        >
          Aceptar
        </button>
        <button
          onClick={() => handleEstadoChange(postulacion.id, "rechazado")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Rechazar
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        ) : (
          <p className="text-center">No hay postulaciones disponibles.</p>
        )}
      </div>
      <button
          onClick={() => navigate(-1)} // Regresa a la página anterior
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Volver
        </button>
    </div>
  );
};

export default PostulacionesPage;

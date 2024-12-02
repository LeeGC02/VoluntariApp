import React, { useState } from "react";
import ModificacionOportunidad from "./ModificacionOportunidad";
import DetallesOportunidad from "./detallesOportunidades";
import { db } from "../../firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const TarjetaActividad = ({
  title,
  descripcion,
  personas,
  categorias,
  donaciones,
  donacionesMonetarias,
  donacionesMateriales,
  id,
  tipo, // "actividades" o "eventos" para diferenciar la colección
  organizacionId, // Recibimos el ID de la organización
  onPostulaciones,
}) => {
  const [showModalDetalles, setShowModalDetalles] = useState(false);
  const [showModalModificar, setShowModalModificar] = useState(false);
  const [estado, setEstado] = useState("Activo"); // Controla el estado de la actividad

  const handleCambiarEstado = async () => {
    const nuevoEstado = estado === "Activo" ? "Suspendido" : "Activo";

    try {
      // Actualizar en la colección general (Actividades/Eventos)
      const docRefGeneral = doc(db, tipo === "actividades" ? "Actividades" : "Eventos", id);
      await updateDoc(docRefGeneral, { estado: nuevoEstado });

      // Actualizar en la subcolección de la organización
      const docRefOrg = doc(db, "organizacion", organizacionId, tipo, id);
      await updateDoc(docRefOrg, { estado: nuevoEstado });

      setEstado(nuevoEstado);
      alert(`Estado cambiado a ${nuevoEstado}`);
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  const handleDetallesClick = () => setShowModalDetalles(true);
  const handleModificarClick = () => setShowModalModificar(true);
  const handleCloseModalDetalles = () => setShowModalDetalles(false);
  const handleCloseModalModificar = () => setShowModalModificar(false);

  return (
    <div className="w-[45%] bg-white rounded-lg shadow-lg overflow-hidden p-4 mb-6 transform transition duration-500 hover:scale-105">
      {/* Contenido Principal */}
      <div>
        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        {/* Descripción */}
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Descripción:</span> {descripcion}
        </p>

        {/* Cantidad de Personas */}
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Cantidad de Personas:</span> {personas}
        </p>

        {/* Categorías */}
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Categorías:</span> {categorias.join(", ")}
        </p>

        {/* Donaciones */}
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Donaciones:</span> {donaciones ? "Permitidas" : "No permitidas"}
        </p>

        {/* Donaciones Monetarias */}
        {donaciones && donacionesMonetarias && (
          <div className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Donaciones Monetarias:</span>
            <p>Descripción: {donacionesMonetarias.descripcion}</p>
            <p>Meta: {donacionesMonetarias.meta} Bs</p>
          </div>
        )}

        {/* Donaciones en Especie */}
        {donaciones && donacionesMateriales && donacionesMateriales.length > 0 && (
          <div className="text-sm text-gray-700 mb-4">
            <span className="font-semibold">Donaciones en Especie:</span>
            <ul className="list-disc ml-6">
              {donacionesMateriales.map((material, index) => (
                <li key={index}>
                  {material.nombre} - {material.cantidad}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Botones de acciones */}
      <div className="flex flex-col gap-2 mt-4">
        {/* Botón de Editar */}
        <button
          onClick={handleModificarClick}
          className="bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
        >
          Editar
        </button>

        {/* Botón de Cambiar de Estado */}
        <button
          onClick={handleCambiarEstado}
          className={`py-2 rounded-lg font-semibold transition-colors ${
            estado === "Activo" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          {estado === "Activo" ? "Suspender" : "Reactivar"}
        </button>

        {/* Botón de Postulaciones */}
        <button
          onClick={() => onPostulaciones(id)}
          className="bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Postulaciones
        </button>

        {/* Botón de Detalles */}
        <button
          onClick={handleDetallesClick}
          className="bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Detalles
        </button>
      </div>

      {/* Modal de Detalles */}
      {showModalDetalles && (
        <DetallesOportunidad id={id} onClose={handleCloseModalDetalles} />
      )}

      {/* Modal de Modificar */}
      {showModalModificar && (
        <ModificacionOportunidad id={id} onClose={handleCloseModalModificar} />
      )}
    </div>
  );
};

export default TarjetaActividad;

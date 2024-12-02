import React, { useState } from "react";
import PostulacionForm from "./PostulacionForm";
import DonacionesPage from "../views/DonacionesPage"; // Importa el nuevo modal de donaciones

const UACEVCard = ({
  title,
  descripcion,
  personas,
  donaciones,
  fechaInicio,
  fechaFin,
  correo,
  id,
}) => {
  const [isPostulacionModalOpen, setIsPostulacionModalOpen] = useState(false);
  const [isDonacionesModalOpen, setIsDonacionesModalOpen] = useState(false);

  const [donacionesData, setDonacionesData] = useState(null); // Estado para almacenar los datos del modal

  const handlePostular = () => {
    setIsPostulacionModalOpen(true);
  };

  const handleDonar = () => {
    // Simula la carga de datos para el modal de donaciones
    const mockData = {
      titulo: "Apoya nuestra causa", // Esto puede cambiar según los datos de tu aplicación
      donacionesMonetariasDescripcion:
        "Tu ayuda es esencial para continuar con nuestra labor.",
      materiales: ["Ropa", "Alimentos", "Medicamentos"],
    };

    setDonacionesData(mockData); // Actualiza los datos del modal
    setIsDonacionesModalOpen(true);
  };

  return (
    <div className="w-[90%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6 mb-6 flex">
      {/* Parte Izquierda: Información de la Actividad */}
      <div className="w-1/2 pr-4 border-r border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Descripción:</span> {descripcion}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Cantidad de Personas:</span> {personas}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Donaciones:</span>{" "}
          {donaciones ? "Permitidas" : "No permitidas"}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Fecha de Inicio:</span> {fechaInicio}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Fecha Fin:</span> {fechaFin}
        </p>
      </div>

      {/* Parte Derecha: Información de la Organización */}
      <div className="w-1/2 pl-4 flex flex-col justify-between">
        {correo ? (
          <p className="text-sm text-gray-700 mb-4">
            <span className="font-semibold">Correo de la Organización:</span>{" "}
            {correo}
          </p>
        ) : (
          <p className="text-sm text-gray-700">Cargando información...</p>
        )}

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={handlePostular}
            className="bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Postular
          </button>
          {donaciones && (
            <button
              onClick={handleDonar}
              className="bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Donar
            </button>
          )}
        </div>
      </div>

      {/* Modal para Postulación */}
      {isPostulacionModalOpen && (
        <PostulacionForm
          id={id}
          title={title}
          onClose={() => setIsPostulacionModalOpen(false)}
        />
      )}

      {/* Modal para Donaciones */}
      {isDonacionesModalOpen && donacionesData && (
        <DonacionesPage
          id={id} // Pasar la ID al modal de donaciones
          data={donacionesData} // Pasa los datos al modal
          onClose={() => setIsDonacionesModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UACEVCard;

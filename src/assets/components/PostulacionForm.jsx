import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const PostulacionForm = ({ id, title, onClose }) => {
  const [mensaje, setMensaje] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nivelEducacion, setNivelEducacion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [aCerca, setACerca] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "Postulaciones"), {
        actividadEventoId: id,
        actividadEventoTitle: title,
        mensaje,
        nombreCompleto,
        telefono,
        nivelEducacion,
        fechaNacimiento,
        email,
        ciudad,
        aCerca,
        fechaPostulacion: new Date().toISOString(),
      });

      alert("¡Postulación enviada exitosamente!");
      onClose();
    } catch (error) {
      console.error("Error al enviar la postulación:", error);
      alert("Hubo un error al enviar la postulación. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90%] overflow-y-auto">
        {/* Contenedor del formulario con scroll */}
        <h2 className="text-2xl font-bold mb-4">Postular a {title}</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="mb-4">
            <label className="block text-gray-700">Nombre Completo:</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono:</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nivel de Educación:</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={nivelEducacion}
              onChange={(e) => setNivelEducacion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha de Nacimiento:</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ciudad:</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Acerca de ti:</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="3"
              value={aCerca}
              onChange={(e) => setACerca(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mensaje:</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="3"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            ></textarea>
          </div>
          {/* Botones */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostulacionForm;

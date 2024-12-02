import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ModificacionOportunidad = ({ id, tipo, organizacionId, onClose }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "organizacion", organizacionId, tipo, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.error("No se encontraron datos.");
      }
    };

    fetchData();
  }, [id, tipo, organizacionId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const docRef = doc(db, "organizacion", organizacionId, tipo, id);
      await updateDoc(docRef, formData);
      alert("Datos actualizados con éxito.");
      onClose();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  if (!formData) return <p>Cargando...</p>;

  return (
    <div className="modal-backdrop">
      <div className="modal-container bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-orange-600">Modificar Oportunidad</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="block text-gray-700 font-semibold">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="form-control border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          {/* Añade aquí los demás campos de ActForm con el mismo estilo */}
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-500"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="ml-4 bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModificacionOportunidad;

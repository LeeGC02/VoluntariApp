import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const EditarOportunidad = ({ id, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        let fetchedData = null;

        // Intentar cargar desde "Actividades"
        const actividadDoc = doc(db, "Actividades", id);
        const actividadSnap = await getDoc(actividadDoc);

        if (actividadSnap.exists()) {
          fetchedData = { ...actividadSnap.data(), tipo: "Actividad" };
        } else {
          // Intentar cargar desde "Eventos" si no está en "Actividades"
          const eventoDoc = doc(db, "Eventos", id);
          const eventoSnap = await getDoc(eventoDoc);

          if (eventoSnap.exists()) {
            fetchedData = { ...eventoSnap.data(), tipo: "Evento" };
          }
        }

        if (fetchedData) {
          setData(fetchedData);
        } else {
          alert("No se encontraron detalles para el ID proporcionado.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles:", error);
        alert("Ocurrió un error al cargar los detalles.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetalles();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedData = {
      title: formData.get("title"),
      personas: formData.get("personas"),
      categorias: formData.get("categorias").split(",").map((cat) => cat.trim()),
      duracion: formData.get("duracion"),
      fechaInicio: formData.get("fechaInicio"),
      fechaFin: formData.get("fechaFin"),
      habilidades: formData.get("habilidades").split(",").map((hab) => hab.trim()),
      donaciones: formData.get("donaciones") === "true",
      descripcion: formData.get("descripcion"),
      edad: formData.get("edad"),
      tiempoLibre: {
        dias: formData.get("dias").split(",").map((dia) => dia.trim()),
        horario: {
          inicio: formData.get("horaInicio"),
          fin: formData.get("horaFin"),
        },
      },
    };

    try {
      const collectionName = data.tipo === "Actividad" ? "Actividades" : "Eventos";
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updatedData);

      alert("Oportunidad actualizada con éxito.");
      onClose();
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("No se pudo actualizar la oportunidad.");
    }
  };

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
    return null;
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

        <h1 className="text-2xl font-bold mb-4">Editar {data.tipo}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              name="title"
              type="text"
              defaultValue={data.title}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Personas Requeridas</label>
            <input
              name="personas"
              type="number"
              defaultValue={data.personas}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Categorías</label>
            <input
              name="categorias"
              type="text"
              defaultValue={data.categorias?.join(", ")}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Habilidades</label>
            <input
              name="habilidades"
              type="text"
              defaultValue={data.habilidades?.join(", ")}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              name="descripcion"
              defaultValue={data.descripcion}
              required
              className="w-full border rounded p-2"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
              <input
                name="fechaInicio"
                type="datetime-local"
                defaultValue={data.fechaInicio}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Fin</label>
              <input
                name="fechaFin"
                type="datetime-local"
                defaultValue={data.fechaFin}
                required
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Donaciones Permitidas</label>
            <input
              name="donaciones"
              type="checkbox"
              defaultChecked={data.donaciones}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarOportunidad;

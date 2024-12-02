import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebase/firebase.config';
import { doc, setDoc, collection } from 'firebase/firestore';
import HeaderWebApp from '../components/HeaderWebApp';

const ActForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const userUID = auth.user ? auth.user.uid : null;

  const [isActividad, setIsActividad] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [allowDonations, setAllowDonations] = useState(false);
  const [allowMonetaryDonations, setAllowMonetaryDonations] = useState(false);
  const [allowMaterialDonations, setAllowMaterialDonations] = useState(false);
  const [materiales, setMateriales] = useState([]);

  const toggleSelection = (item, setSelected, selected) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const addMaterial = () =>
    setMateriales([...materiales, { nombre: '', cantidad: '' }]);

  const updateMaterial = (index, field, value) => {
    const updated = [...materiales];
    updated[index][field] = value;
    setMateriales(updated);
  };

  const removeMaterial = (index) =>
    setMateriales(materiales.filter((_, i) => i !== index));

  const handleSwitch = () => {
    setIsActividad(!isActividad);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const fechaInicio = new Date(formData.get("fechaInicio"));
    const fechaFin = new Date(formData.get("fechaFin"));
    const duracion = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));

    const actividadData = {
      title: formData.get("title"),
      personas: formData.get("personas"),
      categorias: selectedCategories,
      duracion,
      fechaInicio: formData.get("fechaInicio"),
      fechaFin: formData.get("fechaFin"),
      habilidades: formData.get("habilidades"),
      donaciones: allowDonations,
      requisitos: formData.get("requisitos"),
      descripcion: formData.get("descripcion"),
      fechaCreacion: new Date().toISOString(),
      tiempoLibre: {
        dias: availableDays,
        horario: {
          inicio: timeStart,
          fin: timeEnd,
        },
      },
      donacionesMonetarias: allowMonetaryDonations
        ? {
            descripcion: formData.get("descripcionMonetaria"),
            meta: parseInt(formData.get("metaMonetaria")),
          }
        : null,
      donacionesMateriales: allowMaterialDonations ? materiales : null,
    };

    console.log("Datos del formulario:", actividadData);

    if (!userUID) {
      console.error("Usuario no autenticado.");
      return;
    }

    try {
      const oportunidadID = `oportunidadId${Date.now()}`;
      const subcoleccion = isActividad ? "actividades" : "eventos";

      // Guardar en la colección de actividades/eventos de la organización
      await setDoc(
        doc(collection(db, "organizacion", userUID, subcoleccion), oportunidadID),
        actividadData
      );

      // Guardar en la colección general
      const coleccionGeneral = isActividad ? "Actividades" : "Eventos";
      await setDoc(doc(collection(db, coleccionGeneral), oportunidadID), {
        ...actividadData,
        organizacion: auth.user.email,
      });

      // Guardar en la colección Donaciones
      if (allowDonations) {
        const donacionData = {
          oportunidadId: oportunidadID,
          donacionesMonetarias: allowMonetaryDonations
            ? {
                descripcion: formData.get("descripcionMonetaria"),
                meta: parseInt(formData.get("metaMonetaria")),
              }
            : null,
          donacionesMateriales: allowMaterialDonations ? materiales : null,
        };

        await setDoc(doc(collection(db, "Donaciones"), oportunidadID), donacionData);
        console.log("Donaciones almacenadas con éxito");
      }

      console.log(`${isActividad ? "Actividad" : "Evento"} creada con éxito`);
      navigate("/OrganizationPage");
    } catch (error) {
      console.error("Error al crear la actividad, evento o donaciones:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 mt-16">
      <HeaderWebApp />
      <button onClick={() => navigate(-1)} className="text-orange-500 flex items-center mb-4">
        <Icon icon="material-symbols:arrow-back" className="mr-2" />
        Volver
      </button>
      <div className="bg-white rounded-lg shadow-md p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{isActividad ? "Formulario de Actividad" : "Formulario de Evento"}</h1>
          <div className="flex items-center">
            <span className={`${isActividad ? "text-orange-500" : ""}`}>Actividad</span>
            <label className="mx-2">
              <input type="checkbox" onChange={handleSwitch} className="hidden" />
              <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner relative cursor-pointer">
                <div
                  className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform ${
                    isActividad ? "translate-x-0" : "translate-x-5"
                  } transition-transform`}
                ></div>
              </div>
            </label>
            <span className={`${!isActividad ? "text-orange-500" : ""}`}>Evento</span>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título y Personas */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input name="title" type="text" placeholder="Título" required className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1"># Personas</label>
              <input name="personas" type="number" placeholder="##" required className="w-full border rounded p-2" />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium mb-1">Descripción General</label>
            <textarea
              name="descripcion"
              placeholder="Breve descripción de la actividad o evento"
              required
              className="w-full border rounded p-2 h-32"
            ></textarea>
          </div>

          {/* Categorías */}
          <div>
            <label className="block text-sm font-medium mb-1">Categorías</label>
            <div className="flex gap-2 flex-wrap">
              {["Educación", "Social", "Ambiental"].map(category => (
                <button
                  type="button"
                  key={category}
                  onClick={() => toggleSelection(category, setSelectedCategories, selectedCategories)}
                  className={`border px-3 py-1 rounded ${
                    selectedCategories.includes(category) ? "bg-orange-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Fecha */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
              <input name="fechaInicio" type="datetime-local" required className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Fin</label>
              <input name="fechaFin" type="datetime-local" required className="w-full border rounded p-2" />
            </div>
          </div>

          {/* Habilidades */}
          <div>
            <label className="block text-sm font-medium mb-1">Habilidades</label>
            <input
              type="text"
              name="habilidades"
              placeholder="Ejemplo: fuerte, habilidoso, sexy"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Horario */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Hora Inicio</label>
              <input
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora Fin</label>
              <input
                type="time"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </div>


          {/* Disponibilidad de Días */}
          <div>
            <label className="block text-sm font-medium mb-1">Días Disponibles</label>
            <div className="flex gap-2 flex-wrap">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(day => (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleSelection(day, setAvailableDays, availableDays)}
                  className={`border px-3 py-1 rounded ${
                    availableDays.includes(day) ? "bg-orange-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Requisitos */}
          <div>
            <label className="block text-sm font-medium mb-1">Requisitos</label>
            <select name="requisitos" className="w-full border rounded p-2">
              <option value="Todos">Todos</option>
              <option value="Mayores de 18 años">Mayores de 18 años</option>
            </select>
          </div>

          {/* Donaciones */}
          <div>
            <label className="block text-sm font-medium mb-1">¿Permitir donaciones?</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allowDonations}
                onChange={() => setAllowDonations(!allowDonations)}
                className="w-4 h-4"
              />
            </div>

            {/* Donaciones monetarias */}
            {allowDonations && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Donaciones Monetarias</label>
                <input
                  type="checkbox"
                  checked={allowMonetaryDonations}
                  onChange={() => setAllowMonetaryDonations(!allowMonetaryDonations)}
                  className="w-4 h-4"
                />
                {allowMonetaryDonations && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <input
                      name="descripcionMonetaria"
                      type="text"
                      className="w-full border rounded p-2"
                    />
                    <label className="block text-sm font-medium mb-1">Meta (Bs)</label>
                    <input
                      name="metaMonetaria"
                      type="number"
                      className="w-full border rounded p-2"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Donaciones en especie */}
            {allowDonations && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Donaciones en Especie</label>
                <input
                  type="checkbox"
                  checked={allowMaterialDonations}
                  onChange={() => setAllowMaterialDonations(!allowMaterialDonations)}
                  className="w-4 h-4"
                />
                {allowMaterialDonations && (
                  <div className="mt-2">
                    {materiales.map((material, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Nombre del material"
                          value={material.nombre}
                          onChange={(e) => updateMaterial(index, "nombre", e.target.value)}
                          className="w-full border rounded p-2"
                        />
                        <input
                          type="number"
                          placeholder="Cantidad"
                          value={material.cantidad}
                          onChange={(e) => updateMaterial(index, "cantidad", e.target.value)}
                          className="w-full border rounded p-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeMaterial(index)}
                          className="text-red-500"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addMaterial}
                      className="mt-2 px-4 py-2 bg-orange-500 text-white rounded"
                    >
                      Agregar Material
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActForm;

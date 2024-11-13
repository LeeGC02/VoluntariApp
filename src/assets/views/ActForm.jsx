import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebase/firebase.config'; // Asegúrate de que está bien configurado
import { doc, setDoc, collection } from 'firebase/firestore';
import './ActForm.css';
import HeaderWebApp from '../components/HeaderWebApp';

const ActForm = () => {
  const navigate = useNavigate();
  const auth = useAuth(); // Para obtener la UID del usuario
  const userUID = auth.user ? auth.user.uid : null;

  const [isActividad, setIsActividad] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const goBack = () => {
    navigate(-1);
  };

  const handleSwitch = () => {
    setIsActividad(!isActividad);
  };

  const toggleSelection = (item, setSelected, selected) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Recopilamos los datos del formulario
    const actividadData = {
      title: e.target.title.value,
      personas: e.target.personas.value,
      categorias: selectedCategories,
      duracion: e.target.duracion.value,
      fechaInicio: e.target.fechaInicio.value,
      fechaFin: e.target.fechaFin.value,
      habilidades: selectedSkills,
      donaciones: isActividad ? e.target.donaciones.checked : false,
      descripcion: e.target.descripcion.value,
    };

    // Comprobamos que el usuario está autenticado
    if (!userUID) {
      console.error("Usuario no autenticado.");
      return;
    }

    try {
      // Establecemos el ID del documento para la actividad o evento (por ejemplo, usando un ID autogenerado o uno personalizado)
      const oportunidadID = `oportunidadId${Date.now()}`;

      // Enviar los datos a la subcolección correcta: eventos o actividades
      const subcoleccion = isActividad ? "actividades" : "eventos";

      await setDoc(doc(collection(db, "organizacion", userUID, subcoleccion), oportunidadID), actividadData);

      console.log("Actividad/Evento creada con éxito");

      // Redirigir a la página de la organización
      navigate("/OrganizationPage");
    } catch (error) {
      console.error("Error al crear la actividad o evento:", error);
    }
  };

  return (
    <div className="form-container">
      <HeaderWebApp></HeaderWebApp>
      <button onClick={goBack}>
        <Icon icon="material-symbols:arrow-back" />
        Volver
      </button>
      <header className="header">
        <h1>Formulario de Actividad</h1>
        <div className="switch-container">
          <span className={isActividad ? "active" : ""}>Actividad</span>
          <label className="switch">
            <input type="checkbox" onChange={handleSwitch} />
            <span className="slider"></span>
          </label>
          <span className={!isActividad ? "active" : ""}>Evento</span>
        </div>
      </header>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input name="title" type="text" placeholder="Título" required />
        </div>
        <div className="form-group">
          <label># Personas</label>
          <input name="personas" type="number" placeholder="##" required />
        </div>
        <div className="form-group">
          <label>Categorías</label>
          <div className="selectable-container">
            {["Educación", "Social", "Ambiental"].map(category => (
              <div 
                key={category} 
                className={`selectable ${selectedCategories.includes(category) ? "selected" : ""}`}
                onClick={() => toggleSelection(category, setSelectedCategories, selectedCategories)}
              >
                <Icon icon={category === "Educación" ? "material-symbols:category" : 
                            category === "Social" ? "material-symbols:volunteer-activism" : 
                            "mdi:tree"} />
                {category}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Duración</label>
          <input name="duracion" type="text" placeholder="Ejemplo: 3 meses" required />
        </div>
        <div className="form-group">
          <label>Fecha Inicio</label>
          <input name="fechaInicio" type="datetime-local" required />
        </div>
        <div className="form-group">
          <label>Fecha Fin</label>
          <input name="fechaFin" type="datetime-local" required />
        </div>
        <div className="form-group">
          <label>Habilidades Requeridas</label>
          <div className="selectable-container">
            {["Liderazgo", "Empatía", "Comunicación"].map(skill => (
              <div 
                key={skill} 
                className={`selectable ${selectedSkills.includes(skill) ? "selected" : ""}`}
                onClick={() => toggleSelection(skill, setSelectedSkills, selectedSkills)}
              >
                <Icon icon={skill === "Liderazgo" ? "mdi:brain" : 
                            skill === "Empatía" ? "mdi:heart" : 
                            "mdi:chat"} />
                {skill}
              </div>
            ))}
          </div>
        </div>
        {isActividad && (
          <div className="form-group">
            <label>Donaciones</label>
            <input name="donaciones" type="checkbox" />
          </div>
        )}
        <div className="form-group">
          <label>Descripción</label>
          <textarea name="descripcion" placeholder="Descripción" required></textarea>
        </div>
        <button type="submit" className="create-button">
          <Icon icon="mdi:plus" /> Crear
        </button>
      </form>
    </div>
  );
};

export default ActForm;

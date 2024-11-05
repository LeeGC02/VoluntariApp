//import './FormVolunteer.css';
import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase.config";

const FormVolunteer = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    nombreUsuario: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    fechaNacimiento: "",
    edad: "",
    nivelEducacion: "",
    habilidades: "",
    aCerca: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const userDoc = doc(db, "usuario", user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        try {
          await updateDoc(userDoc, {
            ...formData,
            formularioCompletado: true,
          }, { merge: true });
          alert("Datos guardados exitosamente");
          window.location.reload();
        } catch (error) {
          console.error("Error al guardar datos: ", error);
        }
      } else {
        console.error("No hay documento para actualizar.");
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="group-form-register">
        <span className="span-form-register">Nombre Completo: </span>
        <input
          name="nombreCompleto"
          type="text"
          placeholder="Juan Perez"
          value={formData.nombreCompleto}
          onChange={handleChange}
          className="input-form-register"
        />
      </div>
      <div className="group-form-register">
        <span className="span-form-register">Nombre de Usuario: </span>
        <input
          name="nombreUsuario"
          className="input-form-register"
          type="text"
          placeholder="Juan"
          value={formData.nombreUsuario}
          onChange={handleChange}
        />
      </div>
      <div className="group-form-register">
        <span className="span-form-register">Teléfono de Contacto: </span>
        <input
          name="telefono"
          className="input-form-register"
          type="number"
          placeholder="12345678"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>
      <div className="group-form-register">
        <span className="span-form-register">Dirección: </span>
        <input
        name="direccion"
          className="input-form-register"
          type="text"
          placeholder="Av. Brasil"
          value={formData.direccion}
          onChange={handleChange}
        />
      </div>
      <div className="group-form-register">
        <span className="span-form-register">Ciudad: </span>
        <input
          name="ciudad"
          className="input-form-register"
          type="text"
          placeholder="La Paz"
          value={formData.ciudad}
          onChange={handleChange}
        />
      </div>
      <div className="group-form-register">
        <span className="span-form-register">Fecha de nacimiento: </span>
        <input
          name="fechaNacimiento"
          className="input-form-register"
          type="date"
          placeholder="pruebita200g@mail.com"
          value={formData.fechaNacimiento}
          onChange={handleChange}
        />
      </div>
      <div className="group-form-register">
        <span className="span-form-register">Edad: </span>
        <input
          name="edad"
          className="input-form-register"
          type="number"
          placeholder="18"
          value={formData.edad}
          onChange={handleChange}
        />
      </div>
      <div className="group-form-register">
        <span className="span-form-register">Nivel de educación: </span>
        <select className="combo-container" name="nivelEducacion" value={formData.nivelEducacion} onChange={handleChange}>
          <option className="combo-edu" value="" disabled>
            Selecciona tu nivel de educación
          </option>
          <option className="combo-edu" value="primaria">
            Primaria
          </option>
          <option className="combo-edu" value="secundaria">
            Secundaria
          </option>
          <option className="combo-edu" value="bachillerato">
            Bachillerato
          </option>
          <option className="combo-edu" value="universidad">
            Universidad
          </option>
          <option className="combo-edu" value="postgrado">
            Postgrado
          </option>
        </select>
      </div>
      <div className="group-form-register">
        <span className="span-form-register">
          ¿Que habilidad tienes?
        </span>
        <textarea
        name="habilidades"
          className="input-form-register"
          type="text"
          placeholder="Activista apasionado"
          value={formData.habilidades}
          onChange={handleChange}
        />
      </div>
      <div className="group-form-register">
        <span className="span-form-register">
          Cuentanos A cerca de Tí
        </span>
        <textarea
        name="aCerca"
          className="input-form-register"
          type="text"
          placeholder="Activista apasionado"
          value={formData.aCerca}
          onChange={handleChange}
        />
      </div>
      <div className="btn-container-registro">
        <button type="submit" className="span-btn-registro">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormVolunteer;

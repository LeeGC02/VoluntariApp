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
  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateFields = () => {
    const newErrors = {};
    if (!formData.nombreCompleto) newErrors.nombreCompleto = "Este campo es obligatorio.";
    if (!formData.nombreUsuario) newErrors.nombreUsuario = "Este campo es obligatorio.";
    if (!formData.telefono) newErrors.telefono = "Este campo es obligatorio.";
    if (!formData.ciudad) newErrors.ciudad = "Este campo es obligatorio.";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "Este campo es obligatorio.";
    if (!formData.edad) newErrors.edad = "Este campo es obligatorio.";
    if (!formData.nivelEducacion) newErrors.nivelEducacion = "Este campo es obligatorio.";
    if (!formData.habilidades) newErrors.habilidades = "Este campo es obligatorio.";
    if (!formData.aCerca) newErrors.aCerca = "Este campo es obligatorio.";
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos antes de enviar
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors); // Actualiza los errores en el estado
      return; // Detener el envío del formulario
    }

    const user = auth.currentUser;

    if (user) {
      const userDoc = doc(db, "usuario", user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        try {
          await updateDoc(
            userDoc,
            {
              ...formData,
              formularioCompletado: true,
            },
            { merge: true }
          );
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
    <form
      className="form-container bg-beige rounded-md p-3"
      onSubmit={handleSubmit}
    >
      <div className="group-form-register block text-sm/6 font-medium text-gray-900">
        <label htmlFor="nombreCompleto" className="font-medium text-sm">
          Nombre Completo: <span className="text-red-500">*</span>
        </label>
        <input
          name="nombreCompleto"
          type="text"
          placeholder="Juan Perez"
          value={formData.nombreCompleto}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.nombreCompleto ? "ring-red-500" : ""
          }`}
        />
        {errors.nombreCompleto && (
          <p className="text-red-500 text-xs mt-1">{errors.nombreCompleto}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="nombreUsuario" className="font-medium text-sm">
          Nombre de Usuario: <span className="text-red-500">*</span>
        </label>
        <input
          name="nombreUsuario"
          type="text"
          placeholder="Juan"
          value={formData.nombreUsuario}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.nombreUsuario ? "ring-red-500" : ""
          }`}
        />
        {errors.nombreUsuario && (
          <p className="text-red-500 text-xs mt-1">{errors.nombreCompleto}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="telefono" className="font-medium text-sm">
          Teléfono de Contacto: <span className="text-red-500">*</span>
        </label>
        <input
          name="telefono"
          type="number"
          placeholder="12345678"
          value={formData.telefono}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.telefono ? "ring-red-500" : ""
          }`}
        />
        {errors.telefono && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="direccion" className="font-medium text-sm">
          Dirección:
        </label>
        <input
          name="direccion"
          type="text"
          placeholder="Av. Brasil"
          value={formData.direccion}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.direccion ? "ring-red-500" : ""
          }`}
        />
        {errors.direccion && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="ciudad" className="font-medium text-sm">
          Ciudad: <span className="text-red-500">*</span>
        </label>
        <input
          name="ciudad"
          type="text"
          placeholder="La Paz"
          value={formData.ciudad}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.ciudad ? "ring-red-500" : ""
          }`}
        />
        {errors.ciudad && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="fechaNacimiento" className="font-medium text-sm">
          Fecha de Nacimiento: <span className="text-red-500">*</span>
        </label>
        <input
          name="fechaNacimiento"
          type="date"
          placeholder="pruebita200g@mail.com"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.fechaNacimiento ? "ring-red-500" : ""
          }`}
        />
        {errors.fechaNacimiento && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="edad" className="font-medium text-sm">
          Edad: <span className="text-red-500">*</span>
        </label>
        <input
          name="edad"
          type="number"
          placeholder="18"
          value={formData.edad}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.edad ? "ring-red-500" : ""
          }`}
        />
        {errors.edad && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="nivelEducacion" className="font-medium text-sm">
          Nivel de educación: <span className="text-red-500">*</span>
        </label>
        <select
          name="nivelEducacion"
          value={formData.nivelEducacion}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.nivelEducacion ? "ring-red-500" : ""
          }`}
          defaultValue="default"
        >
          <option className="combo-edu"  value="default" >
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
        {errors.nivelEducacion && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="habilidades" className="font-medium text-sm">
          ¿Que habilidad tienes? <span className="text-red-500">*</span>
        </label>
        <textarea
          name="habilidades"
          type="text"
          placeholder="Activista apasionado"
          value={formData.habilidades}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.habilidades ? "ring-red-500" : ""
          }`}
        />
        {errors.habilidades && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="aCerca" className="font-medium text-sm">
          Cuentanos A cerca de Tí <span className="text-red-500">*</span>
        </label>
        <textarea
          name="aCerca"
          type="text"
          placeholder="Activista apasionado"
          value={formData.aCerca}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangePrincipal sm:text-sm/6 caret-red-500 ${
            errors.aCerca ? "ring-red-500" : ""
          }`}
        />
        {errors.aCerca && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>
      <div className="btn-container-registro">
        <button type="submit" className="border p-2 rounded-xl w-full bg-orangePrincipal text-white hover:bg-white hover:text-orangePrincipal">
          Guardar Datos
        </button>
      </div>
    </form>
  );
};

export default FormVolunteer;

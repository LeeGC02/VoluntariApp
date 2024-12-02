import { useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase.config";

const FormOrganization = () => {
  const [formDataOrg, setFormDataOrg] = useState({
    nombreCompleOrg: "",
    nombreOrgaUsu: "",
    nombreCompRepre: "",
    tipoOrg: "",
    misionOrg: "",
    visionOrg: "",
    objOrg: "",
    ciudad: "",
    direccionOrg: "",
    sitioWeb: "",
    telefonoOrg: "",
    fechaFundacion: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataOrg({ ...formDataOrg, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formDataOrg.nombreCompleOrg)
      newErrors.nombreCompleOrg = "Este campo es obligatorio.";
    if (!formDataOrg.nombreOrgaUsu)
      newErrors.nombreOrgaUsu = "Este campo es obligatorio.";
    if (!formDataOrg.nombreCompRepre)
      newErrors.nombreCompRepre = "Este campo es obligatorio.";
    if (!formDataOrg.tipoOrg) newErrors.tipoOrg = "Este campo es obligatorio.";
    if (!formDataOrg.misionOrg)
      newErrors.misionOrg = "Este campo es obligatorio.";
    if (!formDataOrg.visionOrg)
      newErrors.visionOrg = "Este campo es obligatorio.";
    if (!formDataOrg.objOrg) newErrors.objOrg = "Este campo es obligatorio.";
    if (!formDataOrg.ciudad) newErrors.ciudad = "Este campo es obligatorio.";
    if (!formDataOrg.direccionOrg)
      newErrors.direccionOrg = "Este campo es obligatorio.";
    if (!formDataOrg.sitioWeb)
      newErrors.sitioWeb = "Este campo es obligatorio.";
    if (!formDataOrg.telefonoOrg)
      newErrors.telefonoOrg = "Este campo es obligatorio.";
    if (!formDataOrg.fechaFundacion)
      newErrors.fechaFundacion = "Este campo es obligatorio.";
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const org = auth.currentUser;

    if (org) {
      const userOrgDoc = doc(db, "usuario", org.uid);
      const organizationSnap = await getDoc(userOrgDoc);
      if (organizationSnap.exists()) {
        try {
          const userRole = organizationSnap.data().rol;
          if (userRole === "organization") {
            const organizationRef = collection(userOrgDoc, "organizacion");
            await setDoc(doc(organizationRef, "perfil"), formDataOrg);
            alert("Datos guardandos existosamente");
            window.location.reload();
          } else {
            alert("El usuario no tiene el rol de organizacion.");
          }
        } catch (error) {
          console.error("error al guardar datos: ", error);
        }
      } else {
        console.error("No hay documento para actualizar.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container bg-beige rounded-md p-3 flex flex-col gap-3"
    >
      <div className="group-form-register block text-sm/6 font-medium text-gray-900">
        <label htmlFor="nombreCompleOrg" className="font-medium text-sm">
          Nombre Completo de la Organización:{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          name="nombreCompleOrg"
          type="text"
          placeholder="Manitos"
          value={formDataOrg.nombreCompleOrg}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.nombreCompleOrg ? "ring-red-500" : ""
          }`}
        />
        {errors.nombreCompleOrg && (
          <p className="text-red-500 text-xs mt-1">{errors.nombreCompleOrg}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="nombreOrgaUsu" className="font-medium text-sm">
          Nombre de Usuario de la Organización:{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          name="nombreOrgaUsu"
          type="text"
          placeholder="Manitos"
          value={formDataOrg.nombreOrgaUsu}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.nombreOrgaUsu ? "ring-red-500" : ""
          }`}
        />
        {errors.nombreOrgaUsu && (
          <p className="text-red-500 text-xs mt-1">{errors.nombreOrgaUsu}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="nombreCompRepre" className="font-medium text-sm">
          Nombre Completo del Representante de la Organización:{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          name="nombreCompRepre"
          type="text"
          placeholder="Juan Perez"
          value={formDataOrg.nombreCompRepre}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.nombreCompRepre ? "ring-red-500" : ""
          }`}
        />
        {errors.nombreCompRepre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombreCompRepre}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="tipoOrg" className="font-medium text-sm">
          Tipo de Organización: <span className="text-red-500">*</span>
        </label>
        <select
          name="tipoOrg"
          value={formDataOrg.tipoOrg}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.tipoOrg ? "ring-red-500" : ""
          }`}
          defaultValue="default"
        >
          <option className="combo-edu" value="default">
            Selecciona el Tipo de Organización
          </option>
          <option className="combo-edu" value="primaria">
            ONG
          </option>
          <option className="combo-edu" value="secundaria">
            Fundación
          </option>
          <option className="combo-edu" value="bachillerato">
            Empresa Social
          </option>
          <option className="combo-edu" value="universidad">
            Cooperativa
          </option>
          <option className="combo-edu" value="postgrado">
            Institución Educativa
          </option>
          <option className="combo-edu" value="postgrado">
            Centro de Salud
          </option>
          <option className="combo-edu" value="postgrado">
            Organización Religiosa
          </option>
          <option className="combo-edu" value="postgrado">
            Organización Comunitaria
          </option>
          <option className="combo-edu" value="postgrado">
            Organismo Internacional
          </option>
          <option className="combo-edu" value="postgrado">
            Otro
          </option>
        </select>
        {errors.tipoOrg && (
          <p className="text-red-500 text-xs mt-1">{errors.tipoOrg}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="visionOrg" className="font-medium text-sm">
          Visión de la Organización: <span className="text-red-500">*</span>
        </label>
        <textarea
          name="visionOrg"
          type="text"
          placeholder="Vision"
          value={formDataOrg.visionOrg}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.visionOrg ? "ring-red-500" : ""
          }`}
        />
        {errors.visionOrg && (
          <p className="text-red-500 text-xs mt-1">{errors.visionOrg}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="misionOrg" className="font-medium text-sm">
          Misión de la Organización: <span className="text-red-500">*</span>
        </label>
        <textarea
          name="misionOrg"
          type="text"
          placeholder="Mision"
          value={formDataOrg.misionOrg}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.misionOrg ? "ring-red-500" : ""
          }`}
        />
        {errors.misionOrg && (
          <p className="text-red-500 text-xs mt-1">{errors.misionOrg}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="objOrg" className="font-medium text-sm">
          Objetivo de la Organización: <span className="text-red-500">*</span>
        </label>
        <textarea
          name="objOrg"
          type="text"
          placeholder="Objetivo"
          value={formDataOrg.objOrg}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.objOrg ? "ring-red-500" : ""
          }`}
        />
        {errors.objOrg && (
          <p className="text-red-500 text-xs mt-1">{errors.objOrg}</p>
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
          value={formDataOrg.ciudad}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.ciudad ? "ring-red-500" : ""
          }`}
        />
        {errors.ciudad && (
          <p className="text-red-500 text-xs mt-1">{errors.ciudad}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="direccionOrg" className="font-medium text-sm">
          Dirección:
        </label>
        <input
          name="direccionOrg"
          type="text"
          placeholder="Av. Brasil"
          value={formDataOrg.direccionOrg}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.direccionOrg ? "ring-red-500" : ""
          }`}
        />
        {errors.direccionOrg && (
          <p className="text-red-500 text-xs mt-1">{errors.direccionOrg}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="telefonoOrg" className="font-medium text-sm">
          Teléfono de Contacto: <span className="text-red-500">*</span>
        </label>
        <input
          name="telefonoOrg"
          type="text"
          placeholder="12345678"
          maxLength={8}
          value={formDataOrg.telefonoOrg}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.telefonoOrg ? "ring-red-500" : ""
          }`}
        />
        {errors.telefonoOrg && (
          <p className="text-red-500 text-xs mt-1">{errors.telefonoOrg}</p>
        )}
      </div>

      <div className="group-form-register">
        <label htmlFor="sitioWeb" className="font-medium text-sm">
          Sitio Web:{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          name="sitioWeb"
          type="url"
          placeholder="https://tu-sitio-web.com"
          value={formDataOrg.sitioWeb}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.sitioWeb ? "ring-red-500" : ""
          }`}
        />
        {errors.sitioWeb && (
          <p className="text-red-500 text-xs mt-1">{errors.sitioWeb}</p>
        )}
      </div>
      <div className="group-form-register">
        <label htmlFor="fechaFundacion" className="font-medium text-sm">
          Fecha de Fundación: <span className="text-red-500">*</span>
        </label>
        <input
          name="fechaFundacion"
          type="date"
          placeholder="pruebita200g@mail.com"
          value={formDataOrg.fechaFundacion}
          onChange={handleChange}
          className={`input-form-register block w-full rounded-md border-0 p-1.5 text-gray-900 font-light ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bluePrincipal sm:text-sm/6 caret-bluePrincipal ${
            errors.fechaFundacion ? "ring-red-500" : ""
          }`}
        />
        {errors.fechaFundacion && (
          <p className="text-red-500 text-xs mt-1">{errors.fechaFundacion}</p>
        )}
      </div>
      <div className="btn-container-registro">
        <button
          type="submit"
          className="border p-2 rounded-xl w-full bg-bluePrincipal text-white hover:bg-white hover:text-bluePrincipal"
        >
          Guardar Datos
        </button>
      </div>
    </form>
  );
};

export default FormOrganization;

/* nombreCompleOrg: "",
    nombreOrgaUsu: "",
    nombreCompRepre: "",
    tipoOrg: "",
    misionOrg: "",
    visionOrg: "",
    objOrg: "",
    ciudad: "",
    direccionOrg: "",
    telefonoOrg: "",
    sitioWeb: "",
    fechaFundacion: "", */

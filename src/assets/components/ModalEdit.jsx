import PropTypes from "prop-types";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase.config";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react"; // Asegúrate de tener esta librería instalada

const ModalEdit = ({ show, onClose, data }) => {
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState({
    nombreCompleto: false,
    habilidades: false,
    ciudad: false,
    edad: false,
    aCerca: false,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const volunteerProfileDoc = doc(
        db,
        "usuario",
        user.uid,
        "voluntario",
        "perfil"
      );
      await updateDoc(volunteerProfileDoc, formData);
      onClose();
      window.location.reload();
    }
  };

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-md p-3 bg-beige ">
          {/* <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button> */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Editar Perfil
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "Nombre Completo",
                field: "nombreCompleto",
                type: "text",
              },
              { label: "Habilidades", field: "habilidades", type: "text" },
              { label: "Ciudad", field: "ciudad", type: "text" },
              { label: "Edad", field: "edad", type: "number" },
            ].map(({ label, field, type }) => (
              <div
                key={field}
                className="flex items-center justify-between"
              >
                <label className="text-gray-700 font-medium">{label}:</label>
                <div className="flex items-center text-sm">
                  {editMode[field] ? (
                    <input
                      type={type}
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      onBlur={() => toggleEditMode(field)}
                      className="ml-2 p-2 border border-gray-300 rounded-md w-full"
                    />
                  ) : (
                    <span className="ml-2 flex-1">
                      {formData[field] || "No disponible"}
                    </span>
                  )}
                  <Icon
                    icon="line-md:edit"
                    className="text-orangePrincipal cursor-pointer ml-2"
                    onClick={() => toggleEditMode(field)}
                  />
                </div>
              </div>
            ))}

            <div className="flex items-start flex-col">
              <label className="text-gray-700 font-medium">Acerca de:</label>
              <div className="flex items-center w-full justify-between text-sm">
                {editMode.aCerca ? (
                  <textarea
                    name="aCerca"
                    value={formData.aCerca || ""}
                    onChange={handleChange}
                    onBlur={() => toggleEditMode("aCerca")}
                    className="ml-2 p-2 border border-gray-300 rounded-md w-11/12 text-justify "
                  />
                ) : (
                  <p className="w-11/12 text-justify">{formData.aCerca || "No disponible"}</p>
                )}
                <Icon
                  icon="line-md:edit"
                  className="text-orangePrincipal cursor-pointer ml-2 w=1/5"
                  onClick={() => toggleEditMode("aCerca")}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-orange-200 text-orange-600 p-3 rounded-md hover:bg-orange-600 hover:text-orange-200"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ModalEdit.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default ModalEdit;

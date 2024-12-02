import PropTypes from "prop-types";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase.config";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react"; // Asegúrate de tener esta librería instalada

const ModalEditOrganization = ({ show, onClose, data }) => {
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState({
    nombreCompleOrg: false,
    tipoOrg: false,
    misionOrg: false,
    visionOrg: false,
    direccionOrg: false,
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
      const orgProfileDoc = doc(
        db,
        "usuario",
        user.uid,
        "organizacion",
        "perfil"
      );
      await updateDoc(orgProfileDoc, formData);
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
        <div className="rounded-md p-3 bg-blue-50">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Editar Organización
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[ 
              {
                label: "Nombre Completo de la Organización",
                field: "nombreCompleOrg",
                type: "text",
              },
              { label: "Tipo de Organización", field: "tipoOrg", type: "text" },
              { label: "Misión", field: "misionOrg", type: "text" },
              { label: "Visión", field: "visionOrg", type: "text" },
              { label: "Dirección", field: "direccionOrg", type: "text" }
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
                    className="text-bluePrincipal cursor-pointer ml-2"
                    onClick={() => toggleEditMode(field)}
                  />
                </div>
              </div>
            ))}

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
                className="bg-blue-200 text-blue-600 p-3 rounded-md hover:bg-blue-600 hover:text-blue-200"
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

ModalEditOrganization.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default ModalEditOrganization;

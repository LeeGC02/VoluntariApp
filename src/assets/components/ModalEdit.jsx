import "./ModalEdit.css";
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
      const userDoc = doc(db, "usuario", user.uid);
      await updateDoc(userDoc, formData);
      onClose(); // Cerrar el modal después de guardar
      window.location.reload();
    }
  };

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h2>Editar Perfil</h2>
          <div className="editable-field">
            <label>Nombre Completo:</label>
            {editMode.nombreCompleto ? (
              <input
                type="text"
                name="nombreCompleto"
                value={formData.nombreCompleto || ""}
                onChange={handleChange}
                onBlur={() => toggleEditMode("nombreCompleto")}
              />
            ) : (
              <span>{formData.nombreCompleto || "No disponible"}</span>
            )}
            <Icon
              icon="line-md:edit"
              onClick={() => toggleEditMode("nombreCompleto")}
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />
          </div>

          <div className="editable-field">
            <label>Habilidades:</label>
            {editMode.habilidades ? (
              <input
                type="text"
                name="habilidades"
                value={formData.habilidades || ""}
                onChange={handleChange}
                onBlur={() => toggleEditMode("habilidades")}
              />
            ) : (
              <span>{formData.habilidades || "No disponible"}</span>
            )}
            <Icon
              icon="line-md:edit"
              onClick={() => toggleEditMode("habilidades")}
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />
          </div>

          <div className="editable-field">
            <label>Ciudad:</label>
            {editMode.ciudad ? (
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad || ""}
                onChange={handleChange}
                onBlur={() => toggleEditMode("ciudad")}
              />
            ) : (
              <span>{formData.ciudad || "No disponible"}</span>
            )}
            <Icon
              icon="line-md:edit"
              onClick={() => toggleEditMode("ciudad")}
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />
          </div>

          <div className="editable-field">
            <label>Edad:</label>
            {editMode.edad ? (
              <input
                type="number"
                name="edad"
                value={formData.edad || ""}
                onChange={handleChange}
                onBlur={() => toggleEditMode("edad")}
              />
            ) : (
              <span>{formData.edad || "No disponible"}</span>
            )}
            <Icon
              icon="line-md:edit"
              onClick={() => toggleEditMode("edad")}
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />
          </div>

          <div className="editable-field">
            <label>Acerca de:</label>
            {editMode.aCerca ? (
              <textarea
                name="aCerca"
                value={formData.aCerca || ""}
                onChange={handleChange}
                onBlur={() => toggleEditMode("aCerca")}
              />
            ) : (
              <p>{formData.aCerca || "No disponible"}</p>
            )}
            <Icon
              icon="line-md:edit"
              onClick={() => toggleEditMode("aCerca")}
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />
          </div>

          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

ModalEdit.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object, // Asegúrate de incluir la prop 'data'
};

export default ModalEdit;

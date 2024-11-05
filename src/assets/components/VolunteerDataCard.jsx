// import { Icon } from "@iconify/react/dist/iconify.js";
import "./VolunteerDataCard.css";
import ModalEdit from "./ModalEdit";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase.config";

const VolunteerDataCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editableData, setEditableData] = useState({});

  const [volunteerData, setVolunteerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setEditableData(volunteerData); // Cargar los datos actuales en el estado editable
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);


  useEffect(() => {
    const fetchVolunteerData = async (user) => {
      if (user) {
        const userDoc = doc(db, "usuario", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          console.log("Datos de Firestore:", docSnap.data());
          setVolunteerData(docSnap.data());
        } else {
          console.error("No se encontró el documento del usuario.");
        }
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchVolunteerData(user);
      } else {
        console.error("No hay usuario autenticado.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="data-vol-container">
      <div className="portrate"></div>
      <img
        className="photo-vol"
        src="/VoluntariAppLogo.png"
        alt="avartar-volunteer"
      />
      <div className="container-data">
        <h3>{volunteerData?.nombreCompleto || "Nombre Completo"}</h3>
        <h4>{volunteerData?.habilidades || "Descripción de habilidades"}</h4>
        <span>{volunteerData?.ciudad || "Ciudad"}</span>
        <span>{volunteerData?.email || "Email"}</span>
        <span>
          {volunteerData?.edad || "Edad del voluntario"} años
        </span>
        <h4>Acerca de Juan Perez</h4>
        <p>
          {volunteerData?.aCerca || "A cerca del Voluntario"}
        </p>
        <>
          <button className="btn-edit" onClick={openModal}>
            Editar Perfil
          </button>
          <ModalEdit show={showModal} onClose={closeModal} data={editableData} />
        </>
      </div>
    </div>
  );
};

export default VolunteerDataCard;

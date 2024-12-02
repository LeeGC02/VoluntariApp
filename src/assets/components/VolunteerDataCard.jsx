// import { Icon } from "@iconify/react/dist/iconify.js";
import "./VolunteerDataCard.css";
import ModalEdit from "./ModalEdit";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase.config";
// import Loading from "./Loading";

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
    const fetchData = async (user) => {
      if (user) {
        try {
          // Obtener datos de la colección "usuario"
          const userRef = doc(db, "usuario", user.uid);
          const userDoc = await getDoc(userRef);

          // Obtener datos de la subcolección "voluntario"
          const volunteerRef = doc(
            db,
            "usuario",
            user.uid,
            "voluntario",
            "perfil"
          );
          const volunteerDoc = await getDoc(volunteerRef);

          if (userDoc.exists() && volunteerDoc.exists()) {
            const userData = userDoc.data();
            const volunteerData = volunteerDoc.data();

            // Combinar datos de ambas colecciones
            setVolunteerData({ ...volunteerData, email: userData.email });
          } else {
            console.error("No se encontraron documentos para el usuario.");
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user);
      } else {
        console.error("No hay usuario autenticado.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    //return <Loading/>
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="data-vol-container">
      <div className="portrate"></div>
      <img
        className="absolute h-40 w-40 rounded-full border-4 border-white z-20 top-56"
        src="/VoluntariAppLogo.png"
        alt="avatar-volunteer"
      />
      <div className="container-data flex flex-col gap-3 mt-7">
        <h3 className="text-xl font-bold">
          {volunteerData?.nombreCompleto || "Nombre Completo"}
        </h3>
        <h4 className="text-base font-light">
          {volunteerData?.habilidades || "Descripción de habilidades"}
        </h4>

        <div className="flex gap-3 items-center font-light">
          <span>{volunteerData?.email || "Email"}</span>|
          <span>{volunteerData?.edad || "Edad del voluntario"} años</span>|
          <span>{volunteerData?.ciudad || "Ciudad"}</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h4 className="text-lg font-medium underline">
            Acerca de
          </h4>
          <p className="text-center">
            {volunteerData?.aCerca || "A cerca del Voluntario"}
          </p>
        </div>
        <>
          <button
            className="bg-orange-200 text-orange-600 p-3 rounded-md hover:bg-orange-600 hover:text-orange-200 "
            onClick={openModal}
          >
            Editar Perfil
          </button>
          <ModalEdit
            show={showModal}
            onClose={closeModal}
            data={editableData}
          />
        </>
      </div>
    </div>
  );
};

export default VolunteerDataCard;

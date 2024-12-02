import ModalEditOrganization from "./ModalEditOrganization";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase.config";

const OrganizationDataCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [organizationData, setOrganizationData] = useState(null);
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setEditableData(organizationData); // Cargar los datos actuales en el estado editable
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

          // Obtener datos de la subcolección "organizacion"
          const orgRef = doc(db, "usuario", user.uid, "organizacion", "perfil");
          const orgDoc = await getDoc(orgRef);

          if (userDoc.exists() && orgDoc.exists()) {
            const userData = userDoc.data();
            const organizationData = orgDoc.data();

            // Combinar datos de ambas colecciones
            setOrganizationData({ ...organizationData, email: userData.email });
          } else {
            console.error("No se encontraron documentos para la organización.");
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
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="data-org-container p-6 max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg">
      <div className="container-data flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-center">
          {organizationData?.nombreCompleOrg || "Nombre de la Organización"}
        </h3>
        <h4 className="text-lg font-light text-center">
          {organizationData?.tipoOrg || "Tipo de Organización"}
        </h4>

        <div className="flex justify-center gap-4 text-sm font-light mt-3">
          <span>{organizationData?.email || "Email"}</span>|
          <span>{organizationData?.ciudad || "Ciudad"}</span>|
          <span>{organizationData?.fechaFundacion || "Fecha de Fundación"}</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-6">
          <div className="w-full text-center">
            <h4 className="text-lg font-medium underline mb-2">Misión</h4>
            <p className="text-base text-gray-600">
              {organizationData?.misionOrg || "Misión de la Organización"}
            </p>
          </div>

          <div className="w-full text-center">
            <h4 className="text-lg font-medium underline mb-2">Visión</h4>
            <p className="text-base text-gray-600">
              {organizationData?.visionOrg || "Visión de la Organización"}
            </p>
          </div>
        </div>

        <div className="w-full text-center mt-6">
          <h4 className="text-lg font-medium underline mb-2">Dirección</h4>
          <p className="text-base text-gray-600">
            {organizationData?.direccionOrg || "Dirección de la Organización"}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={openModal}
          >
            Editar Organizacion
          </button>
        </div>

        <ModalEditOrganization
        show={showModal}
        onClose={closeModal}
        data={editableData}
      />
      </div>
    </div>
  );
};

export default OrganizationDataCard;

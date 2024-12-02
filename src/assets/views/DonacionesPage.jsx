import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";

const DonacionesPage = ({ id, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonaciones = async () => {
      try {
        setLoading(true);
        setError(null);

        const docRef = doc(db, "Donaciones", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedData = docSnap.data();

          // Extraer solo los datos necesarios
          const formattedData = {
            title: fetchedData?.title || "Donaciones",
            donacionesMonetarias: fetchedData?.donacionesMonetarias || {
              descripcion: "Descripción no disponible",
              meta: "Meta no especificada",
            },
            donacionesMateriales: Array.isArray(fetchedData?.donacionesMateriales)
              ? fetchedData.donacionesMateriales
              : [], // Asegúrate de que sea un array
          };

          setData(formattedData);
        } else {
          throw new Error("No se encontró la información de donaciones.");
        }
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError(err.message || "Ocurrió un error desconocido al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonaciones();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg">
          <p className="text-center text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg">
          <p className="text-center text-red-500">{error}</p>
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  const handleDonacionMonetaria = () => {
    console.log("Donación monetaria realizada");
    alert("Gracias por tu donación monetaria.");
    onClose();
  };

  const handleDonacionMaterial = async (material) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        alert("Debes estar autenticado para realizar una donación.");
        return;
      }
  
      const userEmail = user.email;
  
      // Datos a guardar en Firestore
      const donationData = {
        nombre: material.nombre,
        cantidad: material.cantidad,
        donador: userEmail,
        fecha: new Date().toISOString(), // Fecha de la donación
      };
  
      // Ruta dinámica en Firestore
      const collectionRef = collection(db, `Donaciones/${id}/voluntariosDonadores`);
  
      // Agregar documento
      await addDoc(collectionRef, donationData);
  
      alert(`Gracias por tu donación de ${material.nombre}.`);
      console.log("Donación guardada en Firestore:", donationData);
  
      // Cerrar modal
      onClose();
    } catch (error) {
      console.error("Error al guardar la donación:", error);
      alert("Ocurrió un error al realizar tu donación. Por favor, inténtalo de nuevo.");
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg">
        <h2 id="donaciones-title" className="text-2xl font-bold text-gray-800 mb-4">
          {data.title}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Donación monetaria */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Donación Monetaria</h3>
            <p className="text-sm text-gray-600 mb-2">{data.donacionesMonetarias.descripcion}</p>
            <p className="text-sm text-gray-600 mb-4">Meta: {data.donacionesMonetarias.meta}</p>
            <button
              onClick={handleDonacionMonetaria}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Donar
            </button>
          </div>

          {/* Donación material */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Donaciones Materiales</h3>
            {data.donacionesMateriales.length > 0 ? (
              data.donacionesMateriales.map((material, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm text-gray-600">Material: {material.nombre}</p>
                  <p className="text-sm text-gray-600">Cantidad: {material.cantidad}</p>
                  <button
                    onClick={() => handleDonacionMaterial(material)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-600 transition block"
                  >
                    Donar {material.nombre}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No se especificaron materiales para donar.</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DonacionesPage;

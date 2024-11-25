//import React from 'react'
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import FormVolunteer from "../components/FormVolunteer";
import HeaderWebApp from "../components/HeaderWebApp";
import "./VolunteerPage.css";

const VolunteerPage = () => {
  const [formularioCompletado, setFormularioCompletado] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState("");
  useEffect(() => {
    const checkFormularioCompleto = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "usuario", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const isComplete = data.formularioCompletado === true;

          setFormularioCompletado(isComplete);
          setNombreUsuario(data.nombreUsuario || "Voluntario");
          // setFormularioCompletado(docSnap.data().formularioCompletado || false);
        } else {
          console.log("No existe el documento del usuario en Firestore");
          setFormularioCompletado(false); // Usuario no tiene datos, se muestra el formulario
        }
      } else {
        console.log("No hay usuario autenticado");
        setFormularioCompletado(false); // No hay usuario autenticado, se muestra el formulario
      }
    };
    checkFormularioCompleto();
  }, []);

  const handleFormComplete = () => {
    setFormularioCompletado(true); // Cambia el estado a completado
  };

  return (
    <div className="flex h-screen">
      {formularioCompletado === false && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-start pt-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-scroll">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <FormVolunteer onComplete={handleFormComplete} />
          </div>
        </div>
      )}
      <div className="flex-1">
        <HeaderWebApp />
        <main className="p-6">
          {formularioCompletado === true ? (
            <>
              <h1 className="text-2xl font-bold">
                Bienvenid@, {nombreUsuario}!!!
              </h1>
              <p>Gracias por completar los datos.</p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod,
                quasi ab veritatis debitis deserunt doloremque itaque mollitia
                placeat rerum reprehenderit possimus tempore a vel molestiae
                distinctio. Libero quisquam sit voluptas!
              </p>
            </>
          ) : (
            <p>Cargando...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default VolunteerPage;

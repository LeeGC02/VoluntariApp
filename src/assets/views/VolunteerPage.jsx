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
  return (
    <div className="flex h-screen">
      {/* Slider Bar */}
      {/* <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Menú</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li><a href="/dashboard" className="hover:text-gray-300">Inicio</a></li>
            <li><a href="/profile" className="hover:text-gray-300">Mi Perfil</a></li>
            <li><a href="/notifications" className="hover:text-gray-300">Notificaciones</a></li>
            <li><a href="/settings" className="hover:text-gray-300">Configuraciones</a></li>
          </ul>
        </nav>
      </aside> */}

      {/* Main Content */}
      <div className="flex-1">
        <HeaderWebApp />
        <main className="p-6">
          <h1 className="text-2xl font-bold">Bienvenid@, {nombreUsuario}!!!</h1>
          {formularioCompletado === false ? (
            <FormVolunteer />
          ) : (
            <p>Gracias por completar los datos.</p>
          )}
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, quasi ab veritatis debitis deserunt doloremque itaque mollitia placeat rerum reprehenderit possimus tempore a vel molestiae distinctio. Libero quisquam sit voluptas!</p>
        </main>
      </div>
    </div>
  );
};

export default VolunteerPage;

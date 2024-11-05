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
    <div>
      <HeaderWebApp />
      <main>
        <h1 className="huno">Bienvenid@, {nombreUsuario}!!!</h1>
        {formularioCompletado === false ? (
          <FormVolunteer />
        ) : (
          <p>Gracias por completar los datos.</p>
        )}
        Contenido de inicio
      </main>
    </div>
  );
};

export default VolunteerPage;

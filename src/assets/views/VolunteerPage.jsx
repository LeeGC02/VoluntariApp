import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase.config";
import { doc, collection, getDocs } from "firebase/firestore";
import FormVolunteer from "../components/FormVolunteer";
import HeaderWebApp from "../components/HeaderWebApp";
import "./VolunteerPage.css";
import Loading from "../components/Loading";

const VolunteerPage = () => {
  const [formularioCompletado, setFormularioCompletado] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const checkFormularioCompleto = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = doc(db, "usuario", user.uid);
          const voluntarioRef = collection(userDoc, "voluntario");
          const voluntarioSnap = await getDocs(voluntarioRef);

          if (!voluntarioSnap.empty) {
            // Buscar el documento "perfil" en la subcolección "voluntario"
            const perfilDoc = voluntarioSnap.docs.find(
              (doc) => doc.id === "perfil"
            );

            if (perfilDoc && perfilDoc.exists()) {
              const perfilData = perfilDoc.data();
              setNombreUsuario(perfilData.nombreUsuario || "voluntario");
              setFormularioCompletado(true);
            } else {
              console.log("No se encontró el documento 'perfil' en voluntario.");
              setFormularioCompletado(false);
            }
          } else {
            console.log("La subcolección 'voluntario' está vacía.");
            setFormularioCompletado(false);
          }
        } catch (error) {
          console.error("Error al obtener datos de Firestore:", error);
          setFormularioCompletado(false);
        }
      } else {
        console.log("No hay usuario autenticado");
        setFormularioCompletado(false);
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
            <h1 className="text-orangePrincipal font-bold text-2xl text-center">¡Bienvenido a VoluntariApp!</h1>
            <p className="text-sm py-3 text-justify text">
              Antes de empezar, necesitamos que completes tu perfil. Esto es
              crucial para que las organizaciones puedan conocerte mejor y
              ofrecerte oportunidades de voluntariado que se ajusten a tus
              habilidades e intereses.
            </p>
            <h2 className="text-xl font-semibold mb-4 text-justify">
              ¡Completa tu perfil y empieza a hacer la diferencia!
            </h2>

            <FormVolunteer onComplete={handleFormComplete} />
          </div>
        </div>
      )}
      <div className="flex-1">
        {formularioCompletado === true ? (
          <>
            <HeaderWebApp />
            <main className="p-6">
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
            </main>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default VolunteerPage;

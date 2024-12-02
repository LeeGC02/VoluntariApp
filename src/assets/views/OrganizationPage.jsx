import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase.config";
import { doc, collection, getDocs } from "firebase/firestore";
import Loading from "../components/Loading";
import FormOrganization from "../components/FormOrganization";
import HeaderOrganization from "../components/HeaderOrganization";

const OrganizationPage = () => {
  const [formularioCompletado, setFormularioCompletado] = useState(null);
  const [nombreOrgaUsu, setNombreOrgaUsu] = useState("");

  useEffect(() => {
    const checkFormularioCompleto = async () => {
      const org = auth.currentUser;
      if (org) {
        try {
          const userOrgDoc = doc(db, "usuario", org.uid);
          const organizationRef = collection(userOrgDoc, "organizacion");
          const organizationSnap = await getDocs(organizationRef);

          if (!organizationSnap.empty) {
            const perfilOrgDoc = organizationSnap.docs.find(
              (doc) => doc.id === "perfil"
            );

            if (perfilOrgDoc && perfilOrgDoc.exists()) {
              const perfilOrgData = perfilOrgDoc.data();
              setNombreOrgaUsu(perfilOrgData.nombreOrgaUsu || "organizacion");
              setFormularioCompletado(true);
            } else {
              console.log("No se encontro el doc 'perfil' en organizacion.");
              setFormularioCompletado(false);
            }
          } else {
            console.log("La subcoleccion 'organizacion' esta vacia");
            setFormularioCompletado(false);
          }
        } catch (error) {
          console.log("error al obtener datos de firebase", error);
          setFormularioCompletado(false);
        }
      } else {
        console.log("no hay usuario autenticado");
        setFormularioCompletado(false);
      }
    };

    checkFormularioCompleto();
  }, []);

  const handleFormComplete = () => {
    setFormularioCompletado(true);
  };
  return (
    <div className="flex h-screen">
      {formularioCompletado === false && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-start pt-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-scroll">
            <h1 className="text-bluePrincipal font-bold text-2xl text-center">
              ¡Bienvenido a VoluntariApp!
            </h1>
            <p className="text-sm py-3 text-justify text">
              Antes de empezar, necesitamos que completes el perfil de tu
              organización. Esto es crucial para que los voluntarios puedan
              conocerte mejor y postularse a las oportunidades de voluntariado
              que ofrezcas.
            </p>
            <h2 className="text-xl font-semibold mb-4 text-justify">
            ¡Completa el perfil de tu organización y comienza a generar un impacto positivo!
            </h2>
            <FormOrganization onComplete={handleFormComplete} />
          </div>
        </div>
        
      )}
      <div className="flex-1">
        {formularioCompletado === true ? (
          <>
            <HeaderOrganization/>
            <main className="p-6">
              <h1 className="text-2xl font-bold">
                Te damos la Bienvenida, {nombreOrgaUsu}!!!
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

export default OrganizationPage;

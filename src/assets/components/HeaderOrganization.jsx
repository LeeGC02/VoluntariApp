import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase/firebase.config";
import { doc, collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";

const HeaderOrganization = () => {
  const [nombreOrgaUsu, setNombreOrgaUsu] = useState("Cargando...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizationName = async () => {
      const org = auth.currentUser;
      console.log("Usuario autenticado:", org);
      if (org) {
        try {
          const userOrgDoc = doc(db, "usuario", org.uid);
          const organizationRef = collection(userOrgDoc, "organizacion");
          const organizationSnap = await getDocs(organizationRef);
    
          console.log("Datos de la subcolección 'organizacion':", organizationSnap.docs);
    
          const perfilOrgDoc = organizationSnap.docs.find(
            (doc) => doc.id === "perfil"
          );
    
          if (perfilOrgDoc) {
            const perfilOrgData = perfilOrgDoc.data();
            console.log("Datos del perfil:", perfilOrgData);
            setNombreOrgaUsu(perfilOrgData.nombreOrgaUsu || "organizacion");
          } else {
            console.log("No se encontró el documento 'perfil'.");
            setNombreOrgaUsu("Organización");
          }
        } catch (error) {
          console.log("Error al obtener datos de Firebase:", error);
          setNombreOrgaUsu("Organización");
        }
      } else {
        console.log("No hay usuario autenticado.");
        setNombreOrgaUsu("Organización");
      }
    };
    

    fetchOrganizationName();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Usa el método correcto para cerrar sesión
      navigate("/LoginPage");
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  const handleProfileChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "logout") {
      handleLogout();
    } else if (selectedValue === "profile") {
      navigate("/OrganizationPage/OrganizationProfile");
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between bg-bluePrincipal p-4 text-white fixed top-0 left-0 right-0 z-50">
        <a href="/OrganizationPage" className="flex items-center">
          <div className="flex items-center space-x-2 animate-pulse">
            <img
              className="w-10 h-10 transition-transform duration-300 hover:scale-105"
              src="/VoluntariAppLogo.png"
              alt="logo VoluntariApp"
            />
            <h2 className="font-extrabold text-2xl">VoluntariApp</h2>
          </div>
        </a>
        <div className="flex gap-4 items-center">
          <div
            className="flex flex-col items-center cursor-pointer gap-1"
            onClick={() => navigate("/OrganizationPage/ProductOrgPage")}
          >
            <Icon icon="dashicons:products" width="20" height="20" className="text-white" />
            <span className="text-sm">Productos</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <Icon
              icon="material-symbols:notifications-sharp"
              width="24"
              height="24"
              className="text-white"
            />
            <span className="text-sm">Notificaciones</span>
          </div>
          <div className="flex flex-col items-center relative">
            <Icon
              icon="solar:user-bold"
              width="24"
              height="24"
              className="text-white"
            />
            
            <select
              className="bg-bluePrincipal text-white border-none rounded-md text-sm px-2 cursor-pointer focus:outline-none w-fit"
              name="pro"
              id="pro"
              onChange={handleProfileChange}
              defaultValue="default"
            >
              <option value="default" disabled>
              <span className="text-sm">Hola, {nombreOrgaUsu}</span>
              </option>
              <option value="profile">Mi Perfil</option>
              <option value="logout">Cerrar Sesión</option>
            </select>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderOrganization;

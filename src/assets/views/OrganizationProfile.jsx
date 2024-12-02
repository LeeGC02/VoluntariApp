// import { useState } from "react";
import HeaderOrganization from "../components/HeaderOrganization";
import OrganizationDataCard from "../components/OrganizationDataCard";

const OrganizationProfile = () => {
  /* const [formDataOrg] = useState({
    nombreCompleOrg: "Fundación Ayuda Bolivia",
    nombreOrgaUsu: "ayudabolivia",
    nombreCompRepre: "Ana María López",
    tipoOrg: "ONG",
    misionOrg:
      "Fomentar el desarrollo sostenible en comunidades vulnerables de Bolivia.",
    visionOrg:
      "Ser un referente nacional en la implementación de proyectos sociales que transformen vidas.",
    objOrg: "Promover la educación, la salud y el bienestar social.",
    ciudad: "La Paz",
    direccionOrg: "Calle Los Pinos, Zona Sur",
    sitioWeb: "https://ayudabolivia.org",
    telefonoOrg: "+591 123 456 789",
    fechaFundacion: "12 de Octubre de 2005",
  }); */

  return (
    <div className="bg-gray-50">
      <HeaderOrganization />
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-20">
        {/* Información general */}
        <div className="col-span-1 lg:col-span-2  rounded-lg p-6">
          <OrganizationDataCard />
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;

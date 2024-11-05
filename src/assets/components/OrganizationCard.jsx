// import React from "react";
import "./OrganizationCard.css";
import PropTypes from "prop-types";

const OrganizationCard = ({ nameOrg, descOrg }) => {
  return (
    <div className="org-recom-container">
      <div className="recommendation-org">
        <img
          className="photo-org"
          src="/VoluntariAppLogo.png"
          alt="avartar-volunteer"
        />
        <div className="name-desc-org">
          <h5>{nameOrg}</h5>
          <span>{descOrg}</span>
        </div>
      </div>
      <button className="btn-add">Ver Perfil</button>
    </div>
  );
};

OrganizationCard.propTypes = {
  nameOrg: PropTypes.string.isRequired, // `nameOrg` debe ser una cadena de texto y es obligatorio
  descOrg: PropTypes.string.isRequired, // `descOrg` debe ser una cadena de texto y es obligatorio
};

export default OrganizationCard;

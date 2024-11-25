// import React from 'react'
import "./ExperienceCard.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";

const ExperienceCard = ({ nameOrg, descOrg, startDate, endDate }) => {
  return (
    <div className="org-exp-container">
      <div className="experience-org">
        <img
          className="photo-org"
          src="/VoluntariAppLogo.png"
          alt="avartar-volunteer"
        />
        <div className="name-exp-org">
          <h5>{nameOrg}</h5>
          <span>{descOrg}</span>
          <div className="calendar-experience">
            <Icon
              icon="line-md:calendar"
              width="24"
              height="24"
              style={{ color: "#e8402a" }}
            />
            <span>
              {startDate} - {endDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

ExperienceCard.propTypes = {
  nameOrg: PropTypes.string.isRequired, 
  descOrg: PropTypes.string.isRequired, 
  startDate: PropTypes.string.isRequired, 
  endDate: PropTypes.string.isRequired,
};

export default ExperienceCard;

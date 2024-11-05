// import React from 'react'
import "./ArchievementCard.css";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react/dist/iconify.js";

const ArchievementCard = ({ archievement }) => {
  return (
    <div className="achievement-container">
      <Icon
        icon="game-icons:achievement"
        width="60"
        height="60"
        style={{ color: "#FF6E52" }}
      />
      <p>{archievement}</p>
    </div>
  );
};

ArchievementCard.propTypes = {
  archievement: PropTypes.string.isRequired,
};

export default ArchievementCard;

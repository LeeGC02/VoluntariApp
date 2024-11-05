// import React from 'react'
import "./ReviewCard.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";

const ReviewCard = ({nameVol, nameOrg, descOrg ,review}) => {
  return (
    <div>
      <div className="comments-container">
        <div className="review-org">
          <Icon
            icon="majesticons:comments"
            width="50"
            height="50"
            style={{ color: "#FF6E52" }}
          />
          <div className="name-review-org">
            <h5>{nameOrg}</h5>
            <span>{descOrg}</span>
            <span>Por: {nameVol}</span>
          </div>
        </div>
        <p>
          {review}
        </p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  nameVol: PropTypes.string.isRequired,
  nameOrg: PropTypes.string.isRequired,
  descOrg: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default ReviewCard;

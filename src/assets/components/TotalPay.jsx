// import React from 'react'
import PropTypes from "prop-types";

const TotalPay = ({ total }) => {
  return (
    <div>
      TotalPay
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-2xl font-bold">Total: {total} Bs</h2>
      </div>
    </div>
  );
};

TotalPay.propTypes = {
    total: PropTypes.number.isRequired,
  };

export default TotalPay;

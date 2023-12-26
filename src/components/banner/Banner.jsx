import React from "react";

const Banner = ({ user, greeting }) => {
  return (
    <div className="pt-5">
      <h2 className="fw-light">
        {greeting},<span className="blue-color"> {user.email}</span>
      </h2>
    </div>
  );
};

export default Banner;

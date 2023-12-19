import React from "react";

const Banner = ({ user }) => {
  return (
    <div className="pt-5">
      <h2 className="fw-light">
        Welcome,
        <span className="blue-color"> {user.email}</span>
      </h2>
    </div>
  );
};

export default Banner;

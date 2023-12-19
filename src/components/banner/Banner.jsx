import React from "react";
import { useAuth } from "../../utils/AuthContext";

const Banner = () => {
  const { state } = useAuth();

  const email = state.user.email;

  return (
    <div className="pt-5">
      <h2 className="fw-light">
        Welcome,
        <span className="blue-color"> {email}</span>
      </h2>
    </div>
  );
};

export default Banner;

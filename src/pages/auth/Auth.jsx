import React from "react";
import { Login } from "../../components";

const Auth = () => {
  return (
    <div className="row">
      <div className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 vh-100 d-flex flex-column justify-content-center mx-auto">
        <div className="mb-5">
          <h1 className="display-6 mb-5">ServingIntel</h1>
          <h2 className="fs-1 fw-normal mb-3">Login to your account.</h2>
          <p className="fs-5 text-secondary">
            Enter your email address and password to login.
          </p>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default Auth;

import React from "react";
import { Link } from "react-router-dom";

const Heading = ({ page, usersCount }) => {
  switch (page) {
    case "dashboard":
      return (
        <div className="d-flex justify-content-between">
          <h2 className="fw-light align-self-center">
            Other Users (<span>{usersCount})</span>
          </h2>
          <Link to="/user/add" className="text-decoration-none">
            <button className="border-0 px-4 py-3 box-radius fs-4 bg-blue text-white fw-light d-flex align-items-center">
              <span className="material-icons fs-3 me-2">add</span> Add User
            </button>
          </Link>
        </div>
      );
    case "add":
      return (
        <div className="d-flex">
          <Link to="/" className="text-decoration-none">
            <button className="border-0 bg-transparent d-flex align-items-center me-3 h-100">
              <span className="material-icons fs-3">arrow_back</span>
            </button>
          </Link>
          <h2 className="fw-light align-self-center m-0">Add User</h2>
        </div>
      );
    case "edit":
      return (
        <div className="d-flex">
          <Link to="/" className="text-decoration-none">
            <button className="border-0 bg-transparent d-flex align-items-center me-3 h-100">
              <span className="material-icons fs-3">arrow_back</span>
            </button>
          </Link>
          <h2 className="fw-light align-self-center m-0">Edit User</h2>
        </div>
      );
    default:
      return "";
  }
};

const Navbar = ({ page, usersCount }) => {
  return (
    <div className="py-5">
      <Heading page={page} usersCount={usersCount} />
    </div>
  );
};

export default Navbar;

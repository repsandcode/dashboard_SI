import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./userbox.css";

const UserBox = ({ user, isCurrentUser, deleteUser }) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("visibility_off");

  const handlePasswordVisibility = () => {
    if (type === "password") {
      setIcon("visibility");
      setType("text");
    } else {
      setIcon("visibility_off");
      setType("password");
    }
  };

  return (
    <div
      className={`p-4 border-0 box-radius ${
        isCurrentUser ? "bg-blue text-white" : "bg-white"
      }`}
    >
      <p className="fs-4">{user?.email || ""}</p>

      <div className="d-flex align-items-center justify-content-between mb-5">
        <input
          className={`w-100 bg-transparent border-0 fs-5 ${
            isCurrentUser ? `text-white` : ``
          }`}
          value={user.password || ""}
          type={type}
          name="password"
          disabled
        />
        <span
          onClick={handlePasswordVisibility}
          className="material-icons fs-4 pointer"
        >
          {icon}
        </span>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <Link to={`user/${user.id}/edit`}>
          <button className="px-4 py-2 fs-5 btn-radius border-0 bg-orange text-white">
            Edit
          </button>
        </Link>
        <button
          className="px-4 py-2 fs-5 btn-radius border-0 bg-red text-white"
          onClick={() => deleteUser(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserBox;

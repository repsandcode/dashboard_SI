import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./userbox.css";

const DeleteModal = ({ id, email, onConfirm, onCancel }) => {
  console.log(id);

  return (
    <div className="delete-modal">
      <div className="delete-modal__content">
        <h1 className="fs-3">Are you sure you want to delete {email}?</h1>

        <p className="text-secondary fs-4 py-5">
          This action cannot be undone.
        </p>

        <div className="w-100 d-flex gap-3 flex-column-reverse">
          <button
            type="button"
            className="py-3 fs-4 btn-radius border bg-transparent"
            onClick={onCancel}
          >
            Close
          </button>
          <button
            type="button"
            className="py-3 fs-4 btn-radius border-0 bg-red text-white"
            onClick={() => {
              onConfirm(id);
              onCancel();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const UserBox = ({ user, isCurrentUser, deleteUser }) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("visibility_off");
  const [showModal, setShowModal] = useState(false);

  const handlePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) =>
      prevIcon === "visibility" ? "visibility_off" : "visibility"
    );
  };

  const handleDeleteButtonClick = () => {
    setShowModal(true);
  };

  const handleDeleteConfirm = (id) => {
    deleteUser(id);
    setShowModal(false);
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`p-4 border-0 box-radius ${
        isCurrentUser ? "bg-blue text-white" : "bg-white"
      }`}
    >
      <p className="fs-4">{user.email || ""}</p>

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
          type="button"
          className="px-4 py-2 fs-5 btn-radius border-0 bg-red text-white"
          onClick={handleDeleteButtonClick}
        >
          Delete
        </button>

        {showModal && (
          <DeleteModal
            id={user.id}
            email={user.email}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </div>
    </div>
  );
};

export default UserBox;

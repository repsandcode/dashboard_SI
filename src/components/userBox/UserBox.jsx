import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./userbox.css";

const DeleteModal = ({ id, email, onConfirm, onCancel }) => {
  console.log(id);

  return (
    <div className="delete-modal">
      <div className="delete-modal__content">
        <h1 className="fs-3 lh-sm">
          Are you sure you want to delete{" "}
          <span className="red-color">{email}</span>?
        </h1>

        <p className="text-secondary fs-4 py-5">
          This action cannot be undone.
        </p>

        <div className="w-100 d-flex gap-3">
          <button
            type="button"
            className="w-50 px-4 py-2 fs-4 btn-radius border bg-transparent"
            onClick={onCancel}
          >
            Close
          </button>
          <button
            type="button"
            className="w-50 px-4 py-2 fs-4 btn-radius border-0 bg-red text-white"
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

        {/* <button
          className="px-4 py-2 fs-5 btn-radius border-0 bg-red text-white"
          onClick={() => deleteUser(user.id)}
        >
          Delete
        </button> */}

        {/* <!-- Button trigger modal --> */}
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

        {/* <!-- Modal -->
        <div
          className="modal text-dark"
          id={`${user.id}`}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered p-5">
            <div className="modal-content d-flex flex-column align-items-center p-5 box-radius">
              <h1 className="modal-title fs-3" id="exampleModalLabel">
                Are you sure you want to delete this user?
              </h1>

              <p className="modal-body text-secondary fs-4 py-5">
                This action cannot be undone.
              </p>

              <div className="w-100 d-flex gap-3">
                <button
                  type="button"
                  className="w-50 px-4 py-2 fs-4 btn-radius border bg-transparent"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="w-50 px-4 py-2 fs-4 btn-radius border-0 bg-red text-white"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserBox;

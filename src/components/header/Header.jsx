import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { state } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8888/petproject/logout",
        state.user
      );

      console.log(response.data);

      if (response.data.success) {
        console.log(response.data.message);
        logout();
        navigate("/login");
      } else {
        console.log("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <header className="d-flex py-4 mb-5 justify-content-between">
      <div>
        <p className="display-6 m-0">ServingIntel Dashboard</p>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="border-0 bg-transparent d-flex align-items-center fs-4"
        >
          <span className="material-icons me-2 fs-3">logout</span> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

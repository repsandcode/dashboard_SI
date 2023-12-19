import { useState, React, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header, Navbar } from "../../components";
import { checkUserStatus } from "../../utils/checkUserStatus";
import { useAuth } from "../../utils/AuthContext";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { state } = useAuth();

  useEffect(() => {
    // Function to handle user interaction or click
    const handleUserInteraction = async () => {
      await checkUserStatus(state, logout, navigate);
    };

    // Attach event listeners to document or specific elements
    document.addEventListener("click", handleUserInteraction);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, [state, logout, navigate]);

  // email validation function using a regular expression
  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAddUser = async (event) => {
    event.preventDefault();

    if (!isValidEmailFormat(email)) {
      setError("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8888/petproject/user/add",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        console.log(response.data.message);
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred during data processing with the server");
      console.error("Failed to add a user:", error.message);
    }
  };

  return (
    <div className="">
      {error && <span className="fs-4 text-danger">{error}</span>}

      <form onSubmit={handleAddUser}>
        <div className="form-group mb-4">
          <label htmlFor="email" className="fs-4 fw-light mb-2">
            Email
          </label>
          <input
            className="form-control p-3 fs-4 input-radius"
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            autoFocus
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password" className="fs-4 fw-light mb-2">
            Password
          </label>
          <input
            className="form-control p-3 fs-4 input-radius"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="confirmPassword" className="fs-4 fw-light mb-2">
            Confirm Password
          </label>
          <input
            className="form-control p-3 fs-4 input-radius"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        <div className="pt-1">
          <button
            type="submit"
            className="bg-blue border-0 input-radius text-white  w-100 p-3 fs-4"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

const AddUser = () => {
  return (
    <div className="py-4">
      <Header />
      <Navbar page={"add"} />
      <main className="row g-0">
        <div className="col-xs-8 col-sm-6 bg-white box-radius p-5">
          <Form />
        </div>
      </main>
    </div>
  );
};

export default AddUser;

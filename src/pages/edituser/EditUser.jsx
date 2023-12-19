import { useState, useEffect, React } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { checkUserStatus } from "../../utils/checkUserStatus";
import { Header, Navbar } from "../../components";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();
  const { logout } = useAuth();
  const { state } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();

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

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/petproject/user/${id}`
      );

      if (response.data.success) {
        setEmail(response.data.user.email);
        setPassword(response.data.user.password);
        console.log(response.data.message);
      } else {
        setError("Failed to retrieve User details");
      }
    } catch (error) {
      console.error(`Failed getting details of User ${id}:`, error.message);
    }
  };

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

  const handleEditUser = async (event) => {
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
        `http://localhost:8888/petproject/user/${id}/edit`,
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
        console.log(response.data.message);
      }
    } catch (error) {
      setError("An error occurred during data processing with the server");
      console.error("Failed to save a user:", error.message);
    }
  };

  return (
    <div>
      {error && <span className="fs-4 text-danger">{error}</span>}

      <form onSubmit={handleEditUser}>
        <div className="form-group mb-4">
          <label htmlFor="email" className="fs-4 fw-light mb-2">
            Email:
          </label>
          <input
            className="form-control p-3 fs-4 input-radius"
            autoComplete="email"
            value={email}
            type="email"
            name="email"
            id="email"
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password" className="fs-4 fw-light mb-2">
            Password:
          </label>
          <input
            className="form-control p-3 fs-4 input-radius"
            value={password}
            type="password"
            name="password"
            id="password"
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="confirmPassword" className="fs-4 fw-light mb-2">
            Confirm Password:
          </label>
          <input
            className="form-control p-3 fs-4 input-radius"
            value={confirmPassword}
            type="password"
            name="password"
            id="confirmPassword"
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        <div className="pt-1">
          <button
            type="submit"
            className="bg-orange border-0 input-radius text-white  w-100 p-3 fs-4"
          >
            Save User
          </button>
        </div>
      </form>
    </div>
  );
};

const EditUser = () => {
  return (
    <div className="py-4">
      <Header />
      <Navbar page={"edit"} />
      <main className="row g-0">
        <div className="col-xs-8 col-sm-6 bg-white box-radius p-5">
          <Form />
        </div>
      </main>
    </div>
  );
};

export default EditUser;

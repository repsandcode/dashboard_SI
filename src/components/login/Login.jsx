import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // email validation function using a regular expression
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);

    // login user
    try {
      const response = await axios.post(
        "http://localhost:8888/petproject/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        console.log(response.data.message);
        login(response.data.userState);
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred during Login");
      console.error("Login failed:", error.message);
    } finally {
      // Reset loading state after the request is complete
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <span className="fs-4 text-danger">{error}</span>}

      <form onSubmit={handleLogin}>
        <div className="form-group mb-4">
          <input
            className="form-control p-3 fs-4 input-radius"
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            autoFocus
            required
          />
        </div>

        <div className="form-group mb-4">
          <input
            className="form-control p-3 fs-4 input-radius"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button
          className="btn btn-primary bg-blue border-0 text-white w-100 p-3 fs-4 input-radius"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

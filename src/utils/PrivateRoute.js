import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
  const { state } = useAuth();

  return state.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

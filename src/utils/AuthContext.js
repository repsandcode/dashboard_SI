import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define the initial state
const initialState = JSON.parse(localStorage.getItem("authState")) ?? {};

// Create the context
const AuthContext = createContext();

// Create a reducer function to handle state updates
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log(state);

  const login = async (userData) => {
    localStorage.setItem("authState", JSON.stringify(userData));
    // Log in the new user
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    // Clear authentication state in localStorage
    localStorage.removeItem("authState");
    // Dispatch the logout action
    dispatch({ type: "LOGOUT" });
  };

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      const parsedAuthState = JSON.parse(storedAuthState);
      console.log("Parsed Auth State:", parsedAuthState);
      dispatch({ type: "LOGOUT", payload: parsedAuthState.user });
    }
  }, []);

  // Save authentication state to localStorage on state change
  useEffect(() => {
    localStorage.setItem(
      "authState",
      JSON.stringify({ isLoggedIn: state.isLoggedIn, user: state.user })
    );
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};

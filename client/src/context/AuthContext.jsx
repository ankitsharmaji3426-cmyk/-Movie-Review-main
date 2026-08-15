// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { setAuthToken } from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const storedToken = localStorage.getItem("token");

  if (storedToken) setAuthToken(storedToken);

  const [user, setUser] = useState(storedUser);

  const login = ({ token, user: userObj }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj)); // Storing the whole user object
    setAuthToken(token);
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

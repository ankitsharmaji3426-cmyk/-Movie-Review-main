import React from "react";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout() {
    localStorage.clear();
    navigate("/login");
    location.reload();
  }

  return (
    <nav className="nav">
      <Link className="brand" to="/">📺 WATCHER</Link>

      <div className="nav-links">
        <Link to="/movies">Movies</Link>

        {/* ================== ✅ ADMIN PANEL BUTTON (ADDED) ================== */}
        {user?.role === "admin" && (
          <button
            className="btn btn-outline admin-btn"
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        )}
        {/* =================================================================== */}

        {token ? (
          <>
            <span className="welcome">Hi, {name}</span>
            <button onClick={logout} className="btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn btn-outline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

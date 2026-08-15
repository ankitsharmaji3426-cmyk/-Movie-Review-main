// client/src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

import "../styles/auth.css";
import "../styles/landing.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      nav(data.user.role === "admin" ? "/admin" : "/movies");
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  }

  return (
    <section className="landing auth-page">
      {/* ===== SAME MOVING BACKGROUND STRIPS AS LANDING ===== */}
      <div className="image-strips">
        <div className="strip strip1">
          {Array(6).fill(
            <img
              src="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
              alt=""
            />
          )}
        </div>

        <div className="strip strip2">
          {Array(6).fill(
            <img
              src="https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
              alt=""
            />
          )}
        </div>

        <div className="strip strip3">
          {Array(6).fill(
            <img
              src="https://image.tmdb.org/t/p/w500/3IGbjc5ZC5yxim5W0sFING2kdcz.jpg"
              alt=""
            />
          )}
        </div>

        <div className="strip strip4">
          {Array(6).fill(
            <img
              src="https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
              alt=""
            />
          )}
        </div>

        <div className="image-overlay"></div>
      </div>

      {/* ===== LOGIN CARD ===== */}
      <div className="auth">
        <h2>Welcome back</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {err && <p className="error">{err}</p>}
          <button className="btn" type="submit">Login</button>
        </form>

        <p>
          New here? <Link to="/register">Create account</Link>
        </p>
      </div>
    </section>
  );
}

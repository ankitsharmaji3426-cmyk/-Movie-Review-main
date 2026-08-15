import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, setAuthToken } from "../services/api.js";

import "../styles/auth.css";
import "../styles/landing.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      setAuthToken(data.token);
      nav("/movies");
    } catch (e) {
      setErr(e.response?.data?.message || "Registration failed");
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

      {/* ===== REGISTER CARD ===== */}
      <div className="auth">
        <h2>Create your account</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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
          <button className="btn" type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

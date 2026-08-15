// client/src/admin/AddMovie.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../services/adminApi.js";

import "./AddMovie.css";

export default function AddMovie() {
  const [form, setForm] = useState({
    title: "",
    year: "",
    genres: "",
    posterUrl: "",
    trailerYouTubeId: ""
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addMovie({
        title: form.title,
        year: form.year ? Number(form.year) : undefined,
        genres: form.genres,
        posterUrl: form.posterUrl,
        trailerYouTubeId: form.trailerYouTubeId
      });
      navigate("/admin/movies");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <h2>Add Movie</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="movie-form">
        <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input placeholder="Year" value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
        <input placeholder="Genres (comma separated)" value={form.genres} onChange={e => setForm({...form, genres: e.target.value})} />
        <input placeholder="Poster URL" value={form.posterUrl} onChange={e => setForm({...form, posterUrl: e.target.value})} />
        <input placeholder="Trailer YouTube ID" value={form.trailerYouTubeId} onChange={e => setForm({...form, trailerYouTubeId: e.target.value})} />
        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Movie"}</button>
      </form>
    </div>
  );
}

// client/src/admin/EditMovie.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovie, updateMovie } from "../services/adminApi.js";

import "./EditMovie.css";

export default function EditMovie() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    year: "",
    genres: "",
    posterUrl: "",
    trailerYouTubeId: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const { data } = await getMovie(id);
        setForm({
          title: data.title || "",
          year: data.year || "",
          genres: (data.genres || []).join(", "),
          posterUrl: data.posterUrl || "",
          trailerYouTubeId: data.trailerYouTubeId || ""
        });
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateMovie(id, {
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
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-page">
      <h2>Edit Movie</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="movie-form">
        <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input placeholder="Year" value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
        <input placeholder="Genres (comma separated)" value={form.genres} onChange={e => setForm({...form, genres: e.target.value})} />
        <input placeholder="Poster URL" value={form.posterUrl} onChange={e => setForm({...form, posterUrl: e.target.value})} />
        <input placeholder="Trailer YouTube ID" value={form.trailerYouTubeId} onChange={e => setForm({...form, trailerYouTubeId: e.target.value})} />
        <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
      </form>
    </div>
  );
}

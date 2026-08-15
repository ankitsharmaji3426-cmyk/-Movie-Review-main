// client/src/admin/MovieList.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/adminApi.js";

import './MovieList.css';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const { data } = await getMovies();
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this movie?")) return;
    try {
      await deleteMovie(id);
      setMovies(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Error deleting");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-page">
      <h2>Movies</h2>
      <button className="adminBtn" onClick={() => navigate("/admin/add")}>Add Movie</button>
      <div className="movie-list">
        {movies.map(m => (
          <div key={m._id} className="movie-row">
            <img src={m.posterUrl} alt={m.title} width={80} />
            <div className="meta">
              <strong>{m.title}</strong>
              <div>{m.year}</div>
              <div>{(m.genres || []).join(", ")}</div>
            </div>
            <div className="actions">
              <Link to={`/admin/edit/${m._id}`}><button>Edit</button></Link>
              <button onClick={() => handleDelete(m._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

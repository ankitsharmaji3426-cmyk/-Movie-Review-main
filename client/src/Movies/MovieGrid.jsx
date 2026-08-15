import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import "../styles/movies.css";

export default function MovieGrid({ movies }) {
  const context = useOutletContext();
  const finalMovies = movies || context?.movies || [];

  return (
    <div className="grid">
      {finalMovies.map(m => (
        <Link key={m._id} to={`/movies/${m._id}`} className="movie-card">
          <img src={m.posterUrl} alt={m.title} />
          <div className="info">
            <h3>
              {m.title} <span className="year">({m.year})</span>
            </h3>
            <div className="badge">
              ★ {m.avgRating || 0} <span>({m.ratingCount || 0})</span>
            </div>
            <div className="genres">{(m.genres || []).join(" • ")}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

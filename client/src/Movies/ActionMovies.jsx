// ActionMovies.jsx
import React from "react";
import { useOutletContext } from "react-router-dom";
import MovieGrid from "./MovieGrid";

export default function ActionMovies() {
  // get movies fetched by Movies.jsx (with search/sort applied)
  const ctx = useOutletContext() || {};
  const movies = ctx.movies || [];

  // filter for Action in the array field "genres"
  const actionMovies = movies.filter(
    (m) => Array.isArray(m.genres) && m.genres.some(g => g.toLowerCase() === "action")
  );

  return <MovieGrid movies={actionMovies} />;
}
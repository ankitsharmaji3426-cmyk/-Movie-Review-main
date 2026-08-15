import React from "react";
import { useOutletContext } from "react-router-dom";
import MovieGrid from "./MovieGrid";

export default function Drama() {
  // get movies fetched by Movies.jsx (with search/sort applied)
  const ctx = useOutletContext() || {};
  const movies = ctx.movies || [];

  // filter for Action in the array field "genres"
  const drama = movies.filter(
    (m) => Array.isArray(m.genres) && m.genres.some(g => g.toLowerCase() === "drama")
  );

  return <MovieGrid movies={drama} />;
}
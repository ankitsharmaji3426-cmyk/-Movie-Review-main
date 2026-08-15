import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import "../styles/movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => { load(); }, [sort]);

  async function load() {
    const { data } = await api.get("/movies", { params: { sort } });
    setMovies(data);
  }

  async function search(query) {
    const { data } = await api.get("/movies", { params: { q: query, sort } });
    setMovies(data);
  }

  useEffect(() => {
    if (q.trim() === "") {
      load();
    } else {
      search(q);
    }
  }, [q, sort]);

  function handleSubmit(e) {
    e.preventDefault();
    search(q);
  }

  return (
    <div className="movies-page">
      <div className="side">
        <Sidebar />
      </div>

      <div className="main">
        <form className="search" onSubmit={handleSubmit}>
          <input
            placeholder="Search movies..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button className="btn" type="submit">Search</button>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </form>

        {/* All child routes render here */}
        <Outlet context={{ movies }} />
      </div>
    </div>
  );
}

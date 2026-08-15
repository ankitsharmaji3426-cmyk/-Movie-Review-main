import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Sections</h3>
      <ul>
        <li><Link to="/movies/action">Action</Link></li>
        <li><Link to="/movies/drama">Drama</Link></li>
        <li><Link to="/movies/romance">Romance</Link></li>
        <li><Link to="/movies/sci-fi">Sci-Fi</Link></li>
      </ul>
    </div>
  );
}

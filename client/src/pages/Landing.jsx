import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  const titleRef = useRef(null);

  const handleMouseMove = (e) => {
    const title = titleRef.current;
    if (!title) return;

    const rect = title.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt of 10deg
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;

    title.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const title = titleRef.current;
    if (title) {
      title.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <section className="landing">
      {/* Background image strips */}
      <div className="image-strips">
        {/* Strip 1 */}
        <div className="strip strip1">
          {Array(6).fill(
            <img
              src="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
              alt=""
            />
          )}
        </div>

        {/* Strip 2 */}
        <div className="strip strip2">
          {Array(6).fill(
            <img
              src="https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
              alt=""
            />
          )}
        </div>

        {/* Strip 3 */}
        <div className="strip strip3">
          {Array(6).fill(
            <img
              src="https://image.tmdb.org/t/p/w500/3IGbjc5ZC5yxim5W0sFING2kdcz.jpg"
              alt=""
            />
          )}
        </div>

        {/* Strip 4 */}
        <div className="strip strip4">
          {Array(6).fill(
            <img
              src="https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
              alt=""
            />
          )}
        </div>

        {/* Strip 5 */}
        <div className="strip strip1">
          {Array(6).fill(
            <img
              src="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
              alt=""
            />
          )}
        </div>

        {/* Overlay for blur/dim effect */}
        <div className="image-overlay"></div>
      </div>

      <div className="glow" />
      <h1
        className="title tilt-title"
        ref={titleRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        Movie<span>Reviewer</span>
      </h1>
      <p className="subtitle">Rate movies🏆  Drop hot takes🍿  Watch trailers📺</p>
      <div className="cta">
        <Link to="/movies" className="btn">
          Explore Movies
        </Link>
        <Link to="/register" className="btn btn-outline">
          Join Now
        </Link>
      </div>
      <div className="floating-cards">
        <div className="card">★ 4.8 • Inception</div>
        <div className="card">“Ledger GOAT performance”</div>
        <div className="card">Reply chains • Live</div>
      </div>
    </section>
  );
}

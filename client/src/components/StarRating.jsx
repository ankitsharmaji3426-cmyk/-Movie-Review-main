import React, { useState } from "react";

import '../styles/comments.css';

export default function StarRating({ value = 0, onRate }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="stars" onMouseLeave={() => setHover(0)}>
      {[1,2,3,4,5].map((n) => (
        <button
          key={n}
          className={(hover || value) >= n ? "star active" : "star"}
          onMouseEnter={() => setHover(n)}
          onClick={() => onRate?.(n)}
          aria-label={`${n} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

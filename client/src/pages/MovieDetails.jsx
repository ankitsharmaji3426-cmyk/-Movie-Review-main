import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api.js";
import StarRating from "../components/StarRating.jsx";
import Modal from "../components/Modal.jsx";
import CommentForm from "../components/CommentForm.jsx";
import CommentThread from "../components/CommentThread.jsx";

import '../styles/details.css';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0); // local user choice (optimistic)
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);

  async function load() {
    const { data } = await api.get(`/movies/${id}`);
    setMovie(data);
    const cs = await api.get(`/comments/movie/${id}`);
    setComments(cs.data);
  }
  useEffect(()=>{ load(); /* eslint-disable-next-line */ }, [id]);

  async function rate(stars) {
    setRating(stars);
    const { data } = await api.post(`/movies/${id}/rate`, { stars });
    setMovie(m => ({ ...m, avgRating: data.avgRating, ratingCount: data.ratingCount }));
  }

  async function addComment(parentId, text) {
    const { data } = await api.post("/comments", { movieId: id, text, parentId });
    // simple refresh (could also insert into tree locally)
    const cs = await api.get(`/comments/movie/${id}`);
    setComments(cs.data);
  }

  if (!movie) return <div className="container">Loading...</div>;

  return (
    <div className="container details">
      <div className="poster">
        <img src={movie.posterUrl} alt={movie.title} />
      </div>
      <div className="content">
        <h1>{movie.title} <span className="year">({movie.year})</span></h1>
        <p className="muted">{(movie.genres || []).join(" • ")}</p>

        <div className="rating-row">
          <div>
            <div className="badge big">★ {movie.avgRating || 0}</div>
            <small className="muted">{movie.ratingCount || 0} ratings</small>
          </div>
          <div className="rate-box">
            <p>Your rating:</p>
            <StarRating value={rating} onRate={rate}/>
          </div>
        </div>

        <button className="btn" onClick={()=>setOpen(true)}>▶ Watch Trailer</button>

        <Modal open={open} onClose={()=>setOpen(false)}>
          <div className="video-wrap">
            <iframe
              title="trailer"
              src={`https://www.youtube-nocookie.com/embed/${movie.trailerYouTubeId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Modal>

        <section className="comments-area">
          <h2>Reviews & Discussion</h2>
          <CommentForm onSubmit={(text)=>addComment(null, text)} />
          <CommentThread nodes={comments} onReply={(pid, text)=>addComment(pid, text)} />
        </section>
      </div>
    </div>
  );
}

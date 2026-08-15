import React, { useState } from "react";

import '../styles/comments.css'

export default function CommentForm({ onSubmit, autoFocus=false, placeholder="Write a comment..." }) {
  const [text, setText] = useState("");
  return (
    <form className="comment-form" onSubmit={(e)=>{e.preventDefault(); if(text.trim()){ onSubmit(text.trim()); setText(""); }}}>
      <textarea
        value={text}
        onChange={e=>setText(e.target.value)}
        placeholder={placeholder}
        rows={3}
        autoFocus={autoFocus}
      />
      <button className="btn" type="submit">Post</button>
    </form>
  );
}

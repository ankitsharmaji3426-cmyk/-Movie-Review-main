import React, { useState } from "react";
import CommentForm from "./CommentForm.jsx";

import '../styles/comments.css'

export default function CommentThread({ nodes=[], onReply }) {
  return (
    <div className="thread">
      {nodes.map(node => (
        <CommentNode key={node._id} node={node} onReply={onReply} />
      ))}
    </div>
  );
}

function CommentNode({ node, onReply }) {
  const [showReply, setShowReply] = useState(false);
  return (
    <div className="comment">
      <div className="meta">
        <strong>{node.user?.name || "User"}</strong>
        <span> • {new Date(node.createdAt).toLocaleString()}</span>
      </div>
      <p>{node.text}</p>
      <button className="link" onClick={()=>setShowReply(v=>!v)}>{showReply ? "Cancel" : "Reply"}</button>
      {showReply && (
        <CommentForm
          autoFocus
          placeholder="Reply..."
          onSubmit={(text)=>{ onReply(node._id, text); setShowReply(false); }}
        />
      )}
      {node.replies?.length > 0 && (
        <div className="replies">
          <CommentThread nodes={node.replies} onReply={onReply} />
        </div>
      )}
    </div>
  );
}

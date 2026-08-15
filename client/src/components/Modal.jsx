import React, { useEffect } from "react";

import '../styles/modal.css'

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    function onEsc(e){ if(e.key === "Escape") onClose?.(); }
    if(open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-body" onClick={(e)=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

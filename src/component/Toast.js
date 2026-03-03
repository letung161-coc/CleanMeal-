import React from "react";
import "./Toast.css";

/**
 * Renders a stack of toast notifications.
 * @param {{ toasts: Array<{id,message,type}> }} props
 */
export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="cm-toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`cm-toast cm-toast--${t.type || "success"}`}>
          <span className="cm-toast-icon">
            {t.type === "error" ? "✕" : t.type === "info" ? "ℹ" : "✓"}
          </span>
          <span className="cm-toast-msg">{t.message}</span>
        </div>
      ))}
    </div>
  );
}

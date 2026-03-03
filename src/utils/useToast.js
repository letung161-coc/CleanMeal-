import { useState, useCallback, useRef } from "react";

let toastIdCounter = 0;

/**
 * Lightweight toast manager.
 * Returns { toasts, showToast(message, type) }
 *   type = "success" | "error" | "info"
 */
export default function useToast(duration = 3000) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const removeToast = useCallback((id) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = ++toastIdCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = setTimeout(() => removeToast(id), duration);
    },
    [duration, removeToast]
  );

  return { toasts, showToast };
}

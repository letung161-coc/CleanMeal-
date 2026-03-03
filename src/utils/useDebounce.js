import { useState, useEffect } from "react";

/**
 * Debounce a value – the returned value only updates
 * after the caller stops changing it for `delay` ms.
 */
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

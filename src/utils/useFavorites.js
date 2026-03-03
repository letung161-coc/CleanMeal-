import { useState, useCallback } from "react";

const STORAGE_KEY = "cleanmeal_favorites";

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/**
 * Hook for managing favourite meals in localStorage.
 *
 * Returns { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }
 */
export default function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);

  const addFavorite = useCallback((meal) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === meal.id)) return prev;
      const next = [meal, ...prev];
      saveFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.filter((m) => m.id !== id);
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((m) => m.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (meal) => {
      if (isFavorite(meal.id)) {
        removeFavorite(meal.id);
        return false; // was removed
      }
      addFavorite(meal);
      return true; // was added
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite };
}

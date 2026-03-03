// ============================================================
//  api.js – API client trung tâm cho CleanMeal Frontend
//  Base URL trỏ về Backend tại http://localhost:4000
// ============================================================

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function apiFetch(endpoint, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: "omit",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMessage =
      errorBody.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return null;
}

// ============================================================
//  USER API
// ============================================================
export const userAPI = {
  getProfile: () => apiFetch("/users/profile"),
  updateProfile: (data) =>
    apiFetch("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// ============================================================
//  CATEGORY API
// ============================================================
export const categoryAPI = {
  getAll: () => apiFetch("/categories"),
  getByType: (type) => apiFetch(`/categories/type/${type}`), // 'Diet', 'Cuisine', 'Meal'
};

// ============================================================
//  RECIPE API
// ============================================================
export const recipeAPI = {
  getAll: (page = 1, limit = 12) =>
    apiFetch(`/recipes?page=${page}&limit=${limit}`),

  getById: (id) => apiFetch(`/recipes/${id}`),

  search: (keyword, categorySlug, minCalories, maxCalories, page = 1) => {
    let query = `/recipes/search?page=${page}&limit=12`;
    if (keyword) query += `&q=${encodeURIComponent(keyword)}`;
    if (categorySlug) query += `&category=${encodeURIComponent(categorySlug)}`;
    if (minCalories) query += `&minCalories=${minCalories}`;
    if (maxCalories) query += `&maxCalories=${maxCalories}`;
    return apiFetch(query);
  },
};

// ============================================================
//  VIDEO API
// ============================================================
export const videoAPI = {
  getAll: () => apiFetch(`/videos`),
  getById: (id) => apiFetch(`/videos/${id}`),
  getByCategory: (categoryId) => apiFetch(`/videos/category/${categoryId}`),
};

// ============================================================
//  INGREDIENT API
// ============================================================
export const ingredientAPI = {
  getAll: () => apiFetch("/ingredients"),
  getById: (id) => apiFetch(`/ingredients/${id}`),
};
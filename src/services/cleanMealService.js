// ============================================================
//  cleanMealService.js – Clean Meal Frontend API client
//  All calls go through the backend proxy at /api/*
//  The backend handles Spoonacular API key, caching, and
//  data normalization.
// ============================================================

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

// ── helpers ──────────────────────────────────────────────────

async function apiFetch(endpoint, params = {}) {
  const url = new URL(`${API_BASE}${endpoint}`);

  // Append query params (skip empty values)
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      url.searchParams.set(key, String(val));
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      body.message || `API error ${response.status}: ${response.statusText}`
    );
  }

  const json = await response.json();

  // Backend wraps all responses in { success, data }
  if (json.success === false) {
    throw new Error(json.message || "Unknown API error");
  }

  return json.data;
}

// ── MEALS (Menu Items) ───────────────────────────────────────

/**
 * Search meals with optional nutrition filters.
 */
export async function searchMeals({
  query = "",
  offset = 0,
  number = 10,
  minCalories,
  maxCalories,
  minProtein,
  maxProtein,
  minCarbs,
  maxCarbs,
  minFat,
  maxFat,
} = {}) {
  return apiFetch("/meals/search", {
    query,
    offset,
    number,
    minCalories,
    maxCalories,
    minProtein,
    maxProtein,
    minCarbs,
    maxCarbs,
    minFat,
    maxFat,
  });
}

/**
 * Get a single meal by ID.
 */
export async function getMealById(id) {
  return apiFetch(`/meals/${id}`);
}

/**
 * Autocomplete suggestions for meals.
 */
export async function autocompleteMeals(query, number = 5) {
  return apiFetch("/meals/autocomplete", { query, number });
}

// ── RECIPES ──────────────────────────────────────────────────

/**
 * Search recipes with filters.
 */
export async function searchRecipes({
  query = "",
  offset = 0,
  number = 10,
  cuisine,
  diet,
  type,
  maxReadyTime,
  minCalories,
  maxCalories,
  minProtein,
  maxProtein,
  minCarbs,
  maxCarbs,
  minFat,
  maxFat,
} = {}) {
  return apiFetch("/recipes/search", {
    query,
    offset,
    number,
    cuisine,
    diet,
    type,
    maxReadyTime,
    minCalories,
    maxCalories,
    minProtein,
    maxProtein,
    minCarbs,
    maxCarbs,
    minFat,
    maxFat,
  });
}

/**
 * Get full recipe details by ID.
 */
export async function getRecipeById(id) {
  return apiFetch(`/recipes/${id}`);
}

// ── GROCERY PRODUCTS ─────────────────────────────────────────

/**
 * Search grocery products.
 */
export async function searchGroceryProducts({
  query = "",
  offset = 0,
  number = 10,
} = {}) {
  return apiFetch("/grocery/search", { query, offset, number });
}

/**
 * Get a single grocery product by ID.
 */
export async function getGroceryProductById(id) {
  return apiFetch(`/grocery/${id}`);
}

/**
 * Get ingredient information by ID.
 */
export async function getIngredientInfo(id, amount = 100, unit = "grams") {
  return apiFetch(`/grocery/ingredient/${id}`, { amount, unit });
}

// ── MEAL PLAN ────────────────────────────────────────────────

/**
 * Generate a meal plan.
 * @param {"day"|"week"} timeFrame
 * @param {number} targetCalories
 * @param {string} [diet]
 * @param {string} [exclude]
 */
export async function generateMealPlan({
  timeFrame = "day",
  targetCalories = 2000,
  diet,
  exclude,
} = {}) {
  return apiFetch("/mealplan", {
    timeFrame,
    targetCalories,
    diet,
    exclude,
  });
}

// ── NUTRITION ────────────────────────────────────────────────

/**
 * Estimate nutrition from a dish title.
 */
export async function estimateNutrition(title) {
  return apiFetch("/nutrition/estimate", { title });
}

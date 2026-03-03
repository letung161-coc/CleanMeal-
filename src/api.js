// ============================================================
//  api.js – API client trung tâm cho CleanMeal Frontend
//  Base URL trỏ về Backend tại http://localhost:4000
// ============================================================

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

/**
 * Hàm fetch có sẵn xử lý lỗi, tự động thêm headers chung.
 * @param {string} endpoint  - Đường dẫn API, ví dụ: "/api/auth/login"
 * @param {RequestInit} options - Các tùy chọn fetch (method, body, ...)
 * @returns {Promise<any>}   - Dữ liệu JSON trả về hoặc ném Error
 */
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token"); // JWT nếu đã đăng nhập

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Không dùng credentials: "include" vì auth dùng JWT trong header
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMessage =
      errorBody.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  // Trả về null nếu response không có body (204 No Content)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return null;
}

// ============================================================
//  Hàm TEST KẾT NỐI – gọi endpoint /api/health của Backend
//  Endpoint này kiểm tra cả server lẫn database đang hoạt động
// ============================================================

/**
 * Kiểm tra kết nối từ React sang Backend.
 * @returns {Promise<{ status: string, db: string }>}
 */
export async function testConnection() {
  try {
    const data = await apiFetch("/api/health");
    console.log("✅ Kết nối Backend thành công:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Kết nối Backend thất bại:", error.message);
    return { success: false, error: error.message };
  }
}

// ============================================================
//  Các nhóm API theo module (mở rộng khi cần)
// ============================================================

export const authAPI = {
  login: (credentials) =>
    apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) }),

  register: (userData) =>
    apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(userData) }),

  logout: () =>
    apiFetch("/api/auth/logout", { method: "POST" }),
};

export const monanAPI = {
  // Lấy tất cả món (hỗ trợ filter, search, limit)
  // vd: getAll({ category: "salad", search: "chicken", limit: 10 })
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/api/monan${qs ? "?" + qs : ""}`);
  },

  // Lấy chi tiết 1 món theo id
  getById: (id) => apiFetch(`/api/monan/${id}`),

  // Lấy thông tin dinh dưỡng của món (macros + nutrition)
  getNutrition: (id) => apiFetch(`/api/monan/${id}/nutrition`),

  // Lấy công thức & cách làm của món
  getRecipe: (id) => apiFetch(`/api/monan/${id}/recipe`),
};

export const categoriesAPI = {
  // Lấy tất cả categories (kèm số lượng món ăn)
  getAll: () => apiFetch("/api/categories"),

  // Lấy các món ăn thuộc category slug
  getBySlug: (slug) => apiFetch(`/api/categories/${slug}`),
};

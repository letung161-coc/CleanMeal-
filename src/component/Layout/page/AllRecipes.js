import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import RecipeCard from "../../RecipeCard";
import { monanAPI, phanloaiAPI } from "../../../api";
import useFavorites from "../../../utils/useFavorites";
import useToast from "../../../utils/useToast";
import Toast from "../../Toast";
import "./AllRecipes.css";

function AllRecipes() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState("newest");

  const [meals, setMeals] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();
  const { toasts, showToast } = useToast();

  // Load categories
  useEffect(() => {
    Promise.all([phanloaiAPI.getAmThuc(), phanloaiAPI.getCheDo()]).then(
      ([c, d]) => {
        setCuisines(c || []);
        setDiets(d || []);
      }
    ).catch(() => {});
  }, []);

  // Sync URL
  useEffect(() => {
    const p = {};
    if (query) p.q = query;
    if (page > 1) p.page = String(page);
    setSearchParams(p, { replace: true });
  }, [query, page, setSearchParams]);

  // Fetch
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await monanAPI.getAll(page, 12);
      let items = result.data || [];

      if (query.trim()) {
        const q = query.toLowerCase();
        items = items.filter(
          (m) =>
            (m.TenMon && m.TenMon.toLowerCase().includes(q)) ||
            (m.MoTaNgan && m.MoTaNgan.toLowerCase().includes(q))
        );
      }

      // Sort
      if (sortBy === "rating") items.sort((a, b) => (b.Rating || 0) - (a.Rating || 0));
      else if (sortBy === "time") items.sort((a, b) => (a.ThoiGianNau || 99) - (b.ThoiGianNau || 99));
      else if (sortBy === "calories") items.sort((a, b) => (a.TongCalo || 999) - (b.TongCalo || 999));

      setMeals(items);
      setTotalResults(items.length);
    } catch (err) {
      setError(err.message);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, [page, query, sortBy]);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { setPage(1); }, [query]);

  const handleToggleFavorite = (meal) => {
    const favMeal = {
      id: meal.MaMon,
      title: meal.TenMon,
      image: meal.AnhDaiDien,
      calories: meal.TongCalo || 0,
    };
    const added = toggleFavorite(favMeal);
    showToast(
      added ? `"${meal.TenMon}" đã lưu` : `"${meal.TenMon}" đã bỏ lưu`,
      added ? "success" : "info"
    );
  };

  return (
    <div className="recipes-page-v2">
      {/* Hero */}
      <div className="rcp-hero-v2">
        <div className="container">
          <h1 className="heading-serif">Tất cả công thức</h1>
          <p>Khám phá {totalResults} công thức nấu ăn lành mạnh từ cộng đồng CleanMeal</p>
          <form className="rcp-search-form" onSubmit={(e) => e.preventDefault()}>
            <span className="rcp-search-icon-v2">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm công thức, nguyên liệu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rcp-search-input-v2"
            />
          </form>
        </div>
      </div>

      <div className="container">
        <div className="rcp-content-layout">
          {/* Sidebar Filters */}
          <aside className="rcp-sidebar">
            <div className="rcp-filter-group">
              <h3>Ẩm thực</h3>
              {cuisines.map((c) => (
                <label key={c.AmThucID} className="rcp-filter-item">
                  <span>{c.Icon} {c.TenAmThuc}</span>
                </label>
              ))}
            </div>
            <div className="rcp-filter-group">
              <h3>Chế độ ăn</h3>
              {diets.map((d) => (
                <label key={d.CheDoID} className="rcp-filter-item">
                  <span>{d.Icon} {d.CheDoAn}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Main */}
          <main className="rcp-main">
            {/* Sort bar */}
            <div className="rcp-sort-bar">
              <span className="rcp-result-text">{totalResults} kết quả</span>
              <div className="rcp-sort-options">
                <span>Sắp xếp:</span>
                {[
                  { val: "newest", label: "Mới nhất" },
                  { val: "rating", label: "Đánh giá" },
                  { val: "time", label: "Thời gian" },
                  { val: "calories", label: "Calo" },
                ].map((s) => (
                  <button
                    key={s.val}
                    className={`rcp-sort-btn${sortBy === s.val ? " active" : ""}`}
                    onClick={() => setSortBy(s.val)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rcp-error-v2">
                <p>⚠️ {error}</p>
                <button className="btn btn-primary" onClick={fetchData}>Thử lại</button>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="recipe-grid-v2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: 300, borderRadius: 16 }} />
                ))}
              </div>
            )}

            {/* Empty */}
            {!loading && !error && meals.length === 0 && (
              <div className="rcp-empty-v2">
                <span style={{ fontSize: 48 }}>🍽️</span>
                <h3>Không tìm thấy công thức</h3>
                <p>Thử thay đổi từ khóa hoặc bộ lọc</p>
              </div>
            )}

            {/* Grid */}
            {!loading && !error && meals.length > 0 && (
              <div className="recipe-grid-v2">
                {meals.map((m) => (
                  <RecipeCard
                    key={m.MaMon}
                    recipe={m}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={isFavorite(m.MaMon)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}

export default AllRecipes;

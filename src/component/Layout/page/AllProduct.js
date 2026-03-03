import { useEffect, useState } from "react";
import "./AllProduct.css";
import { NavLink } from "react-router-dom";
import { monanAPI, categoriesAPI } from "../../../api";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tải categories
  useEffect(() => {
    categoriesAPI.getAll()
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, []);

  // Tải món ăn khi tab hoặc search thay đổi (debounce 300ms)
  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = {};
    if (activeTab !== "all") params.category = activeTab;
    if (search.trim()) params.search = search.trim();

    const timer = setTimeout(() => {
      monanAPI.getAll(params)
        .then((res) => {
          setProducts(res.data || []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [activeTab, search]);

  return (
    <div className="allproduct-container">
      <h1 className="title">All Clean Dishes</h1>

      {/* ── Search ── */}
      <div className="ap-search-row">
        <input
          className="ap-search-input"
          placeholder="🔍 Tìm kiếm món ăn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ── Category Tabs ── */}
      <div className="findProduct">
        <ul>
          <li
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            Tất cả
          </li>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={activeTab === cat.slug ? "active" : ""}
              onClick={() => setActiveTab(cat.slug)}
            >
              {cat.name}
              {cat.count > 0 && (
                <span className="cat-count"> ({cat.count})</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="ap-loading">
          <div className="ap-spinner" />
          <p>Đang tải...</p>
        </div>
      ) : error ? (
        <div className="ap-error">
          <p>⚠️ Không thể kết nối Backend.</p>
          <p className="ap-error-sub">Hãy chắc chắn Backend đang chạy tại <code>http://localhost:4000</code></p>
        </div>
      ) : (
        <>
          <p className="ap-result-count">{products.length} món ăn</p>
          <div className="product-flex">
            {products.length === 0 ? (
              <p className="ap-empty">Không có món ăn phù hợp 🍃</p>
            ) : (
              products.map((item) => (
                <div className="product-card" key={item.id}>
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                    <div className="product-overlay">
                      <NavLink to={`/product/${item.id}`}>
                        <button className="btn-cart">XEM CHI TIẾT</button>
                      </NavLink>
                      <div className="overlay-icons">
                        <NavLink to={`/product/${item.id}`}>
                          <span title="Chi tiết">👁</span>
                        </NavLink>
                        <span title="Yêu thích">❤</span>
                        <span title="So sánh">⚖</span>
                      </div>
                    </div>
                    {item.badge && (
                      <span className="product-badge-tag">{item.badge}</span>
                    )}
                  </div>
                  <h3>{item.name}</h3>
                  {item.macros && (
                    <div className="card-macros">
                      <span>{item.macros.cal} kcal</span>
                      <span>P: {item.macros.protein}</span>
                      <span>C: {item.macros.carbs}</span>
                      <span>F: {item.macros.fats}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AllProduct;

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { StarRating } from "../../RecipeCard";
import { monanAPI } from "../../../api";
import useFavorites from "../../../utils/useFavorites";
import useToast from "../../../utils/useToast";
import Toast from "../../Toast";
import "./MealDetail.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [multiplier, setMultiplier] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});

  const { toggleFavorite, isFavorite } = useFavorites();
  const { toasts, showToast } = useToast();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    monanAPI.getById(id)
      .then(async (data) => {
        if (cancelled) return;
        setMeal(data);
        document.title = `${data.TenMon} – CleanMeal`;

        // Fetch reviews
        try {
          const res = await fetch(`${API_BASE}/danhgia/monan/${data.MaMon}`);
          if (res.ok) {
            const rv = await res.json();
            setReviews(rv);
          }
        } catch {}
      })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; document.title = "CleanMeal"; };
  }, [id]);

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSave = () => {
    if (!meal) return;
    const favItem = {
      id: meal.MaMon,
      title: meal.TenMon,
      image: meal.AnhDaiDien,
      calories: meal.TongCalo || 0,
    };
    const added = toggleFavorite(favItem);
    showToast(added ? "Đã lưu công thức" : "Đã bỏ lưu", added ? "success" : "info");
  };

  const totalTime = useMemo(() => {
    if (!meal) return 0;
    return meal.ThoiGianNau || ((meal.PrepTime || 0) + (meal.CookTime || 0));
  }, [meal]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="meal-detail-v2">
        <div className="container">
          <div className="mdl-loading-v2">
            <div className="spinner" />
            <p>Đang tải công thức...</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !meal) {
    return (
      <div className="meal-detail-v2">
        <div className="container">
          <div className="mdl-error-v2">
            <span style={{ fontSize: 48 }}>😔</span>
            <h2>Không tìm thấy công thức</h2>
            <p>{error || "Công thức không tồn tại"}</p>
            <button className="btn btn-primary" onClick={() => navigate("/recipes")}>
              ← Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const saved = isFavorite(meal.MaMon);

  return (
    <div className="meal-detail-v2 fade-in">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="mdl-breadcrumbs" data-aos="fade-down">
          <NavLink to="/">Trang chủ</NavLink>
          <span>/</span>
          <NavLink to="/recipes">Công thức</NavLink>
          <span>/</span>
          <span className="current">{meal.TenMon}</span>
        </nav>

        {/* Title section */}
        <header className="mdl-header-v2" data-aos="fade-up">
          <h1 className="heading-serif">{meal.TenMon}</h1>
          {meal.MoTaNgan && <p className="mdl-subtitle">{meal.MoTaNgan}</p>}
          <div className="mdl-meta">
            <StarRating rating={meal.Rating} count={meal.ReviewCount} />
            {meal.DoKho && <span className={`badge badge-${meal.DoKho === 'Dễ' ? 'green' : meal.DoKho === 'Khó' ? 'orange' : 'blue'}`}>{meal.DoKho}</span>}
            <button className={`mdl-save-btn${saved ? " saved" : ""}`} onClick={handleSave}>
              {saved ? "❤️ Đã lưu" : "🤍 Lưu công thức"}
            </button>
          </div>
        </header>

        {/* Hero Image */}
        <div className="mdl-hero-img" data-aos="zoom-in">
          <img
            src={meal.AnhDaiDien || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900"}
            alt={meal.TenMon}
          />
        </div>

        {/* Stats Bar */}
        <div className="mdl-stats" data-aos="fade-up" data-aos-delay="100">
          <div className="mdl-stat">
            <span className="mdl-stat-val">{meal.PrepTime || "-"}</span>
            <span className="mdl-stat-label">phút chuẩn bị</span>
          </div>
          <div className="mdl-stat">
            <span className="mdl-stat-val">{meal.CookTime || "-"}</span>
            <span className="mdl-stat-label">phút nấu</span>
          </div>
          <div className="mdl-stat">
            <span className="mdl-stat-val">{totalTime || "-"}</span>
            <span className="mdl-stat-label">tổng thời gian</span>
          </div>
          <div className="mdl-stat">
            <span className="mdl-stat-val">{meal.Servings || meal.SoNguoiAn || 2}</span>
            <span className="mdl-stat-label">khẩu phần</span>
          </div>
        </div>

        {/* Nutrition */}
        {(meal.TongCalo || meal.Protein || meal.Fat || meal.Carbs) && (
          <div className="mdl-nutrition-v2">
            <h3>Thông tin dinh dưỡng</h3>
            <div className="mdl-nut-grid">
              <div className="mdl-nut-item"><span className="val">{meal.TongCalo || 0}</span><span className="lbl">Calories</span></div>
              <div className="mdl-nut-item"><span className="val">{meal.Protein || 0}g</span><span className="lbl">Protein</span></div>
              <div className="mdl-nut-item"><span className="val">{meal.Fat || 0}g</span><span className="lbl">Chất béo</span></div>
              <div className="mdl-nut-item"><span className="val">{meal.Carbs || 0}g</span><span className="lbl">Carbs</span></div>
              {meal.Fiber > 0 && <div className="mdl-nut-item"><span className="val">{meal.Fiber}g</span><span className="lbl">Chất xơ</span></div>}
            </div>
          </div>
        )}

        {/* Two-column: Ingredients + Directions */}
        <div className="mdl-content-grid">
          {/* Ingredients */}
          <section className="mdl-ingredients" data-aos="fade-right">
            <div className="mdl-ingredients-header">
              <h2>Nguyên liệu</h2>
              <div className="mdl-multiplier">
                {[0.5, 1, 2, 3].map((m) => (
                  <button
                    key={m}
                    className={`mdl-mult-btn${multiplier === m ? " active" : ""}`}
                    onClick={() => setMultiplier(m)}
                  >
                    {m === 0.5 ? "½" : m}x
                  </button>
                ))}
              </div>
            </div>
            <ul className="mdl-ingredients-list">
              {(meal.NguyenLieu || []).map((nl, i) => (
                <li
                  key={i}
                  className={`mdl-ingredient-item${checkedItems[i] ? " checked" : ""}`}
                  onClick={() => toggleCheck(i)}
                >
                  <span className="mdl-check">{checkedItems[i] ? "☑" : "☐"}</span>
                  <span className="mdl-ing-amount">
                    {nl.SoLuong ? Math.round(nl.SoLuong * multiplier * 10) / 10 : ""} {nl.DonViTinh || ""}
                  </span>
                  <span className="mdl-ing-name">{nl.TenNguyenLieu}</span>
                </li>
              ))}
              {(!meal.NguyenLieu || meal.NguyenLieu.length === 0) && (
                <li className="mdl-ingredient-item" style={{ color: 'var(--color-text-muted)' }}>
                  Chưa có thông tin nguyên liệu
                </li>
              )}
            </ul>
          </section>

          {/* Directions */}
          <section className="mdl-directions" data-aos="fade-left">
            <h2>Cách làm</h2>
            <ol className="mdl-steps-list">
              {(meal.BuocNau || []).map((b, i) => (
                <li key={i} className="mdl-step">
                  <span className="mdl-step-num">{i + 1}</span>
                  <div className="mdl-step-content">
                    <p>{b.NoiDungBuoc}</p>
                  </div>
                </li>
              ))}
              {(!meal.BuocNau || meal.BuocNau.length === 0) && (
                <li className="mdl-step" style={{ color: 'var(--color-text-muted)' }}>
                  Chưa có hướng dẫn
                </li>
              )}
            </ol>
          </section>
        </div>

        {/* Reviews */}
        <section className="mdl-reviews" data-aos="fade-up">
          <h2>Đánh giá ({reviews.length})</h2>
          {reviews.length === 0 ? (
            <p className="mdl-review-empty">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
          ) : (
            <div className="mdl-review-list">
              {reviews.map((r) => (
                <div key={r.DanhGiaID} className="mdl-review-item">
                  <div className="mdl-review-top">
                    <strong>{r.HoTen}</strong>
                    <StarRating rating={r.DiemSao} />
                    <span className="mdl-review-date">
                      {new Date(r.NgayDanhGia).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  {r.NoiDung && <p className="mdl-review-text">{r.NoiDung}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}

export default MealDetail;

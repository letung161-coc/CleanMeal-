import React from 'react';
import { NavLink } from 'react-router-dom';
import './RecipeCard.css';

function StarRating({ rating = 0, count = 0 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= Math.round(rating) ? 'star filled' : 'star empty'}>
        ★
      </span>
    );
  }
  return (
    <span className="star-rating">
      {stars}
      {count > 0 && <span className="star-count">({count})</span>}
    </span>
  );
}

function RecipeCard({ recipe, onToggleFavorite, isFavorite }) {
  const {
    MaMon,
    TenMon,
    MoTaNgan,
    AnhDaiDien,
    PrepTime,
    CookTime,
    ThoiGianNau,
    TongCalo,
    Rating,
    ReviewCount,
    DoKho,
    SoNguoiAn,
  } = recipe;

  const totalTime = ThoiGianNau || ((PrepTime || 0) + (CookTime || 0));

  return (
    <div className="recipe-card fade-in" data-aos="fade-up">
      <NavLink to={`/meal/${MaMon}`} className="recipe-card-img-link">
        <img
          src={AnhDaiDien || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
          alt={TenMon}
          className="recipe-card-img"
          loading="lazy"
        />
        <div className="recipe-card-overlay">
          <span className="recipe-card-view">Xem công thức →</span>
        </div>
        {DoKho && (
          <span className={`recipe-card-difficulty ${DoKho === 'Dễ' ? 'easy' : DoKho === 'Khó' ? 'hard' : 'medium'}`}>
            {DoKho}
          </span>
        )}
      </NavLink>

      {onToggleFavorite && (
        <button
          className={`recipe-card-heart${isFavorite ? ' liked' : ''}`}
          onClick={(e) => { e.preventDefault(); onToggleFavorite(recipe); }}
          title={isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}

      <div className="recipe-card-body">
        <div className="recipe-card-meta">
          {totalTime > 0 && (
            <span className="recipe-card-time">⏱ {totalTime} phút</span>
          )}
          {TongCalo > 0 && (
            <span className="recipe-card-cal">🔥 {TongCalo} cal</span>
          )}
        </div>

        <NavLink to={`/meal/${MaMon}`} className="recipe-card-title">
          <h3>{TenMon}</h3>
        </NavLink>

        {MoTaNgan && (
          <p className="recipe-card-desc">{MoTaNgan}</p>
        )}

        <div className="recipe-card-footer">
          <StarRating rating={Rating} count={ReviewCount} />
          {SoNguoiAn > 0 && (
            <span className="recipe-card-servings">👤 {SoNguoiAn}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export { StarRating };
export default RecipeCard;

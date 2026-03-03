import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './PhanDau.css';

const NAV_ITEMS = [
  { to: '/recipes', label: 'Tất cả món' },
  { to: '/weeklyplan', label: 'Thực đơn' },
  { to: '/favorites', label: 'Yêu thích' },
  { to: '/videos', label: 'Videos' },
  { to: '/blog', label: 'Blog' },
  { to: '/cookbook', label: 'CookBook' },
  { to: '/about', label: 'Giới thiệu' },
];

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="site-header">
      {/* ── Top row ── */}
      <div className="header-main">
        <button className="mobile-menu-btn">☰</button>

        <NavLink to="/" className="header-logo">
          <span className="logo-icon">🥗</span>
          CleanMeal
        </NavLink>

        <form className="header-search" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm công thức hoặc nguyên liệu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="header-actions">
          <NavLink to="/favorites" className="header-action-btn" title="Yêu thích">
            ❤️
          </NavLink>
          <NavLink to="/weeklyplan" className="header-action-btn" title="Thực đơn">
            📅
          </NavLink>
        </div>
      </div>

      {/* ── Nav bar ── */}
      <nav className="header-nav">
        <div className="nav-list">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;

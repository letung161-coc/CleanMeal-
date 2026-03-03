import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-icon">🥗</span>
                <span className="footer-logo-text">CleanMeal</span>
              </div>
              <p className="footer-tagline">
                Nền tảng công thức nấu ăn lành mạnh #1 Việt Nam. Khám phá hàng trăm công thức eat clean, dinh dưỡng cân bằng.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Facebook">📘</a>
                <a href="#" className="social-link" aria-label="Instagram">📸</a>
                <a href="#" className="social-link" aria-label="YouTube">📺</a>
                <a href="#" className="social-link" aria-label="TikTok">🎵</a>
              </div>
            </div>

            {/* Links */}
            <div className="footer-links-group">
              <h4>Khám phá</h4>
              <NavLink to="/recipes">Tất cả món ăn</NavLink>
              <NavLink to="/weeklyplan">Thực đơn tuần</NavLink>
              <NavLink to="/favorites">Món yêu thích</NavLink>
              <NavLink to="/cookbook">CookBook</NavLink>
            </div>

            <div className="footer-links-group">
              <h4>Chế độ ăn</h4>
              <a href="#">Eat Clean</a>
              <a href="#">Low Carb</a>
              <a href="#">Keto</a>
              <a href="#">Chay</a>
            </div>

            <div className="footer-links-group">
              <h4>CleanMeal</h4>
              <NavLink to="/about">Về chúng tôi</NavLink>
              <NavLink to="/contact">Liên hệ</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/services">Dịch vụ</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 CleanMeal. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Điều khoản</a>
            <a href="#">Chính sách</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
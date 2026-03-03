import "./PhanDau.css";
import logo from "../../img/logo.avif";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaSearch,
  FaRegBookmark,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
function PhanDau() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="header">
        <div className="header_container">
          <div className="header-left">
            <span className="menu-icon" onClick={() => setOpen(true)}>
              ☰
            </span>
            <img src={logo} alt="Heathy Food" />
          </div>
          <div className="header-middle">
            <nav className="navigation">
              <ul className="nav-list">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/services">Services</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <div className="search-box">
              <input type="text" placeholder="What are you looking for?" />
              <FaSearch className="search-icon" />
            </div>
            <div className="header-icons">
              <FaRegBookmark />
              <FaShoppingCart />
              <NavLink to="/login">
                <FaUserCircle />
              </NavLink>
            </div>
          </div>
        </div>
      </header>
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
      <aside className={`sidebar ${open ? "active" : ""}`}>
        <span className="close-btn" onClick={() => setOpen(false)}>
          ×
        </span>
        <ul className="sidebar-menu">
          <li><NavLink to="/recipes"   onClick={() => setOpen(false)}>🍽️ Tất cả món ăn</NavLink></li>
          <li><NavLink to="/weeklyplan" onClick={() => setOpen(false)}>📅 Thực Đơn của tôi</NavLink></li>
          <li><NavLink to="/favorites" onClick={() => setOpen(false)}>❤️ Món ăn yêu thích</NavLink></li>
          <li><NavLink to="/videos"    onClick={() => setOpen(false)}>▶️ Videos</NavLink></li>
          <li><NavLink to="/blog"      onClick={() => setOpen(false)}>📰 Blog</NavLink></li>
          <li><NavLink to="/cookbook"  onClick={() => setOpen(false)}>📚 Cook Book</NavLink></li>
        </ul>
      </aside>
    </>
  );
}
export default PhanDau;

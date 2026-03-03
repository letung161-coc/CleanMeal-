import React from "react";
import { NavLink } from "react-router-dom";
import "./DashboardLayout.css";

const navItems = [
  { to: "/recipes", icon: "🍽️", label: "Tất cả món ăn" },
  { to: "/weeklyplan", icon: "📅", label: "Thực Đơn của tôi" },
  { to: "/favorites", icon: "❤️", label: "Món ăn yêu thích" },
  { to: "/videos", icon: "▶️", label: "Videos" },
  { to: "/blog", icon: "📰", label: "Blog" },
  { to: "/cookbook", icon: "📚", label: "Cook Book" },
];

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `dash-nav-item${isActive ? " active" : ""}`
              }
            >
              <span className="dash-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Premium card */}
        <div className="dash-premium">
          <div className="dash-premium-star">⭐</div>
          <h4>Go Premium</h4>
          <p>Get unlimited access to all features</p>
          <button className="dash-upgrade-btn">Upgrade</button>
        </div>
      </aside>

      {/* PAGE CONTENT */}
      <div className="dash-content">{children}</div>
    </div>
  );
}

export default DashboardLayout;

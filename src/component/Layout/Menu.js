import React, { useEffect, useState } from 'react';
import { FaEye, FaHeart, FaPen } from 'react-icons/fa';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import FoodCategorySection from './FoodCategorySection';
import { monanAPI, phanloaiAPI } from '../../api';

const MenuSection = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Gọi song song 2 API từ Backend → SQL Server
        const [monanRes, amThucRes] = await Promise.all([
          monanAPI.getAll(1, 50),        // Lấy tất cả món ăn
          phanloaiAPI.getAmThuc(),       // Lấy danh mục ẩm thực
        ]);

        setDishes(monanRes.data || []);
        setCategories(amThucRes || []);
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="menu-section">
        <div className="menu-container">
          <h2 className="menu-title">Đang tải dữ liệu...</h2>
          <p className="menu-subtitle">Kết nối đến cơ sở dữ liệu SQL Server...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu-section">
        <div className="menu-container">
          <h2 className="menu-title">Không thể tải dữ liệu</h2>
          <p className="menu-subtitle" style={{ color: '#e53e3e' }}>{error}</p>
          <p className="menu-subtitle">Hãy kiểm tra Backend đang chạy tại http://localhost:4000</p>
        </div>
      </section>
    );
  }

  // Chia dishes thành các nhóm 4 để hiển thị trong FoodCategorySection
  const mainDishes = dishes.slice(0, 4);
  const soupDishes = dishes.slice(4, 8).map(d => ({
    id: d.MaMon,
    name: d.TenMon,
    image: d.AnhDaiDien || 'https://via.placeholder.com/300x200?text=No+Image',
    tags: [],
    macros: { cal: d.TongCalo || 0, carbs: '-', fats: '-', protein: '-' }
  }));

  return (
    <>
      <section className="menu-section">
        <div className="menu-container">
          <h2 className="menu-title">View all our dishes</h2>
          <p className="menu-subtitle">
            Món ăn được tải trực tiếp từ cơ sở dữ liệu SQL Server qua Backend API.
          </p>
          <div className="menu-grid">
            {mainDishes.map((dish) => (
              <div key={dish.MaMon} className="menu-card">
                <NavLink to={`/product/${dish.MaMon}`}>
                  <img
                    src={dish.AnhDaiDien || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={dish.TenMon}
                    className="dish-image"
                  />
                </NavLink>
                <h3 className="dish-name">{dish.TenMon}</h3>
                <div className="card-actions">
                  <FaEye className="action-icon" title="Xem chi tiết" />
                  <FaHeart className="action-icon" title="Yêu thích" />
                  <FaPen className="action-icon" title="Ghi chú/Sửa" />
                </div>
              </div>
            ))}
          </div>
          <div className="btn-more-container">
            <NavLink to={'/allproduct'}>
              <button className="btn-more">More</button>
            </NavLink>
          </div>
        </div>
      </section>

      {soupDishes.length > 0 && (
        <FoodCategorySection
          title="Các món ăn khác từ Database"
          items={soupDishes}
        />
      )}

      {/* Browse Recipes theo loại ẩm thực từ DB */}
      <section className="browse-section">
        <div className='menu-container'>
          <h2 className="browse-title">Browse by Cuisine</h2>
          <div className="browse-grid">
            {categories.map((cat) => (
              <NavLink to={`/recipes?cuisine=${cat.AmThucID}`} key={cat.AmThucID} className="category-card">
                <div className="category-image-wrapper">
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #2e7d32, #66bb6a)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      color: '#fff',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {cat.TenAmThuc?.charAt(0) || '?'}
                  </div>
                </div>
                <h3 className="category-name">{cat.TenAmThuc}</h3>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default MenuSection;
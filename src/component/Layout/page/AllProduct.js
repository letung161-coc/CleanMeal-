import { useEffect, useState } from "react";
import "./AllProduct.css";
import { NavLink } from "react-router-dom";
import { monanAPI } from "../../../api";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await monanAPI.getAll(1, 50);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Lỗi tải danh sách món ăn:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="allproduct-container">
      <h1 className="title">All Products</h1>

      {loading && <p>Đang tải dữ liệu từ SQL Server...</p>}
      {error && (
        <p style={{ color: "#e53e3e" }}>
          Lỗi: {error}. Kiểm tra Backend đang chạy tại http://localhost:4000.
        </p>
      )}

      <div className="product-flex">
        {!loading && !error && products.length === 0 ? (
          <p>Không có sản phẩm trong database</p>
        ) : (
          products.map((item) => (
            <div className="product-card" key={item.MaMon}>
              <div className="product-image">
                <img
                  src={item.AnhDaiDien || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={item.TenMon}
                />
                <div className="product-overlay">
                  <button className="btn-cart">ADD TO CART</button>
                  <div className="overlay-icons">
                    <NavLink to={`/product/${item.MaMon}`}>
                      <span>👁</span>
                    </NavLink>
                    <span>❤</span>
                    <span>⚖</span>
                  </div>
                </div>
              </div>
              <h3>{item.TenMon}</h3>
              {item.TongCalo && (
                <p style={{ color: "#888", fontSize: "0.85rem" }}>
                  🔥 {item.TongCalo} cal · ⏱ {item.ThoiGianNau || "?"} phút
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllProduct;

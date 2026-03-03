import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { monanAPI } from "../../api";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await monanAPI.getById(id);
        setProduct(data);
      } catch (err) {
        console.error("Lỗi tải chi tiết món ăn:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "2rem" }}>Đang tải chi tiết món ăn...</h2>;
  }

  if (error || !product) {
    return (
      <h2 style={{ textAlign: "center", padding: "2rem", color: "#e53e3e" }}>
        {error || "Không tìm thấy sản phẩm"}
      </h2>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-container">
        <div className="product-image">
          <img
            src={product.AnhDaiDien || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={product.TenMon}
          />
        </div>
        <div className="product-content">
          <h2>{product.TenMon}</h2>
          <p>{product.MoTaNgan}</p>

          {/* Thông tin dinh dưỡng */}
          <div style={{ display: "flex", gap: "1rem", margin: "1rem 0", flexWrap: "wrap" }}>
            {product.TongCalo && (
              <span style={tagStyle}>🔥 {product.TongCalo} cal</span>
            )}
            {product.ThoiGianNau && (
              <span style={tagStyle}>⏱ {product.ThoiGianNau} phút</span>
            )}
            {product.SoNguoiAn && (
              <span style={tagStyle}>👤 {product.SoNguoiAn} người</span>
            )}
          </div>

          {/* Nguyên liệu từ DB */}
          {product.NguyenLieu && product.NguyenLieu.length > 0 && (
            <>
              <h3>🥬 Nguyên liệu</h3>
              <ul className="product-check">
                {product.NguyenLieu.map((nl, i) => (
                  <li key={i}>
                    ✔ {nl.TenNguyenLieu} — {nl.SoLuong} {nl.DonViTinh}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Bước nấu từ DB */}
          {product.BuocNau && product.BuocNau.length > 0 && (
            <>
              <h3>👨‍🍳 Cách làm</h3>
              <ol style={{ paddingLeft: "1.2rem" }}>
                {product.BuocNau.map((buoc, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    {buoc.NoiDungBuoc}
                  </li>
                ))}
              </ol>
            </>
          )}

          <button className="btn-more">Thêm vào danh sách yêu thích</button>
        </div>
      </div>
    </div>
  );
}

const tagStyle = {
  background: "#f0fdf4",
  color: "#166534",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "0.85rem",
  fontWeight: 500,
};

export default Product;
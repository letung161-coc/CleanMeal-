import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { cookbookAPI } from "../../../api";
import "./CookBook.css";

// Hàm định dạng tiền tệ VNĐ
const formatVND = (price) => {
  return price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price) : 'Liên hệ';
};

function CookBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await cookbookAPI.getAll();
      setBooks(data);
    } catch (error) {
      console.error("Lỗi khi tải cookbooks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  // Xác định giá rẻ nhất để highlight
  const getMinPrice = (book) => {
    const prices = [book.GiaShopee, book.GiaTiki, book.GiaFahasa].filter(p => p != null && p > 0);
    return Math.min(...prices);
  };

  return (
    <DashboardLayout>
      <div className="cookbook-page">
        {/* HEADER */}
        <div className="cb-header" data-aos="fade-down">
          <h1>CleanMeal Library</h1>
          <p>
            Khám phá những cuốn sách nấu ăn eat clean, keto, ăn thuần chay tốt nhất.
            So sánh giá giữa các nền tảng thương mại điện tử để mua với giá rẻ nhất.
          </p>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="cb-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-cb-card"></div>
            ))}
          </div>
        ) : (
          <div className="cb-grid">
            {books.map((b) => {
              const minPrice = getMinPrice(b);

              return (
                <div className="cb-card" key={b.SachID} data-aos="fade-up">
                  {/* Cover */}
                  <div className="cb-cover-container">
                    <span className="cb-badge">🔥 Bán Chạy</span>
                    <img src={b.HinhAnhBia} alt={b.TenSach} className="cb-cover" />
                  </div>

                  {/* Body & Info */}
                  <div className="cb-body">
                    <h2 className="cb-title">{b.TenSach}</h2>
                    <p className="cb-author">Tác giả: {b.TacGia} ({b.NamXuatBan})</p>
                    <p className="cb-desc">{b.MoTa}</p>

                    {/* Price Comparison */}
                    <div className="cb-prices">
                      <div className="cb-price-row" style={{borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '8px'}}>
                        <span className="cb-vendor" style={{fontWeight: 'bold', color: '#333'}}>Giá Gốc:</span>
                        <span className="cb-price-val strike">{formatVND(b.GiaThamKhao)}</span>
                      </div>
                      
                      {b.GiaShopee && (
                      <div className="cb-price-row">
                        <span className="cb-vendor" style={{color: '#ee4d2d'}}>Shopee</span>
                        <span className={`cb-price-val ${b.GiaShopee === minPrice ? 'best-price' : ''}`} 
                              style={b.GiaShopee === minPrice ? {color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.05rem'} : {}}>
                          {formatVND(b.GiaShopee)}
                          {b.GiaShopee === minPrice && <span style={{marginLeft: '5px', fontSize: '0.8rem'}}>✓ Tốt nhất</span>}
                        </span>
                      </div>
                      )}
                      
                      {b.GiaTiki && (
                      <div className="cb-price-row">
                        <span className="cb-vendor" style={{color: '#1a94ff'}}>Tiki</span>
                        <span className={`cb-price-val ${b.GiaTiki === minPrice ? 'best-price' : ''}`}
                              style={b.GiaTiki === minPrice ? {color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.05rem'} : {}}>
                          {formatVND(b.GiaTiki)}
                          {b.GiaTiki === minPrice && <span style={{marginLeft: '5px', fontSize: '0.8rem'}}>✓ Tốt nhất</span>}
                        </span>
                      </div>
                      )}

                      {b.GiaFahasa && (
                      <div className="cb-price-row">
                        <span className="cb-vendor" style={{color: '#c92127'}}>Fahasa</span>
                        <span className={`cb-price-val ${b.GiaFahasa === minPrice ? 'best-price' : ''}`}
                              style={b.GiaFahasa === minPrice ? {color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.05rem'} : {}}>
                          {formatVND(b.GiaFahasa)}
                          {b.GiaFahasa === minPrice && <span style={{marginLeft: '5px', fontSize: '0.8rem'}}>✓ Tốt nhất</span>}
                        </span>
                      </div>
                      )}
                    </div>

                    {/* Action */}
                    <div className="cb-actions">
                      <button className="cb-btn" onClick={() => handleBuyClick(b.BestPriceLink)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Mua Ngay (Giá Tốt Nhất)
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default CookBook;

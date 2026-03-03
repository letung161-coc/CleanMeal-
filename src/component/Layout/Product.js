import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { monanAPI } from "../../api";

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        monanAPI.getById(id)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="pd-loading">⏳ Đang tải...</div>;
    if (error) return (
        <div className="pd-error">
            <p>⚠️ Không thể tải thông tin món ăn.</p>
            <p style={{ fontSize: 13, color: "#888", marginTop: 8 }}>
                Hãy chắc chắn Backend đang chạy tại <code>http://localhost:4000</code>
            </p>
        </div>
    );
    if (!product) return <div className="pd-error">Không tìm thấy món ăn</div>;

    return (
        <div className="product-detail">
            <div className="product-container">

                {/* ── Cột ảnh ── */}
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                </div>

                {/* ── Cột nội dung ── */}
                <div className="product-content">
                    <h2>{product.name}</h2>

                    {/* Macros */}
                    {product.macros && (
                        <div className="product-macros">
                            <div className="macro-item">
                                <span className="macro-value">{product.macros.cal}</span>
                                <span className="macro-label">Kcal</span>
                            </div>
                            <div className="macro-item">
                                <span className="macro-value">{product.macros.protein}</span>
                                <span className="macro-label">Protein</span>
                            </div>
                            <div className="macro-item">
                                <span className="macro-value">{product.macros.carbs}</span>
                                <span className="macro-label">Carbs</span>
                            </div>
                            <div className="macro-item">
                                <span className="macro-value">{product.macros.fats}</span>
                                <span className="macro-label">Fats</span>
                            </div>
                        </div>
                    )}

                    {/* Mô tả */}
                    <p className="product-description">{product.description}</p>

                    {/* Meta */}
                    <div className="product-meta">
                        {product.time && <span>⏱ {product.time}</span>}
                        {product.rating && <span>⭐ {product.rating} ({product.reviews} đánh giá)</span>}
                    </div>

                    {/* Nguyên liệu */}
                    {product.ingredients?.length > 0 && (
                        <div className="product-section">
                            <h3>🛒 Nguyên liệu</h3>
                            <ul className="product-ingredients">
                                {product.ingredients.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Nguồn dinh dưỡng */}
                    {product.nutrition && (
                        <div className="product-section">
                            <h3>💊 Nguồn dinh dưỡng</h3>
                            <div className="product-nutrition-grid">
                                {Object.entries(product.nutrition).map(([key, val]) => (
                                    <div className="nutrition-item" key={key}>
                                        <span className="nutrition-key">
                                            {key.replace(/_/g, " ").toUpperCase()}
                                        </span>
                                        <span className="nutrition-val">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cách làm */}
                    {product.steps?.length > 0 && (
                        <div className="product-section">
                            <h3>👨‍🍳 Cách làm</h3>
                            <ol className="product-steps">
                                {product.steps.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}

                    <button className="btn-more">❤ Thêm vào yêu thích</button>
                </div>

            </div>
        </div>
    );
}

export default Product;
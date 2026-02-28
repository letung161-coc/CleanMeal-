import { useEffect, useState } from "react";
import "./AllProduct.css";
import { NavLink } from "react-router-dom";

function AllProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("dishes")) || [];
    setProducts(data);
  }, []);

  return (
    <div className="allproduct-container">
      <h1 className="title">All Products</h1>
      <div className="findProduct">
        <ul>
            <li>Bánh Mì</li>
            <li>Bún</li>
            <li>Phở</li>
            <li>Hủ tiếu</li>
        </ul>
      </div>
      <div className="product-flex">
        {products.length === 0 ? (
          <p>Không có sản phẩm</p>
        ) : (
          products.map((item, index) => (
            <div className="product-card" key={index}>
              <div className="product-image">
                <img src={item.image} alt={item.name} />

                <div className="product-overlay">
                  <button className="btn-cart">ADD TO CART</button>
                  <div className="overlay-icons">
                    <NavLink to={`/product/${item.id}`}>
                        <span>👁</span>
                    </NavLink>
                    <span>❤</span>
                    <span>⚖</span>
                  </div>
                </div>
              </div>

              <h3>{item.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllProduct;

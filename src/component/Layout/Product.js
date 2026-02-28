import { useParams } from "react-router-dom";
import "./Product.css"
import product1 from '../../img/product1.jpg';
function Product() {
    const { id } = useParams();
    const dishes = JSON.parse(localStorage.getItem("dishes")) || [];
    const product = dishes.find(item => item.id ===Number(id));
    if(!product){
        return <h2>Khong tim thay san pham</h2>;
    }
    return (
        <>
            <div className="product-detail">
                <div className="product-container">
                    <div className="product-image">
                    <img
                        src={product.image}
                        alt={product.name}
                    />
                </div>
                <div className="product-content">
                    <h2>{product.name}</h2>
                    <p>
                        {product.decription}
                    </p>
                    <p>{product.nguyenlieu}</p>
                    <ul className="product-check">
                        <li>✔ Fresh ingredients</li>
                        <li>✔ Best quality</li>
                    </ul>
                    <button className="btn-more">Thêm vào danh sách yêu thích</button>
                </div>
                </div>
            </div>
        </>
    );
}
export default Product;
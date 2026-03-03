import React, { useEffect } from 'react';
import { FaEye, FaHeart, FaPen } from 'react-icons/fa';
import './Menu.css';
import product6 from '../../img/product6.jpg';
import product7 from '../../img/product7.jpg';
import product8 from '../../img/product8.jpg';
import product9 from '../../img/product9.jpg';
import sup1 from '../../img/sup1.jpg'
import one1 from '../../img/one1.jpg'
import diet1 from '../../img/diet1.jpg'
import { NavLink } from 'react-router-dom';
import FoodCategorySection from './FoodCategorySection';
import chicken from '../../img/chicken.jpg'
import imgLowCarb from '../../img/lowcarb.jpg'
import imgSalad from '../../img/salad.jpg'
import imgBreakfast from '../../img/breakfast.jpg'
import imgProtein from '../../img/protein.jpg'
import imgSnack from '../../img/snacks.webp'
import imgMeal from '../../img/meal.jpg'
import imgSandwich from '../../img/sandwich.jpg'
import { dishes as allDishes } from '../../data/foodDatabase';
const MenuSection = () => {
  // 4 featured dishes giữ ảnh local, data mở rộng từ database
  const localImages = [product6, product7, product8, product9];
  const dishes = allDishes.slice(0, 4).map((d, i) => ({
    ...d,
    image: localImages[i]
  }));
  // Sections lấy từ database theo category
  const soupDishes = allDishes.filter(d => d.tags.includes("Chicken") || d.category === "Soup")
    .slice(0, 4).map(d => ({ ...d, image: one1 }));
  const oneDishes = allDishes.filter(d => d.tags.includes("Meal Prep"))
    .slice(0, 4).map(d => ({ ...d, image: sup1 }));
  const dietDishes = allDishes.filter(d => d.tags.includes("Vegetarian") || d.tags.includes("Gluten Free"))
    .slice(0, 4).map(d => ({ ...d, image: diet1 }));
  const categories = [
    {
      id: 1,
      name: "Chicken",
      image: chicken,
      slug: "chicken"
    },
    {
      id: 2,
      name: "Low Carb",
      image: imgLowCarb,
      slug: "low-carb"
    },
    {
      id: 3,
      name: "Breakfast",
      image: imgBreakfast,
      slug: "breakfast"
    },
    {
      id: 4,
      name: "Protein Powder",
      image: imgProtein,
      slug: "protein-powder"
    },
    {
      id: 5,
      name: "Meal Prep",
      image: imgMeal,
      slug: "meal-prep"
    },
    {
      id: 6,
      name: "Salad",
      image: imgSalad,
      slug: "salad"
    },
    {
      id: 7,
      name: "Sandwiches",
      image: imgSandwich,
      slug: "sandwiches"
    },
    {
      id: 8,
      name: "Snacks",
      image: imgSnack,
      slug: "snacks"
    },
  ];
  useEffect(() => {
    // Lưu toàn bộ database vào localStorage để Product.js & AllProduct.js dùng
    localStorage.setItem('dishes', JSON.stringify(allDishes));
  }, []);
  return (
    <>
      <section className="menu-section">
        <div className="menu-container">
          <h2 className="menu-title">View all our dishes</h2>
          <p className="menu-subtitle">
            We have compiled and documented the recipes for all kinds of dishes from around the world, from all continents, here...
          </p>
          <div className="menu-grid">
            {dishes.map((dish) => (
              <div key={dish.id} className="menu-card">
                <NavLink to={`/product/${dish.id}`}>
                  <img src={dish.image} alt={dish.name} className="dish-image" />
                </NavLink>
                <h3 className="dish-name">{dish.name}</h3>
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
      <FoodCategorySection
        title="Warm it up for Soup Season"
        items={soupDishes}
      />
      <FoodCategorySection
        title="One pot / One pan is all you need!"
        items={oneDishes}
      />
      <FoodCategorySection
        title="Mediterranean Diet friendly meals!"
        items={dietDishes}
      />
      <section className="browse-section">
        <div className='menu-container'>
          <h2 className="browse-title">Browse Recipes</h2>
          <div className="browse-grid">
            {categories.map((cat) => (
              <NavLink to={`/login/${cat.slug}`} key={cat.id} className="category-card">
                <div className="category-image-wrapper">
                  <img src={cat.image} alt={cat.name} className="category-image" />
                </div>
                <h3 className="category-name">{cat.name}</h3>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default MenuSection;
import React, { useEffect } from 'react';
import { FaEye, FaHeart, FaPen, FaFire } from 'react-icons/fa';
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
const MenuSection = () => {
  const dishes = [
    {
      id: 1,
      name: "Chicken Breast Salad with Roasted Sesame Dressing",
      image: product6,
      decription: "Salad ức gà là món ăn nhẹ bụng – giàu protein – ít chất béo, rất thích hợp cho người giảm cân, ăn kiêng, tập gym. Thịt gà mềm, rau tươi giòn kết hợp với sốt mè rang béo nhẹ, thơm ngậy tạo cảm giác ngon miệng mà không ngán.",
      nguyenlieu: "100–150g ức gà"
    },
    {
      id: 2,
      name: "Black bread + Fried egg + Butter",
      image: product7,
      decription: "Món ăn sáng đơn giản – nhanh gọn – đầy đủ dinh dưỡng. Bơ béo tự nhiên kết hợp với trứng ốp la thơm mềm và bánh mì đen giúp cung cấp năng lượng lâu dài, không gây tăng cân, rất phù hợp cho dân văn phòng, sinh viên, người tập thể thao.",
      nguyenlieu: "1–2 quả trứng"
    },
    {
      id: 3,
      name: "Brown Rice + Pan-Seared Salmon + Boiled Vegetables",
      image: product8,
      decription: "Đây là combo chuẩn eat clean: tinh bột tốt từ gạo lứt + protein từ cá hồi + vitamin từ rau xanh. Món ăn giữ năng lượng bền lâu, hỗ trợ giảm mỡ, tăng cơ, đẹp da, rất phù hợp cho người ăn kiêng khoa học.",
      nguyenlieu: "1 chén cơm gạo lứt"
    },
    {
      id: 4,
      name: "Lemon-Cucumber-Mint Detox Water",
      image: product9,
      decription: "Nước detox giúp thanh lọc cơ thể, đẹp da, hỗ trợ tiêu hóa, giảm cảm giác thèm ăn và giúp cơ thể nhẹ nhàng, sảng khoái.",
      nguyenlieu: "1 chén cơm gạo lứt"
    }
  ];
  const soupDishes = [
    {
      id: 5,
      name: "Green Chile Chicken Soup",
      image: one1,
      tags: ["Chicken", "Dinner"],
      macros: { cal: 340, carbs: "39g", fats: "6g", protein: "35g" }
    },
    {
      id: 6,
      name: "High Protein Roasted Veg Stew",
      image: one1,
      tags: ["Dinner", "Fall"],
      macros: { cal: 350, carbs: "32g", fats: "17g", protein: "22g" }
    },
    {
      id: 7,
      name: "Delicious Split Red Lentil Soup",
      image: one1,
      tags: ["Gluten Free", "Meal Prep"],
      macros: { cal: 250, carbs: "33g", fats: "8g", protein: "12g" }
    },
    {
      id: 8,
      name: "15 Minute Egg Drop Soup",
      image: one1,
      tags: ["Dinner", "Gluten Free"],
      macros: { cal: 280, carbs: "17g", fats: "16g", protein: "20g" }
    }
  ];
  const oneDishes = [
    {
      id: 9,
      name: "Sheet Pan Salmon Niçoise Salad Recipe",
      image: sup1,
      tags: ["Chicken", "Dinner"],
      macros: { cal: 340, carbs: "39g", fats: "6g", protein: "35g" }
    },
    {
      id: 10,
      name: "High Protein Roasted Veg StewSheet Pan Sriracha Chicken & Veggies Over Quinoa (Healthy Meal Prep)",
      image: sup1,
      tags: ["Dinner", "Fall"],
      macros: { cal: 350, carbs: "32g", fats: "17g", protein: "22g" }
    },
    {
      id: 11,
      name: "Slow Cooker Black-Eyed Pea and Butterbean Soup with Chicken Andouille Sausage",
      image: sup1,
      tags: ["Gluten Free", "Meal Prep"],
      macros: { cal: 250, carbs: "33g", fats: "8g", protein: "12g" }
    },
    {
      id: 12,
      name: "Grilled Chicken & Rice Soup with Warm Spices",
      image: sup1,
      tags: ["Dinner", "Gluten Free"],
      macros: { cal: 280, carbs: "17g", fats: "16g", protein: "20g" }
    }
  ];
  const dietDishes = [
    {
      id: 13,
      name: "Sheet Pan Salmon Niçoise Salad Recipe",
      image: diet1,
      tags: ["Chicken", "Dinner"],
      macros: { cal: 340, carbs: "39g", fats: "6g", protein: "35g" }
    },
    {
      id: 14,
      name: "High Protein Roasted Veg StewSheet Pan Sriracha Chicken & Veggies Over Quinoa (Healthy Meal Prep)",
      image: diet1,
      tags: ["Dinner", "Fall"],
      macros: { cal: 350, carbs: "32g", fats: "17g", protein: "22g" }
    },
    {
      id: 15,
      name: "Slow Cooker Black-Eyed Pea and Butterbean Soup with Chicken Andouille Sausage",
      image: diet1,
      tags: ["Gluten Free", "Meal Prep"],
      macros: { cal: 250, carbs: "33g", fats: "8g", protein: "12g" }
    },
    {
      id: 16,
      name: "Grilled Chicken & Rice Soup with Warm Spices",
      image: diet1,
      tags: ["Dinner", "Gluten Free"],
      macros: { cal: 280, carbs: "17g", fats: "16g", protein: "20g" }
    }
  ];
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
    localStorage.setItem('dishes', JSON.stringify(dishes));
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
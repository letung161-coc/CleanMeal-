import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import "./Favorites.css";

const TABS = ["All Favorites","Breakfast","Lunch","Dinner","Snacks","Vegetarian"];

const favorites = [
  { id:1, title:"Fresh Avocado Salad", desc:"A healthy mix of greens, avocado, and lime dressing.", kcal:320, time:"15 min", rating:4.8, category:"Breakfast",
    img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" },
  { id:2, title:"Superfood Quinoa...", desc:"Packed with protein and veggies for a power lunch.", kcal:450, time:"25 min", rating:4.9, category:"Lunch",
    img:"https://images.unsplash.com/photo-1544025162-d76594e44959?auto=format&fit=crop&w=400&q=80" },
  { id:3, title:"Grilled Salmon &...", desc:"Omega-3 rich salmon perfectly grilled with fresh herbs.", kcal:520, time:"40 min", rating:5.0, category:"Dinner",
    img:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80" },
  { id:4, title:"Tomato Basil Chicken", desc:"Juicy chicken breast with fresh basil and tomato reduction.", kcal:380, time:"20 min", rating:4.7, category:"Lunch",
    img:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&q=80" },
  { id:5, title:"Crunchy Veggie Wrap", desc:"A quick and easy wrap loaded with crunchy veggies and hummus.", kcal:250, time:"10 min", rating:4.6, category:"Vegan",
    img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" },
  { id:6, title:"Berry Antioxidant...", desc:"Start your day with a boost of berries and yogurt.", kcal:180, time:"5 min", rating:4.9, category:"Breakfast",
    img:"https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=400&q=80" },
];

function Favorites() {
  const [activeTab, setActiveTab] = useState("All Favorites");
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <div className="fav-page">
        {/* HEADER */}
        <div className="fav-header">
          <div>
            <h1>Món ăn yêu thích</h1>
            <p>Your collection of {favorites.length * 4} delicious recipes</p>
          </div>
          <div className="fav-search-sort">
            <div className="fav-search">
              <span>🔍</span>
              <input
                placeholder="Search favorites..."
                value={search}
                onChange={e=>setSearch(e.target.value)}
              />
            </div>
            <div className="fav-sort">Recently Added ▾</div>
          </div>
        </div>

        {/* TABS */}
        <div className="fav-filters">
          {TABS.map(t => (
            <button key={t} className={`fav-tab${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="fav-grid">
          {favorites.map(f => (
            <div className="fav-card" key={f.id}>
              <div className="fav-card-img">
                <img src={f.img} alt={f.title} />
                <span className="fav-heart">❤️</span>
                <span className="fav-time-badge">⏱ {f.time}</span>
              </div>
              <div className="fav-card-body">
                <span className={`fav-card-category ${f.category.toLowerCase()}`}>
                  {f.category.toUpperCase()}
                </span>
                <span className="fav-card-rating">⭐ {f.rating}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="fav-card-footer">
                  <span>🔥 {f.kcal} Kcal</span>
                  <button className="fav-view-link">View Recipe →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium popup */}
        <div className="fav-premium-popup">
          <h4>Join Premium</h4>
          <p>Get access to exclusive recipes and diet plans.</p>
          <button className="fav-upgrade-btn">Upgrade</button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Favorites;

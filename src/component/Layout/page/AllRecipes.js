import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import "./AllRecipes.css";

const TABS = ["All Recipes","Low Carb","Salad","Breakfast","Protein Powder","Chicken","Vegetarian"];

const recipes = [
  { id:1, title:"Avocado Salad", desc:"Fresh greens with creamy avocado, cherry tomatoes and lime dressing.", kcal:350, time:"15 min", rating:4.8, reviews:128, badge:"Breakfast",
    img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" },
  { id:2, title:"Grilled Chicken...", desc:"Perfectly grilled chicken breast served with seasonal herbs.", kcal:420, time:"30 min", rating:4.7, reviews:94, badge:"Chicken",
    img:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&q=80" },
  { id:3, title:"Green Superfood...", desc:"A powerhouse of nutrients with kale, spinach and mixed seeds.", kcal:280, time:"10 min", rating:5.0, reviews:210, badge:"LowCarb",
    img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80" },
  { id:4, title:"Berry Blast...", desc:"Start your morning with antioxidants and natural energy boost.", kcal:180, time:"5 min", rating:4.5, reviews:56, badge:"Protein",
    img:"https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=400&q=80" },
  { id:5, title:"Tuna Poke Bowl", desc:"Fresh tuna cubes, edamame, and rice with sesame soy dressing.", kcal:320, time:"20 min", rating:4.8, reviews:94, badge:"Seafood",
    img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" },
  { id:6, title:"Berry Oatmeal...", desc:"Warm oatmeal topped with fresh seasonal berries and honey.", kcal:240, time:"15 min", rating:4.6, reviews:162, badge:"Breakfast",
    img:"https://images.unsplash.com/photo-1571748982800-fa51082c2224?auto=format&fit=crop&w=400&q=80" },
  { id:7, title:"Fresh Veggie...", desc:"Crunchy vegetables wrapped in a whole-wheat tortilla with hummus.", kcal:210, time:"10 min", rating:4.4, reviews:87, badge:"Vegetarian",
    img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" },
  { id:8, title:"Pan-Seared...", desc:"Rich salmon fillet seared to perfection with lemon-dill butter.", kcal:450, time:"25 min", rating:4.9, reviews:203, badge:"Keto",
    img:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80" },
];

function AllRecipes() {
  const [activeTab, setActiveTab] = useState("All Recipes");
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => setLiked(p => ({ ...p, [id]: !p[id] }));

  return (
    <DashboardLayout>
      <div className="recipes-page">
        {/* HERO */}
        <div className="rcp-hero">
          <h1>Discover Healthy Recipes</h1>
          <p>Explore thousands of delicious, nutritious meals tailored to your dietary needs and taste preferences.</p>
        </div>

        {/* FILTER TABS */}
        <div className="rcp-filters">
          {TABS.map(t => (
            <button key={t} className={`rcp-tab${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)}>
              {t}
            </button>
          ))}
          <div className="rcp-filter-right">⚙️ Filters</div>
        </div>

        {/* GRID */}
        <div className="rcp-grid">
          {recipes.map(r => (
            <div className="rcp-card" key={r.id}>
              <div className="rcp-card-img-wrap">
                <img src={r.img} alt={r.title} />
                <button
                  className={`rcp-heart-btn${liked[r.id]?" liked":""}`}
                  onClick={()=>toggleLike(r.id)}
                >{liked[r.id]?"❤️":"🤍"}</button>
                <span className={`rcp-badge ${r.badge}`}>{r.badge}</span>
              </div>
              <div className="rcp-card-meta">
                <span className="rcp-rating">⭐ {r.rating} ({r.reviews})</span>
                <span className="rcp-kcal">{r.kcal} Kcal</span>
              </div>
              <div className="rcp-card-body">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <div className="rcp-card-footer">
                  <span className="rcp-time">⏱ {r.time}</span>
                  <button className="rcp-view-link">View Recipe</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="rcp-load-more">
          <button className="rcp-load-btn">Load More Recipes</button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AllRecipes;

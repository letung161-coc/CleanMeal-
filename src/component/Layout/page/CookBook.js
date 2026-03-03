import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import "./CookBook.css";

const TABS = ["All","Cookbooks","Magazines","New Arrivals"];

const books = [
  { id:1, title:"The Green Smoothie Cleanse", author:"By Michael Ongé", price:"$9.99", label:"cookbook",
    img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=300&q=80" },
  { id:2, title:"Food & Soul: Spring Issue", author:"Monthly Edition · May 2024", price:"$4.99", label:"magazine",
    img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80" },
  { id:3, title:"Baking with Whole Grains", author:"By Alex Waters", price:"$24.99", label:"cookbook",
    img:"https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=300&q=80" },
  { id:4, title:"Seasonal Eating Guide", author:"Summer Special 2024", price:"Free", label:"magazine",
    img:"https://images.unsplash.com/photo-1498837167922-41c53b4f0826?auto=format&fit=crop&w=300&q=80" },
];

const curated = [
  { name:"Plant-Based Power", count:"34 items",
    img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=80" },
  { name:"Keto for Beginners", count:"42 items",
    img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { name:"Meal Prep Masterclass", count:"57 items",
    img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80" },
];

function CookBook() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <div className="book-page">
        {/* HEADER */}
        <div className="bk-header">
          <h1>Cookbook & Magazine Library</h1>
          <p>Explore our curated collection of premium cookbooks and monthly magazines. Discover new recipes, nutritional guides, and culinary inspiration.</p>
        </div>

        {/* FILTER BAR */}
        <div className="bk-bar">
          {TABS.map(t => (
            <button key={t} className={`bk-tab${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)}>{t}</button>
          ))}
          <div className="bk-search">
            <span>🔍</span>
            <input placeholder="Search by title or author..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
        </div>

        {/* FEATURED */}
        <div className="bk-featured">
          <div className="bk-feat-top-label" style={{gridColumn:"1/-1"}}>COOKBOOK OF THE MONTH</div>
          <div className="bk-feat-img-side">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80"
              alt="Featured book"
            />
          </div>
          <div className="bk-feat-text">
            <span className="section-tag">EDITOR'S PICK</span>
            <h2>The Whole Food Kitchen: Simple Recipes</h2>
            <p>Discover over 100 plant-based recipes designed to nourish your body and delight your taste buds. From quick breakfasts to elaborate dinner parties, this comprehensive guide covers it all.</p>
            <div className="bk-feat-author">
              <img src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=60&q=80" alt="author" />
              <div>
                <div className="bk-feat-author-name">Sarah Jenkins</div>
                <div className="bk-feat-author-title">Certified Nutritionist</div>
              </div>
            </div>
            <div className="bk-feat-btns">
              <button className="bk-buy-btn">Buy Digital ($14.99)</button>
              <button className="bk-preview-btn">Preview</button>
            </div>
          </div>
        </div>

        {/* NEW ARRIVALS */}
        <div className="bk-section">
          <div className="bk-section-hdr">
            <h2>New Arrivals</h2>
            <a href="#">View All +</a>
          </div>
          <div className="bk-books-grid">
            {books.map(b => (
              <div className="bk-book-card" key={b.id}>
                <div className="bk-book-img">
                  <img src={b.img} alt={b.title} />
                  <span className={`bk-book-label ${b.label}`}>{b.label.charAt(0).toUpperCase()+b.label.slice(1)}</span>
                  <button className="bk-book-fav">🔖</button>
                </div>
                <div className="bk-book-body">
                  <h3>{b.title}</h3>
                  <p className="author">{b.author}</p>
                  <div className="bk-book-footer">
                    <span className="bk-book-price">{b.price}</span>
                    <a href="#" className="bk-details-link">Details</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MEMBERSHIP */}
        <div className="bk-membership">
          <div>
            <div className="bk-membership-tag">PREMIUM MEMBERSHIP</div>
            <h2>Unlimited Access to Healthy Living</h2>
            <p>Get unlimited access to our entire digital library of over 500+ cookbooks and monthly magazine issues for one low monthly price.</p>
            <div className="bk-perks">
              {["New releases added weekly","Exclusive member-only recipes","Cancel anytime"].map((p,i) => (
                <div className="bk-perk" key={i}>
                  <span className="check">✅</span> {p}
                </div>
              ))}
            </div>
            <button className="bk-trial-btn">Start 14-Day Free Trial</button>
          </div>
          <div className="bk-membership-price">
            <div className="bk-price-per">Starting at</div>
            <div className="bk-price-num">$9.<span style={{fontSize:"1.2rem"}}>99</span></div>
            <div className="bk-price-mo">/mo</div>
          </div>
        </div>

        {/* CURATED */}
        <div className="bk-section">
          <div className="bk-section-hdr"><h2>Curated Collections</h2></div>
          <div className="bk-curated">
            {curated.map((c,i) => (
              <div className="bk-curated-card" key={i}>
                <img src={c.img} alt={c.name} />
                <div className="bk-curated-overlay" />
                <div className="bk-curated-info">
                  <span className="bk-curated-count">{c.count}</span>
                  <div className="bk-curated-name">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CookBook;

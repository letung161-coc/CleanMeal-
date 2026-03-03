import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import "./Videos.css";

const TABS = ["All Videos","Quick Meals","Vegan","Keto","Meal Prep"];

const videos = [
  { id:1, title:"High-Protein Plant-Based Lunch Ideas", tag:"Vegan", views:"8k views", duration:"09:45",
    author:"Sarah Jenkins", date:"2 days ago",
    img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=80",
    avatar:"https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=60&q=80" },
  { id:2, title:"Perfect Pan-Seared Salmon with Asparagus", tag:"Seafood", views:"12k views", duration:"11:58",
    author:"Mark Thompson", date:"3 days ago",
    img:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
    avatar:"https://images.unsplash.com/photo-1583394293214-0b87278f50dd?auto=format&fit=crop&w=60&q=80" },
  { id:3, title:"5 Ways to Elevate Your Avocado Toast", tag:"Breakfast", views:"35k views", duration:"09:09",
    author:"Elena Wilson", date:"1 week ago",
    img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80",
    avatar:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=60&q=80" },
  { id:4, title:"Green Smoothie Bowl for Glowing Skin", tag:"Vegan", views:"22k views", duration:"09:00",
    author:"Claire Babiot", date:"3 weeks ago",
    img:"https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=500&q=80",
    avatar:"https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=60&q=80" },
  { id:5, title:"Mediterranean Chicken Skewers Meal Prep", tag:"MealPrep", views:"64k views", duration:"19:45",
    author:"Chef Kevin Curry", date:"2 months ago",
    img:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=500&q=80",
    avatar:"https://images.unsplash.com/photo-1583394293214-0b87278f50dd?auto=format&fit=crop&w=60&q=80" },
  { id:6, title:"Quinoa Power Bowls: Fast & Easy", tag:"Keto", views:"48k views", duration:"10:07",
    author:"Stuart Miller", date:"1 month ago",
    img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
    avatar:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=60&q=80" },
];

function Videos() {
  const [activeTab, setActiveTab] = useState("All Videos");
  const [activePage, setActivePage] = useState(1);

  return (
    <DashboardLayout>
      <div className="videos-page">
        {/* HEADER */}
        <div className="vid-header">
          <h1>Cooking Masterclass</h1>
          <p>Watch our chefs prepare delicious, healthy meals step-by-step. Master the art of nutritious cooking from your own kitchen.</p>
        </div>

        {/* FEATURED VIDEO */}
        <div className="vid-featured">
          <img
            className="vid-featured-thumb"
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80"
            alt="Featured video"
          />
          <div className="vid-featured-overlay" />
          <div className="vid-play-btn">▶</div>
          <span className="vid-featured-tag">✦ FEATURED</span>
          <div className="vid-featured-info">
            <p className="vid-featured-meta">⏱ 15:30</p>
            <h2>Mastering Meal Prep: The Ultimate Guide for Beginners</h2>
            <div className="vid-featured-author">
              <img className="avatar"
                src="https://images.unsplash.com/photo-1583394293214-0b87278f50dd?auto=format&fit=crop&w=60&q=80"
                alt="chef"
              />
              Chef Kevin Curry · Head of Nutrition
            </div>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="vid-filters">
          {TABS.map(t => (
            <button key={t} className={`vid-tab${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="vid-grid">
          {videos.map(v => (
            <div className="vid-card" key={v.id}>
              <div className="vid-thumb">
                <img src={v.img} alt={v.title} />
                <span className={`vid-card-tag ${v.tag}`}>{v.tag}</span>
                <span className="vid-duration">{v.duration}</span>
              </div>
              <div className="vid-card-body">
                <p className="vid-views">▶ {v.views}</p>
                <h3>{v.title}</h3>
                <div className="vid-author-row">
                  <img className="av" src={v.avatar} alt={v.author} />
                  <span className="vid-author-name">{v.author}</span>
                  <span className="vid-date">{v.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="vid-pagination">
          <button className="vid-page-btn">❮</button>
          {[1,2,3,"…",8].map((p,i) => (
            <button key={i} className={`vid-page-btn${activePage===p?" active":""}`}
              onClick={()=>typeof p==="number"&&setActivePage(p)}>
              {p}
            </button>
          ))}
          <button className="vid-page-btn">❯</button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Videos;

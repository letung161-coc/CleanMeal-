import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import "./WeeklyPlan.css";

const days = [
  { name:"MON", num:24 }, { name:"TUE", num:25 }, { name:"WED", num:26 },
  { name:"THU", num:27 }, { name:"FRI", num:28 }, { name:"SAT", num:29 }, { name:"SUN", num:30 },
];

function WeeklyPlan() {
  const [activeDay, setActiveDay] = useState(2); // WED = index 2

  return (
    <DashboardLayout>
      <div className="weekly-page">
        {/* HEADER */}
        <div className="wp-header">
          <div>
            <h1>Weekly Plan</h1>
            <p>Plan your healthy meals for the week of <span>Oct 24 – Oct 30</span></p>
          </div>
          <div className="wp-header-btns">
            <button className="wp-btn-outline">🛒 Generate Shopping List</button>
            <button className="wp-btn-primary">+ New Plan</button>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="wp-calendar">
          <button className="wp-cal-arrow">❮</button>
          <div className="wp-days">
            {days.map((d,i) => (
              <div
                key={i}
                className={`wp-day${activeDay===i?" active":""}`}
                onClick={()=>setActiveDay(i)}
              >
                <span className="wp-day-name">{d.name}</span>
                <span className="wp-day-num">{d.num}</span>
              </div>
            ))}
          </div>
          <button className="wp-cal-arrow">❯</button>
        </div>

        {/* MEAL COLUMNS */}
        <div className="wp-meals">
          {/* BREAKFAST */}
          <div className="wp-meal-col">
            <div className="wp-meal-header">
              <span>🌅</span>
              <h3>Breakfast</h3>
              <span className="kcal">450 kcal</span>
            </div>
            <div className="wp-meal-card">
              <div className="wp-meal-card-img">
                <img src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80" alt="Avocado Toast" />
                <span className="wp-meal-time">⏱ 15 min</span>
                <span className="wp-meal-heart">❤️</span>
              </div>
              <div className="wp-meal-info">
                <h4>Avocado Toast with...</h4>
                <div className="wp-meal-tags">
                  <span className="wp-meal-tag protein">● Protein</span>
                  <span className="wp-meal-tag fiber">● Fiber</span>
                </div>
              </div>
            </div>
            <div className="wp-add-slot">
              <span className="plus">⊕</span>
              <span>Add Side Dish</span>
            </div>
          </div>

          {/* LUNCH */}
          <div className="wp-meal-col">
            <div className="wp-meal-header">
              <span>☀️</span>
              <h3>Lunch</h3>
              <span className="kcal">620 kcal</span>
            </div>
            <div className="wp-meal-card">
              <div className="wp-meal-card-img">
                <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80" alt="Salmon Salad" />
                <span className="wp-meal-time">⏱ 30 min</span>
                <span className="wp-meal-heart" style={{color:"#ef4444"}}>❤️</span>
              </div>
              <div className="wp-meal-info">
                <h4>Grilled Salmon Salad Bowl</h4>
                <div className="wp-meal-tags">
                  <span className="wp-meal-tag omega">● Omega-3</span>
                  <span className="wp-meal-tag vitamin">● Vitamins</span>
                </div>
              </div>
            </div>
            <div className="wp-add-slot">
              <span className="plus">⊕</span>
              <span>Add Snack</span>
            </div>
          </div>

          {/* DINNER */}
          <div className="wp-meal-col">
            <div className="wp-meal-header">
              <span>🌙</span>
              <h3>Dinner</h3>
              <span className="kcal">-- kcal</span>
            </div>
            <div className="wp-empty-slot">
              <div className="icon">🍽️</div>
              <p>No Meal Planned</p>
              <span>Add a delicious dinner to complete your day.</span>
              <br/>
              <button className="wp-add-meal-btn">Add Meal</button>
            </div>
          </div>
        </div>

        {/* NUTRITION SUMMARY */}
        <div className="wp-nutrition">
          <div className="wp-nutr-header">
            <h3>📊 Daily Nutrition Summary</h3>
            <span>Target: 2000 kcal</span>
          </div>
          <div className="wp-nutr-grid">
            {[
              { label:"Calories", value:"1,070", pct:"53%", color:"green" },
              { label:"Protein", value:"85g", pct:"60%", color:"blue" },
              { label:"Carbs", value:"120g", pct:"45%", color:"yellow" },
              { label:"Fat", value:"45g", pct:"38%", color:"red" },
            ].map((n,i) => (
              <div className="wp-nutr-card" key={i}>
                <label>{n.label}</label>
                <div className="value">{n.value}</div>
                <div className={`pct ${n.color}`}>{n.pct}</div>
                <div className="wp-progress">
                  <div className={`wp-progress-fill ${n.color}`} style={{width:n.pct}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default WeeklyPlan;

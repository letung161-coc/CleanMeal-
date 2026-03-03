import React from "react";
import DashboardLayout from "./DashboardLayout";

const posts = [
  { id:1, title:"10 Best Protein Sources for Vegans", category:"Nutrition", date:"Feb 20, 2026", read:"5 min read",
    desc:"Discover the top plant-based protein foods that can help you meet your daily protein needs without any animal products.",
    img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80" },
  { id:2, title:"How to Meal Prep Like a Pro", category:"Meal Prep", date:"Feb 18, 2026", read:"8 min read",
    desc:"Save time and eat healthier all week with these expert meal prep strategies used by nutritionists and professional chefs.",
    img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" },
  { id:3, title:"The Science of Counting Calories", category:"Health", date:"Feb 14, 2026", read:"6 min read",
    desc:"Understanding how calorie counting works and why it's not just about the numbers — quality of food matters just as much.",
    img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80" },
  { id:4, title:"5 Anti-Inflammatory Foods to Add to Your Diet", category:"Wellness", date:"Feb 10, 2026", read:"4 min read",
    desc:"Chronic inflammation is linked to many diseases. These powerful foods can help fight it naturally from the inside out.",
    img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80" },
  { id:5, title:"Beginner's Guide to Intermittent Fasting", category:"Diet", date:"Feb 5, 2026", read:"7 min read",
    desc:"Everything you need to know about IF — the popular eating pattern that's helping thousands lose weight and feel better.",
    img:"https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=600&q=80" },
  { id:6, title:"Making Healthy Eating Fun for Kids", category:"Family", date:"Jan 30, 2026", read:"5 min read",
    desc:"Practical tips and fun recipe ideas to get children excited about eating nutritious, wholesome food every day.",
    img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" },
];

const catColors = {
  Nutrition:"#dcfce7,#166534",Meal_Prep:"#dbeafe,#1e40af",Health:"#fce7f3,#9d174d",
  Wellness:"#fef3c7,#92400e",Diet:"#ede9fe,#5b21b6",Family:"#ffedd5,#9a3412"
};

function Blog() {
  return (
    <DashboardLayout>
      <div style={{fontFamily:"'Inter',sans-serif",background:"#f8fafb",minHeight:"100%",padding:"32px"}}>
        {/* HEADER */}
        <div style={{marginBottom:"28px"}}>
          <h1 style={{fontSize:"1.8rem",fontWeight:"900",color:"#111",margin:"0 0 6px"}}>Healthy Living Blog</h1>
          <p style={{fontSize:"0.9rem",color:"#888",margin:0}}>Expert articles, tips, and guides for your wellness journey.</p>
        </div>

        {/* GRID */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"22px"}}>
          {posts.map(p => {
            const [bg,text] = (catColors[p.category] || catColors.Nutrition).split(",");
            return (
              <div key={p.id} style={{
                background:"#fff",borderRadius:"16px",overflow:"hidden",
                boxShadow:"0 2px 12px rgba(0,0,0,0.07)",border:"1.5px solid #f0f0f0",
                transition:"all 0.3s ease",cursor:"pointer"
              }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
              >
                <div style={{height:"180px",overflow:"hidden"}}>
                  <img src={p.img} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s"}} />
                </div>
                <div style={{padding:"18px"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
                    <span style={{background:bg,color:text,fontSize:"0.7rem",fontWeight:"700",
                      padding:"3px 10px",borderRadius:"50px",textTransform:"uppercase",letterSpacing:"0.5px"}}>
                      {p.category}
                    </span>
                    <span style={{fontSize:"0.75rem",color:"#bbb"}}>{p.read}</span>
                  </div>
                  <h3 style={{fontSize:"0.97rem",fontWeight:"700",color:"#111",margin:"0 0 8px",lineHeight:"1.35"}}>{p.title}</h3>
                  <p style={{fontSize:"0.83rem",color:"#777",lineHeight:"1.6",margin:"0 0 14px",
                    display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.desc}</p>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:"0.78rem",color:"#bbb"}}>{p.date}</span>
                    <button style={{color:"#4caf50",fontWeight:"700",fontSize:"0.82rem",
                      background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"'Inter',sans-serif"}}>
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Blog;

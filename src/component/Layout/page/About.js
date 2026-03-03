import React, { useEffect, useRef } from "react";
import "./About.css";

/* ---- useInView hook for scroll-triggered animations ---- */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

const teamMembers = [
  {
    name: "Sarah Jenkins",
    role: "Founder & Director",
    roleClass: "",
    img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Michael Chen",
    role: "Head Chef",
    roleClass: "",
    img: "https://images.unsplash.com/photo-1583394293214-0b87278f50dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Elena Rodriguez",
    role: "Nutrition Specialist",
    roleClass: "",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "David Kim",
    role: "Nutrition Advisor",
    roleClass: "role-green",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

const values = [
  {
    icon: "🌿",
    iconClass: "green",
    title: "Fresh Ingredients",
    desc: "We source the freshest ingredients because we know that every recipe is designed to encourage people to cook.",
  },
  {
    icon: "❤️",
    iconClass: "orange",
    title: "Healthy Living",
    desc: "Passionate about healthy eating, we provide nutritional information and balanced meal plans at every step.",
  },
  {
    icon: "♻️",
    iconClass: "blue",
    title: "Sustainability",
    desc: "We care about the planet. Our website promotes eco-friendly cooking and sourcing ingredients from sustainable suppliers.",
  },
];

const stats = [
  { num: "10k+", lbl: "Recipes" },
  { num: "500k+", lbl: "Happy Users" },
  { num: "100+", lbl: "Expert Chefs" },
  { num: "25", lbl: "Countries" },
];

function About() {
  const storyRef = useInView();
  const statsRef = useInView(0.1);
  const valuesRef = useInView();
  const teamRef = useInView();
  const ctaRef = useInView();

  return (
    <div className="about-page">
      {/* ===== HERO ===== */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <h1 className="anim-fade-up">Nourishing Your Life</h1>
          <p className="anim-fade-up delay-200">
            Discover the story behind our passion for healthy living,
            sustainable sourcing, and bringing the freshest flavors to your
            table.
          </p>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section
        className="about-story scroll-section"
        ref={storyRef}
        style={{ opacity: 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: "translateY(30px)" }}
      >
        <div className="story-left">
          <span className="tag">OUR STORY</span>
          <h2>Our Story Begins in the Garden</h2>
          <p>
            It's a long established fact that readers are distracted by the
            readability of a page when looking at its layout. Our journey started
            ten years ago. With a simple belief: food should be medicine, but it
            should be delicious.
          </p>
          <p>
            From a small community garden to a worldwide platform, we have
            compiled and documented recipes for all kinds of dishes from around
            the world. We believe in transparency, quality, and the joy of cooking.
            Every recipe we share is tested in our kitchens to ensure it meets our
            high standards on taste and nutrition.
          </p>
          <button className="story-btn">About our Methods →</button>
        </div>
        <div className="story-right">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Chef cooking"
          />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div
        className="about-stats scroll-section"
        ref={statsRef}
        style={{ opacity: 0, transition: "opacity 0.7s ease", transform: "none" }}
      >
        {stats.map((s, i) => (
          <div
            className="stat-block"
            key={i}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="num">{s.num}</span>
            <span className="lbl">{s.lbl}</span>
          </div>
        ))}
      </div>

      {/* ===== VALUES ===== */}
      <section
        className="about-values scroll-section"
        ref={valuesRef}
        style={{ opacity: 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: "translateY(30px)" }}
      >
        <span className="section-subtitle">OUR VALUES</span>
        <h2>Our Mission & Core Values</h2>
        <p className="lead">
          We are dedicated to changing the way people think about food by making
          healthy eating a rewarding and inclusive lifestyle.
        </p>
        <div className="values-grid">
          {values.map((v, i) => (
            <div
              className="value-card"
              key={i}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={`value-icon ${v.iconClass}`}>{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section
        className="about-team scroll-section"
        ref={teamRef}
        style={{ opacity: 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: "translateY(30px)" }}
      >
        <div className="team-header">
          <div className="team-header-left">
            <span className="section-subtitle">MEET THE TEAM</span>
            <h2>The Minds Behind the Meals</h2>
          </div>
          <div className="team-header-right">
            <a href="#">View all members →</a>
          </div>
        </div>
        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <div
              className="team-card"
              key={i}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <img src={m.img} alt={m.name} />
              <div className="team-card-info">
                <h4>{m.name}</h4>
                <span className={m.roleClass}>{m.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        className="about-cta scroll-section"
        ref={ctaRef}
        style={{ opacity: 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: "translateY(30px)" }}
      >
        <h2>Ready to start your journey?</h2>
        <p>
          Join our community of food lovers and start cooking healthy, delicious
          meals today. Get access to exclusive recipes and meal plans.
        </p>
        <div className="cta-btns">
          <button className="cta-btn-w">Get Started Free</button>
          <button className="cta-btn-o">Browse Recipes</button>
        </div>
      </section>
    </div>
  );
}

/* ---- Inject scroll-trigger logic via a style tag ---- */
const scrollStyle = document.createElement("style");
scrollStyle.innerHTML = `.scroll-section.in-view { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(scrollStyle);

export default About;

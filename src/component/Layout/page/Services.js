import React, { useEffect, useRef } from "react";
import "./Services.css";

function useScrollFade(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in-view"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

const services = [
  {
    title: "Personalized Meal Plans",
    desc: "Tailored specifically to your dietary preferences and goals. Whether you're keto, vegan, or gluten-free, we craft the perfect eating plan for you.",
    price: "Starting at $29/mo",
    link: "Learn More",
    img: "https://images.unsplash.com/photo-1498837167922-41c53b4f0826?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Book Now",
  },
  {
    title: "Cooking Classes",
    desc: "Join our expert chefs for interactive workshops. Learn essential knife skills, quick weeknight recipes and how to maximize nutrition in every dish.",
    price: "Weekly Sessions",
    link: "View Schedule",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Sign Up",
  },
  {
    title: "Nutritional Consulting",
    desc: "One-on-one sessions with certified nutrition experts who can analyze your habits and create a sustainable roadmap for long-term health improvements.",
    price: "In-person & Virtual",
    link: "Book Now",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Book Now",
  },
  {
    title: "Grocery Shopping Tours",
    desc: "Learn how to navigate the supermarket aisles with confidence. Decode food labels, spot hidden sugars, and pick the freshest produce with our guides.",
    price: "90 min Tour",
    link: "Sign Up",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Sign Up",
  },
  {
    title: "Corporate Wellness",
    desc: "Boost employee productivity and morale with healthy catering, lunch-and-learns, and team-building cooking challenges tailored for your workplace.",
    price: "Custom Packages",
    link: "Get Quote",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Quote",
  },
  {
    title: "Pantry Makeover",
    desc: "We visit your home to clear out the junk and replace it with wholesome alternatives that the whole family will love from snacks to staples.",
    price: "One-time Service",
    link: "Schedule",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Schedule",
  },
];

function Services() {
  const heroRef = useRef(null);
  const holisticRef = useScrollFade();
  const gridRef = useScrollFade(0.05);
  const ctaRef = useScrollFade();

  return (
    <div className="services-page">
      {/* HERO */}
      <section className="srv-hero" ref={heroRef}>
        <div className="srv-hero-left">
          <span className="srv-tag">OUR SERVICES</span>
          <h1>
            Services<br />
            <span>For Your Health</span>
          </h1>
          <p>
            Discover our range of professional services designed to help you
            achieve your nutritional goals and live a healthier, happier life.
          </p>
          <button className="srv-hero-btn">Book a Consultation</button>
        </div>
        <div className="srv-hero-right">
          <div className="srv-hero-img-circle">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Healthy food bowl"
            />
          </div>
        </div>
      </section>

      {/* HOLISTIC */}
      <section
        className="srv-holistic srv-scroll"
        ref={holisticRef}
        style={{ opacity: 0, transition: "opacity 0.75s ease, transform 0.75s ease", transform: "translateY(30px)" }}
      >
        <span className="srv-section-tag">WHAT WE OFFER</span>
        <h2>Holistic Wellness Solutions</h2>
        <p className="subtxt">
          We believe that healthy eating is more than just a diet — it's a life.
          We have compiled a suite of services to support you on every step of
          your journey.
        </p>
      </section>

      {/* CARDS GRID */}
      <div
        className="srv-grid srv-scroll"
        ref={gridRef}
        style={{
          padding: "0 8% 60px",
          opacity: 0,
          transition: "opacity 0.8s ease, transform 0.8s ease",
          transform: "translateY(30px)",
        }}
      >
        {services.map((s, i) => (
          <div
            className="srv-card"
            key={i}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="srv-card-img-wrap">
              <img src={s.img} alt={s.title} className="srv-card-img" />
              <div className="srv-card-bookmark">🔖</div>
            </div>
            <div className="srv-card-body">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="srv-card-footer">
                <span className="srv-card-price">{s.price}</span>
                <button className="srv-card-link">{s.link} →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section
        className="srv-cta srv-scroll"
        ref={ctaRef}
        style={{ opacity: 0, transition: "opacity 0.75s ease, transform 0.75s ease", transform: "translateY(30px)" }}
      >
        <h2>Ready to Transform Your Health?</h2>
        <p>
          Get started today with a complimentary 15-minute discovery call to
          find out which service is right for you.
        </p>
        <button className="srv-cta-btn">Get Started for Free</button>
      </section>
    </div>
  );
}

export default Services;

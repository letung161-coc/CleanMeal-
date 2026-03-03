import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";

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

const faqs = [
  {
    q: "Can I suggest a recipe?",
    a: "Absolutely! We love hearing from our community. You can submit your recipe ideas through our recipe submission portal. Our team of chefs reviews all submissions and we feature the best ones each week.",
  },
  {
    q: "Do you offer meal plans?",
    a: "Yes! We offer personalized meal plans tailored to your dietary goals, whether you're looking to lose weight, build muscle, or simply maintain a balanced diet. Check out our Services page for pricing.",
  },
  {
    q: "Are your recipes vegan friendly?",
    a: "Many of our recipes are vegan or can be easily adapted. We clearly label all recipes with dietary tags (Vegan, Gluten-Free, Dairy-Free, etc.) so you can filter to find what works best for you.",
  },
];

function Contact() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", topic: "General Inquiry", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const mainRef = useScrollFade();
  const mapRef = useScrollFade();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="contact-page">
      {/* HERO */}
      <div className="ct-hero">
        <div className="ct-hero-bg" />
        <div className="ct-hero-overlay" />
        <div className="ct-hero-content">
          <h1>Get in Touch</h1>
          <p>
            Have questions about our recipes, meal plans, or just want to say
            hello? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div
        className="ct-main ct-scroll"
        ref={mainRef}
        style={{ opacity: 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: "translateY(30px)" }}
      >
        {/* INFO PANEL */}
        <div className="ct-info">
          <h3>Contact Information</h3>
          <p className="ct-info-sub">
            Fill up the form and our team will get back to you within 24 hours.
          </p>

          <div className="ct-info-item">
            <div className="ct-info-icon">📞</div>
            <div className="ct-info-text">
              <strong>Phone</strong>
              <span>+1 (555) 123-4567</span>
            </div>
          </div>

          <div className="ct-info-item">
            <div className="ct-info-icon">✉️</div>
            <div className="ct-info-text">
              <strong>Email</strong>
              <span>hello@healthyfood.com</span>
            </div>
          </div>

          <div className="ct-info-item">
            <div className="ct-info-icon">📍</div>
            <div className="ct-info-text">
              <strong>Address</strong>
              <span>123 Green Avenue, Suite 400<br />San Francisco, CA 94107</span>
            </div>
          </div>

          <div className="ct-follow">
            <p>Follow Us</p>
            <div className="ct-socials">
              <button className="ct-social-btn" title="Twitter">𝕏</button>
              <button className="ct-social-btn" title="Instagram">◉</button>
              <button className="ct-social-btn" title="GitHub">⌥</button>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="ct-form-wrap">
          <h2>Send us a message</h2>

          {submitted && (
            <div className="ct-success">
              ✅ Your message has been sent! We'll get back to you within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="ct-form-row">
              <div className="ct-form-group">
                <label>First Name</label>
                <input name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} required />
              </div>
              <div className="ct-form-group">
                <label>Last Name</label>
                <input name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="ct-form-row">
              <div className="ct-form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="ct-form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="ct-form-group">
              <span className="ct-topic-label">Topic</span>
              <div className="ct-radios">
                {["General Inquiry", "Recipes", "Support"].map((t) => (
                  <label className="ct-radio-item" key={t}>
                    <input
                      type="radio"
                      name="topic"
                      value={t}
                      checked={form.topic === t}
                      onChange={handleChange}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div className="ct-form-group">
              <label>Message</label>
              <textarea name="message" placeholder="Write your message here..." value={form.message} onChange={handleChange} required />
            </div>

            <button type="submit" className="ct-submit-btn">
              Send Message →
            </button>
          </form>
        </div>
      </div>

      {/* MAP + FAQ */}
      <div
        className="ct-map-section ct-scroll"
        ref={mapRef}
        style={{ opacity: 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: "translateY(30px)" }}
      >
        {/* Map placeholder */}
        <div className="ct-map-wrap">
          <div className="ct-map-placeholder">
            <span className="ct-map-pin">📍</span>
            <div className="ct-map-badge">
              <span>📍</span> Our HQ · San Francisco, CA
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="ct-faq">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <div className={`ct-faq-item ${openFaq === i ? "open" : ""}`} key={i}>
              <div className="ct-faq-question" onClick={() => toggleFaq(i)}>
                {f.q}
                <span className="ct-faq-chevron">▼</span>
              </div>
              <div className="ct-faq-answer">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;

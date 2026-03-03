import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard';
import { recipeAPI, categoryAPI } from '../../../api';
import './Home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipeRes, catRes] = await Promise.all([
          recipeAPI.getAll(1, 6),
          categoryAPI.getAll()
        ]);
        if (recipeRes?.data) setRecipes(recipeRes.data.recipes || []);
        if (catRes?.data) setCategories(catRes.data);
      } catch (error) {
        console.error("Home Data Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* ── HERO SECTION ── */}
      <section className="hero-section">
        <div className="hero-bg-pattern"></div>
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-subtitle float-anim">100% Nutritious & Delicious 🥗</span>
            <h1 className="hero-title heading-serif">
              Healthy Eating, <br />
              <span className="gradient-text">Made Simple.</span>
            </h1>
            <p className="hero-desc">
              Discover chef-crafted recipes tailored to your healthy lifestyle. 
              High protein, low carb, or balanced – we have it all.
            </p>
            <div className="hero-actions">
              <Link to="/recipes" className="btn btn-primary pulse-glow">
                Explore Recipes
              </Link>
              <Link to="/videos" className="btn btn-outline">
                Watch Cooking Videos
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" alt="Healthy Salad Bowl" />
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES (PILLS) ── */}
      <section className="categories-section container fade-in" style={{ marginTop: 'var(--space-2xl)' }}>
        <div className="section-header">
          <h2>Browse by Category</h2>
        </div>
        <div className="category-pills">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.CategoryID}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={`/recipes?category=${cat.Slug}`} className="category-pill shadow-sm card-lift">
                {cat.Name}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURED RECIPES ── */}
      <section className="recipes-section container" style={{ marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-3xl)' }}>
        <div className="section-header">
          <h2>Featured Recipes</h2>
          <Link to="/recipes" className="btn btn-ghost">View All &rarr;</Link>
        </div>
        
        {loading ? (
          <div className="recipe-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '350px', borderRadius: 'var(--radius-lg)' }}></div>
            ))}
          </div>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe, idx) => (
              <RecipeCard key={recipe.RecipeID} recipe={recipe} index={idx} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
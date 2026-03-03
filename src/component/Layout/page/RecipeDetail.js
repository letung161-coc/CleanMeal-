import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaFireAlt, FaUtensils, FaDumbbell, FaBreadSlice, FaLeaf, FaPlayCircle } from 'react-icons/fa';
import { recipeAPI } from '../../../api';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await recipeAPI.getById(id);
        if (res?.data) {
          setRecipe(res.data);
        }
      } catch (err) {
        console.error("Recipe detail error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-lg)' }}></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container empty-state" style={{ marginTop: '120px' }}>
        <div className="empty-icon">😟</div>
        <h2>Recipe Not Found</h2>
        <Link to="/recipes" className="btn btn-primary mt-3">Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      {/* HEADER BANNER */}
      <div className="recipe-header">
        <div className="recipe-header-bg" style={{ backgroundImage: `url(${recipe.ImageURL})` }}></div>
        <div className="recipe-header-overlay"></div>
        <div className="container recipe-header-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="header-text"
          >
            {recipe.CategoryName && <span className="badge badge-green mb-3">{recipe.CategoryName}</span>}
            <h1 className="heading-serif">{recipe.Title}</h1>
            <p className="lead">{recipe.Description}</p>

            <div className="header-meta">
              <div className="meta-item">
                <FaClock />
                <div>
                  <span className="meta-label">Total Time</span>
                  <span className="meta-val">{recipe.PrepTime + recipe.CookTime} mins</span>
                </div>
              </div>
              <div className="meta-item">
                <FaUtensils />
                <div>
                  <span className="meta-label">Yields</span>
                  <span className="meta-val">{recipe.Servings} Servings</span>
                </div>
              </div>
              <div className="meta-item">
                <FaFireAlt />
                <div>
                  <span className="meta-label">Calories</span>
                  <span className="meta-val">{recipe.Calories} kcal</span>
                </div>
              </div>
            </div>

            {recipe.VideoLink && (
              <a href={recipe.VideoLink} target="_blank" rel="noreferrer" className="btn btn-accent mt-4">
                <FaPlayCircle /> Watch Video
              </a>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container detail-container">
        <div className="detail-layout">
          {/* MAIN CONTENT (TABS) */}
          <main className="detail-main">
            <div className="detail-tabs">
              <button 
                className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
              <button 
                className={`tab-btn ${activeTab === 'steps' ? 'active' : ''}`}
                onClick={() => setActiveTab('steps')}
              >
                Instructions
              </button>
            </div>

            <motion.div 
              className="tab-content"
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'ingredients' && (
                <div className="ingredients-sec">
                  <h3 className="section-title">What you'll need</h3>
                  <ul className="ingredient-list">
                    {recipe.ingredients?.length > 0 ? (
                      recipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="ingredient-item">
                          <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            <span className="ingredient-text">
                              <strong>{ing.Quantity} {ing.Unit}</strong> {ing.Name}
                            </span>
                          </label>
                        </li>
                      ))
                    ) : (
                      <p className="text-muted">No ingredients specified.</p>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === 'steps' && (
                <div className="steps-sec">
                  <h3 className="section-title">Step-by-Step</h3>
                  <div className="step-list">
                    {recipe.steps?.length > 0 ? (
                      recipe.steps.map((step) => (
                        <div key={step.StepNumber} className="step-item">
                          <div className="step-number">{step.StepNumber}</div>
                          <div className="step-text">
                            <p>{step.Instruction}</p>
                            {step.ImageURL && (
                              <img src={step.ImageURL} alt={`Step ${step.StepNumber}`} className="step-img" />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No instructions provided.</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </main>

          {/* SIDEBAR NUTRITION */}
          <aside className="detail-sidebar">
            <div className="nutrition-card shadow-md">
              <h3 className="section-title">Nutrition Facts</h3>
              <p className="text-muted mb-4" style={{ fontSize: '0.8rem' }}>Per serving</p>
              
              <div className="nutrition-grid">
                <div className="nut-item highlight">
                  <span className="nut-val">{recipe.Calories}</span>
                  <span className="nut-label">Calories</span>
                </div>
                <div className="nut-item">
                  <FaDumbbell className="nut-icon" />
                  <span className="nut-val">{recipe.Protein}g</span>
                  <span className="nut-label">Protein</span>
                </div>
                <div className="nut-item">
                  <FaBreadSlice className="nut-icon" />
                  <span className="nut-val">{recipe.Carbs}g</span>
                  <span className="nut-label">Carbs</span>
                </div>
                <div className="nut-item">
                  <FaLeaf className="nut-icon" />
                  <span className="nut-val">{recipe.Fat}g</span>
                  <span className="nut-label">Fat</span>
                </div>
              </div>
              <div className="nut-item full-width mt-3">
                  <span className="nut-val text-sm">{recipe.Fiber}g Fiber</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;

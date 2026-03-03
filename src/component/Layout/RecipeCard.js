import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaFireAlt, FaUtensils } from 'react-icons/fa';
import './RecipeCard.css';

function RecipeCard({ recipe, index }) {
  return (
    <motion.div 
      className="recipe-card card-lift"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/recipe/${recipe.RecipeID}`}>
        <div className="recipe-card-img img-zoom">
          <img src={recipe.ImageURL || 'https://via.placeholder.com/400x300?text=No+Image'} alt={recipe.Title} />
          <div className="recipe-card-badges">
            {recipe.CategoryName && (
              <span className="badge badge-green">{recipe.CategoryName}</span>
            )}
            {recipe.Difficulty && (
              <span className={`badge ${recipe.Difficulty === 'Easy' ? 'badge-blue' : recipe.Difficulty === 'Hard' ? 'badge-orange' : 'badge-purple'}`}>
                {recipe.Difficulty}
              </span>
            )}
          </div>
        </div>
        
        <div className="recipe-card-content">
          <h3 className="recipe-card-title">{recipe.Title}</h3>
          <p className="recipe-card-desc">{recipe.Description?.length > 80 ? recipe.Description.substring(0, 80) + '...' : recipe.Description}</p>
          
          <div className="recipe-card-meta">
            <span><FaClock /> {recipe.PrepTime + recipe.CookTime}m</span>
            <span><FaFireAlt /> {recipe.Calories} kcal</span>
            <span><FaUtensils /> {recipe.Protein}g protein</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default RecipeCard;

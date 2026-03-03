import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import RecipeCard from '../RecipeCard';
import { recipeAPI, categoryAPI } from '../../../api';
import './RecipeCatalog.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function RecipeCatalog() {
  const query = useQuery();
  const navigate = useNavigate();
  
  const initialCategory = query.get('category') || '';
  const initialKeyword = query.get('q') || '';
  const initialPage = parseInt(query.get('page')) || 1;

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filters State
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [page, setPage] = useState(initialPage);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchRecipes();
    // Update URL
    const searchParams = new URLSearchParams();
    if (keyword) searchParams.set('q', keyword);
    if (selectedCategory) searchParams.set('category', selectedCategory);
    if (page > 1) searchParams.set('page', page);
    navigate(`/recipes?${searchParams.toString()}`, { replace: true });
  }, [keyword, selectedCategory, minCalories, maxCalories, page]);

  const fetchCategories = async () => {
    try {
      const res = await categoryAPI.getAll();
      if (res?.data) setCategories(res.data);
    } catch (err) {
      console.error("Categories fetch error:", err);
    }
  };

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const isSearch = keyword || selectedCategory || minCalories || maxCalories;
      const res = isSearch 
        ? await recipeAPI.search(keyword, selectedCategory, minCalories || null, maxCalories || null, page)
        : await recipeAPI.getAll(page, 12);
      
      if (res?.data) {
        setRecipes(res.data.recipes || []);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.error("Recipes fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset page on new search
  };

  const handleClearFilters = () => {
    setKeyword('');
    setSelectedCategory('');
    setMinCalories('');
    setMaxCalories('');
    setPage(1);
  };

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="heading-serif fade-in">Explore Recipes</h1>
          <p className="fade-in" style={{ animationDelay: '0.1s' }}>Find the perfect healthy meal for your day.</p>
        </div>
      </div>

      <div className="container catalog-container">
        {/* Mobile Filter Toggle */}
        <button className="btn btn-outline mobile-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="catalog-layout">
          {/* SIDEBAR FILTERS */}
          <aside className={`catalog-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="sidebar-widget">
              <h3>Search</h3>
              <form onSubmit={handleSearchSubmit} className="search-box">
                <input 
                  type="text" 
                  placeholder="E.g., Chicken Salad..." 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit"><FaSearch /></button>
              </form>
            </div>

            <div className="sidebar-widget">
              <h3>Categories</h3>
              <div className="filter-list">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="category" 
                    value="" 
                    checked={selectedCategory === ''} 
                    onChange={() => { setSelectedCategory(''); setPage(1); }}
                  />
                  <span>All Recipes</span>
                </label>
                {categories.map(cat => (
                  <label key={cat.CategoryID} className="radio-label">
                    <input 
                      type="radio" 
                      name="category" 
                      value={cat.Slug} 
                      checked={selectedCategory === cat.Slug}
                      onChange={() => { setSelectedCategory(cat.Slug); setPage(1); }}
                    />
                    <span>{cat.Name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <h3>Calories</h3>
              <div className="range-inputs">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={minCalories}
                  onChange={(e) => { setMinCalories(e.target.value); setPage(1); }}
                />
                <span>-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={maxCalories}
                  onChange={(e) => { setMaxCalories(e.target.value); setPage(1); }}
                />
              </div>
            </div>

            {(keyword || selectedCategory || minCalories || maxCalories) && (
              <button className="btn btn-ghost w-full" style={{ marginTop: '16px', width: '100%' }} onClick={handleClearFilters}>
                <FaTimes /> Clear All Filters
              </button>
            )}
          </aside>

          {/* MAIN GRID */}
          <main className="catalog-main">
            <div className="catalog-results-info">
              {loading ? (
                <span>Loading recipes...</span>
              ) : (
                <span>Showing {recipes.length} recipes</span>
              )}
            </div>

            {loading ? (
              <div className="recipe-grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: '350px', borderRadius: 'var(--radius-lg)' }}></div>
                ))}
              </div>
            ) : recipes.length > 0 ? (
              <>
                <div className="recipe-grid">
                  <AnimatePresence>
                    {recipes.map((recipe, idx) => (
                      <RecipeCard key={recipe.RecipeID} recipe={recipe} index={idx} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      className="btn btn-outline" 
                      disabled={page === 1}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                      &larr; Prev
                    </button>
                    <span className="page-info">Page {page} of {totalPages}</span>
                    <button 
                      className="btn btn-outline" 
                      disabled={page === totalPages}
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    >
                      Next &rarr;
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🍽️</div>
                <h3>No recipes found</h3>
                <p className="text-muted">Try adjusting your filters or search keywords.</p>
                <button className="btn btn-primary mt-3" onClick={handleClearFilters}>Clear Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default RecipeCatalog;

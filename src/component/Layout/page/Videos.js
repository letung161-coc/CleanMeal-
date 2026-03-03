import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { videoAPI, categoryAPI } from '../../../api';
import './Videos.css';
import { FaPlay } from 'react-icons/fa';

function Videos() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [vRes, cRes] = await Promise.all([
          videoAPI.getAll(),
          categoryAPI.getAll()
        ]);
        if (vRes?.data) setVideos(vRes.data);
        if (cRes?.data) setCategories(cRes.data);
      } catch (err) {
        console.error("Video fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(v => v.CategoryID === activeCategory);

  return (
    <div className="videos-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="heading-serif fade-in">Cooking Masterclass</h1>
          <p className="fade-in" style={{ animationDelay: '0.1s' }}>Watch, learn, and cook like a pro.</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 'var(--space-3xl)' }}>
        {/* Category Filter */}
        <div className="video-filters" style={{ marginBottom: 'var(--space-2xl)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${activeCategory === 'All' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveCategory('All')}
          >
            All Videos
          </button>
          {categories.map(cat => (
            <button
              key={cat.CategoryID}
              className={`btn ${activeCategory === cat.CategoryID ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory(cat.CategoryID)}
            >
              {cat.Name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="video-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '240px', borderRadius: 'var(--radius-lg)' }}></div>
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="video-grid">
            <AnimatePresence>
              {filteredVideos.map((vid, idx) => (
                <motion.div 
                  key={vid.VideoID}
                  className="video-card card-lift"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <a href={vid.YouTubeLink} target="_blank" rel="noreferrer" className="video-thumb-link">
                    <div className="video-thumb">
                      <img src={vid.Thumbnail || 'https://via.placeholder.com/400x225?text=No+Thumbnail'} alt={vid.Title} />
                      <div className="play-overlay">
                        <FaPlay className="play-icon" />
                      </div>
                      <span className="duration-badge">{vid.Duration} min</span>
                    </div>
                    <div className="video-info">
                      <span className="badge badge-blue mb-2">{vid.CategoryName || 'General'}</span>
                      <h3 className="video-title">{vid.Title}</h3>
                      <p className="text-muted text-sm">{vid.Description?.substring(0,60)}...</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="empty-state">
             <div className="empty-icon">🎥</div>
             <h3>No videos found</h3>
             <p className="text-muted">Stay tuned for more culinary content.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Videos;

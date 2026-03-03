import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Favorites() {
  return (
    <motion.div 
      className="container page-enter"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}
    >
      <div className="empty-state" style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl)' }}>
        <div className="empty-icon" style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>❤️</div>
        <h1 className="heading-serif">Your Favorites</h1>
        <p className="text-muted" style={{ margin: 'var(--space-md) 0 var(--space-xl)' }}>
          You haven't saved any recipes yet! Start exploring our nutritious catalog and click the heart icon to save your favorites here.
        </p>
        <Link to="/recipes" className="btn btn-primary pulse-glow">Explore Recipes</Link>
      </div>
    </motion.div>
  );
}

export default Favorites;

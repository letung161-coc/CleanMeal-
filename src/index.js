import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './component/ErrorBoundary';

// ── Lazy-loaded route pages ──
const Home = lazy(() => import('./component/Layout/page/Home'));
const RecipeCatalog = lazy(() => import('./component/Layout/page/RecipeCatalog'));
const RecipeDetail = lazy(() => import('./component/Layout/page/RecipeDetail'));
const Favorites = lazy(() => import('./component/Layout/page/Favorites'));
const Videos = lazy(() => import('./component/Layout/page/Videos'));

// ── Suspense fallback ──
const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '60vh', fontFamily: "'Inter', sans-serif", color: '#81c784'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 48, height: 48, border: '4px solid #f4f5f4',
        borderTopColor: '#81c784', borderRadius: '50%',
        animation: 'spin .8s linear infinite', margin: '0 auto 16px'
      }} />
      <p style={{ fontWeight: 500 }}>Loading Fresh Flavors...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route index path='/' element={<Home />} />
              <Route path='/recipes' element={<RecipeCatalog />} />
              <Route path='/recipe/:id' element={<RecipeDetail />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/videos' element={<Videos />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

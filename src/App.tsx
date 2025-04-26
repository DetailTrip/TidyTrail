import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Lazy load only the pages that actually exist
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CommercialPage = lazy(() => import('./pages/CommercialPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

/**
 * Main application component that handles routing and layout
 * - Header and Footer are rendered on all pages
 * - Routes are lazy-loaded for performance optimization
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/commercial" element={<CommercialPage />} />
            {/* Remove AboutUsPage and ContactPage routes since they don't exist yet */}
            <Route path="*" element={<div className="container py-20 text-center">Page not found</div>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
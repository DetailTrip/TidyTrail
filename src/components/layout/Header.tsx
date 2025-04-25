import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Header component with responsive navigation
 * - Implements mobile hamburger menu
 * - Uses active link highlighting
 * - Includes scroll behavior for transparent to solid background
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Close menu when route changes or on larger screens
  const closeMenu = () => setIsMenuOpen(false);
  
  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Residential' },
    { path: '/commercial', label: 'Commercial' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <span className={`text-2xl md:text-3xl font-display font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>
            TidyTrails
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `font-display font-semibold text-lg transition-colors ${
                  isActive 
                    ? 'text-accent' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-primary' 
                      : 'text-white hover:text-accent'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a 
            href="tel:+17058574321" 
            className="btn btn-primary ml-2"
          >
            Get a Quote
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke={isScrolled ? 'currentColor' : 'white'} 
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 left-0 bg-white shadow-md md:hidden animate-fade-in">
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <NavLink 
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => 
                      `font-display py-2 border-b border-gray-100 ${
                        isActive ? 'text-primary font-bold' : 'text-gray-700'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <a 
                  href="tel:+17058574321" 
                  className="btn btn-primary text-center mt-4"
                  onClick={closeMenu}
                >
                  Get a Quote
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
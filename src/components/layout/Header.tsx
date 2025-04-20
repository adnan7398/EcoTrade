import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Leaf } from 'lucide-react';
import { useAuthStore } from '../../store';
import { useCartStore } from '../../store';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-semibold text-primary-800">EcoTrade</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition duration-200 ${
                isActive('/') 
                  ? 'text-primary-700 border-b-2 border-primary-500 pb-1' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium transition duration-200 ${
                isActive('/products') 
                  ? 'text-primary-700 border-b-2 border-primary-500 pb-1' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/leaderboard" 
              className={`font-medium transition duration-200 ${
                isActive('/leaderboard') 
                  ? 'text-primary-700 border-b-2 border-primary-500 pb-1' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Leaderboard
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition duration-200 ${
                isActive('/about') 
                  ? 'text-primary-700 border-b-2 border-primary-500 pb-1' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              About
            </Link>
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-neutral-100 rounded-full transition">
              <ShoppingCart className="h-6 w-6 text-neutral-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-primary-600 text-white text-xs rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            {/* User */}
            {user ? (
              <Link to="/profile" className="p-2 hover:bg-neutral-100 rounded-full transition">
                <User className="h-6 w-6 text-neutral-700" />
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary hidden md:block">
                Sign In
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 hover:bg-neutral-100 rounded-full transition"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-neutral-700" />
              ) : (
                <Menu className="h-6 w-6 text-neutral-700" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-4 animate-fade-in">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block py-2 ${
                    isActive('/') 
                      ? 'text-primary-700 font-medium' 
                      : 'text-neutral-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className={`block py-2 ${
                    isActive('/products') 
                      ? 'text-primary-700 font-medium' 
                      : 'text-neutral-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/leaderboard" 
                  className={`block py-2 ${
                    isActive('/leaderboard') 
                      ? 'text-primary-700 font-medium' 
                      : 'text-neutral-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`block py-2 ${
                    isActive('/about') 
                      ? 'text-primary-700 font-medium' 
                      : 'text-neutral-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              {!user && (
                <li>
                  <Link 
                    to="/login" 
                    className="block py-2 text-primary-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
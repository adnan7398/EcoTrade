import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-semibold">EcoTrade</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Promoting sustainable shopping with transparency on environmental impact.
              Together, we can make a difference.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-neutral-400 hover:text-primary-400 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-neutral-400 hover:text-primary-400 transition">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-primary-400 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=Furniture" className="text-neutral-400 hover:text-primary-400 transition">
                  Recycled Furniture
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fashion" className="text-neutral-400 hover:text-primary-400 transition">
                  Sustainable Fashion
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home Decor" className="text-neutral-400 hover:text-primary-400 transition">
                  Eco Home Decor
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-neutral-400 hover:text-primary-400 transition">
                  Refurbished Electronics
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Stay Updated</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Subscribe to receive updates on new products and sustainability tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-neutral-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm flex-grow"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} EcoTrade. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-neutral-500 hover:text-primary-400 text-sm transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-500 hover:text-primary-400 text-sm transition">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-neutral-500 hover:text-primary-400 text-sm transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
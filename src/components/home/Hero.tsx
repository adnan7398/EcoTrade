import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';


// hero section made here
const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80 z-10"></div>
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Sustainable living" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container-custom relative z-20 py-20 md:py-32">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Leaf className="h-5 w-5 text-accent-400" />
            <span className="text-sm font-medium">Shop sustainably, save the planet</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-slide-up">
            Sustainable Shopping <br />
            <span className="text-accent-400">with Transparency</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Discover recycled and upcycled products with full carbon footprint transparency. Every purchase helps reduce environmental impact.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link 
              to="/products" 
              className="btn bg-white text-primary-800 hover:bg-white/90 font-medium px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="btn bg-transparent border border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-md transition flex items-center"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
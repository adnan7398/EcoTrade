import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Info, LeafIcon } from 'lucide-react';
import { Product } from '../../types';
import CarbonFootprintBadge from '../common/CarbonFootprintBadge';
import { useCartStore } from '../../store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <div className="flip-card h-full">
      <div className="flip-card-inner h-full relative">
        {/* Front Side */}
        <div className="flip-card-front h-full card group">
          <div className="relative overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
            />
            
            {/* Sustainability Badge */}
            <div className="absolute top-2 right-2 bg-primary-50 border border-primary-100 rounded-full px-2 py-1 flex items-center">
              <LeafIcon className="h-4 w-4 text-primary-600 mr-1" />
              <span className="text-xs font-medium text-primary-800">
                {product.sustainabilityScore}% Eco
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-neutral-500 text-sm mb-2 line-clamp-2">{product.description}</p>
            
            {/* Sustainability Metric */}
            <div className="flex items-center mb-3 text-xs text-primary-700 bg-primary-50 px-2 py-1 rounded-md w-fit">
              <span>Saves {product.carbonFootprint} kg CO2e</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
              <div className="flex space-x-2">
                <button 
                  className="btn btn-outline p-2 rounded-full"
                  onClick={handleAddToCart}
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-2 right-2">
            <div className="text-sm text-neutral-500 flex items-center">
              <Info size={16} className="mr-1" />
              <span>Hover for details</span>
            </div>
          </div>
        </div>
        
        {/* Back Side */}
        <div className="flip-card-back h-full absolute w-full top-0 left-0 card p-4 flex flex-col">
          <h3 className="font-medium text-lg mb-2">{product.name}</h3>
          
          <div className="space-y-4 flex-1">
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-1">Materials</h4>
              <div className="flex flex-wrap gap-1">
                {product.materials.map((material, index) => (
                  <span key={index} className="bg-secondary-50 text-secondary-700 text-xs px-2 py-0.5 rounded-full">
                    {material}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-1">Environmental Impact</h4>
              <div className="flex items-center">
                <CarbonFootprintBadge value={product.carbonFootprint} showText={true} />
                <div className="ml-2 text-xs text-primary-700">
                  Saves {product.carbonFootprint} kg CO2e
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-1">Sustainability Score</h4>
              <div className="carbon-indicator">
                <div 
                  className={`carbon-indicator-fill ${
                    product.sustainabilityScore > 70 ? 'low' : 
                    product.sustainabilityScore > 40 ? 'medium' : 'high'
                  }`}
                  style={{ width: `${product.sustainabilityScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>0</span>
                <span className="font-medium">{product.sustainabilityScore}/100</span>
                <span>100</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-4 flex space-x-2">
            <Link to={`/products/${product.id}`} className="btn btn-primary flex-1 justify-center">
              View Details
            </Link>
            <button 
              className="btn btn-outline flex-1 justify-center"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import ProductCard from '../product/ProductCard';
import { firestore } from '../../services/firebase';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featuredProducts = await firestore.products.getFeatured();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Featured Products</h2>
            <p className="text-neutral-600 max-w-2xl">
              Discover our curated selection of sustainable products with the lowest environmental impact.
            </p>
          </div>
          
          <Link 
            to="/products" 
            className="mt-4 md:mt-0 flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="card h-96 animate-pulse">
                <div className="h-64 bg-neutral-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
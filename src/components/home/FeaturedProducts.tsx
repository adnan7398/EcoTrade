import React, { useEffect, useState } from 'react';
import { ArrowRight, LeafIcon, RefreshCw, Zap } from 'lucide-react';
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
            <div className="flex items-center gap-2 mb-2">
              <LeafIcon className="h-6 w-6 text-primary-600" />
              <h2 className="text-2xl md:text-3xl font-semibold">Sustainable Products</h2>
            </div>
            <p className="text-neutral-600 max-w-2xl">
              Each product is carefully selected for its minimal environmental impact, 
              using recycled materials and sustainable production methods.
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

        {/* Sustainability Impact Banner */}
        <div className="bg-primary-50 border border-primary-100 rounded-lg p-5 mb-8">
          <h3 className="font-medium text-primary-800 text-lg mb-4">Why Shop Sustainable?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-primary-100 rounded-full p-2.5 mr-3 mt-1">
                <Zap className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-primary-700 mb-1">Reduced Carbon Footprint</h4>
                <p className="text-sm text-primary-600">Our products save an average of 10kg CO2e compared to conventional alternatives.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary-100 rounded-full p-2.5 mr-3 mt-1">
                <RefreshCw className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-primary-700 mb-1">Circular Economy</h4>
                <p className="text-sm text-primary-600">By upcycling and recycling materials, we extend product lifecycles and reduce waste.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary-100 rounded-full p-2.5 mr-3 mt-1">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-primary-700 mb-1">Ethical Production</h4>
                <p className="text-sm text-primary-600">We support fair labor practices and collaborate with small-scale artisans.</p>
              </div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(5)].map((_, index) => (
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                to="/products" 
                className="btn btn-primary inline-flex items-center"
              >
                Shop All Sustainable Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <p className="mt-2 text-sm text-neutral-500">
                Free shipping on orders over $75 • Carbon-neutral delivery
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
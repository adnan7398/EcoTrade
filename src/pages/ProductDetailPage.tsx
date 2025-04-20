import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Truck, Package, Leaf, Info, Check, Star, History } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store';
import { firestore } from '../services/firebase';
import CarbonFootprintBadge from '../components/common/CarbonFootprintBadge';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCartStore();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await firestore.products.getById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-sm p-8 animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-neutral-200 rounded-lg h-96"></div>
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="w-24 h-24 bg-neutral-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-10 bg-neutral-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-neutral-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-2 mb-8">
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                </div>
                <div className="h-8 bg-neutral-200 rounded w-1/3 mb-6"></div>
                <div className="h-12 bg-neutral-200 rounded w-full mb-4"></div>
                <div className="h-12 bg-neutral-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
            <p className="text-neutral-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-custom">
        <Link to="/products" className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Products
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="p-6 lg:p-8">
              <div className="rounded-lg overflow-hidden bg-neutral-100 mb-4 relative">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover object-center"
                />
                <div className="absolute top-4 right-4">
                  <CarbonFootprintBadge value={product.carbonFootprint} size="lg" />
                </div>
              </div>
              
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-24 h-24 rounded-md overflow-hidden bg-neutral-100 border-2 flex-shrink-0 
                      ${selectedImage === index ? 'border-primary-500' : 'border-transparent hover:border-primary-200'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-neutral-100">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index} 
                      className={`h-5 w-5 ${index < 4 ? 'fill-accent-500 text-accent-500' : 'text-neutral-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-neutral-600 text-sm">36 reviews</span>
              </div>
              
              <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
              
              <div className="mb-6">
                <h2 className="font-medium mb-2">Description</h2>
                <p className="text-neutral-600">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="font-medium mb-2">Materials</h2>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, index) => (
                    <span 
                      key={index}
                      className="bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="font-medium mb-2">Environmental Impact</h2>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-start mb-4">
                    <Leaf className="h-5 w-5 text-success-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Sustainability Score</h3>
                      <div className="carbon-indicator mt-2">
                        <div 
                          className={`carbon-indicator-fill ${
                            product.sustainabilityScore > 70 ? 'low' : 
                            product.sustainabilityScore > 40 ? 'medium' : 'high'
                          }`}
                          style={{ width: `${product.sustainabilityScore}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Low</span>
                        <span className="font-medium">{product.sustainabilityScore}/100</span>
                        <span>High</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-neutral-600 flex">
                    <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5 text-primary-500" />
                    <p>
                      This product has {
                        product.carbonFootprint < 10 ? 'a low' : 
                        product.carbonFootprint < 30 ? 'a medium' : 'a high'
                      } carbon footprint of {product.carbonFootprint.toFixed(1)} kg CO₂. This is {
                        product.carbonFootprint < 10 ? '60% lower' : 
                        product.carbonFootprint < 30 ? '30% lower' : '10% lower'
                      } than similar non-recycled products.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-primary-600 mr-2" />
                    <span>Free shipping</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-primary-600 mr-2" />
                    <span>Eco-friendly packaging</span>
                  </div>
                  <div className="flex items-center">
                    <History className="h-5 w-5 text-primary-600 mr-2" />
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto space-y-4">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="mr-4 font-medium">Quantity</label>
                  <div className="flex items-center border border-neutral-200 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-neutral-600 hover:text-primary-600"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-neutral-600 hover:text-primary-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary w-full py-3 flex items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                  
                  {showSuccess && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary-600 rounded-md animate-fade-in">
                      <div className="flex items-center text-white">
                        <Check className="h-5 w-5 mr-2" />
                        Added to Cart!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
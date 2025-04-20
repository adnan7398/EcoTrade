import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, AlertTriangle, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store';
import CarbonFootprintBadge from '../components/common/CarbonFootprintBadge';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalAmount, getTotalCarbonFootprint } = useCartStore();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    setIsApplying(true);
    
   
    setTimeout(() => {
      setIsApplying(false);
      setCouponCode('');
      alert('Coupon applied successfully!'); // Simulate coupon application
      // In a real application, you would validate the coupon code here 
    }, 1000);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  // Calculate traditional shopping carbon footprint (for comparison)
  const traditionalCarbonFootprint = getTotalCarbonFootprint() * 2.5;
  const carbonSavings = traditionalCarbonFootprint - getTotalCarbonFootprint();
  const savingsPercentage = (carbonSavings / traditionalCarbonFootprint) * 100;
  
  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Your Cart</h1>
        <p className="text-neutral-600 mb-8">Review your items and proceed to checkout.</p>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-neutral-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-6">
              Looks like you haven't added any sustainable products to your cart yet.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100">
                  <h2 className="text-lg font-semibold">Cart Items ({items.length})</h2>
                </div>
                
                <div>
                  {items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex flex-col md:flex-row border-b border-neutral-100 p-4 md:p-6 last:border-b-0 hover:bg-neutral-50 transition"
                    >
                      {/* Product Image */}
                      <div className="w-full md:w-32 h-32 mb-4 md:mb-0 mr-0 md:mr-6 rounded-md overflow-hidden bg-neutral-100">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-lg mb-1">
                              {item.product.name}
                            </h3>
                            <div className="flex items-center mb-2">
                              <CarbonFootprintBadge 
                                value={item.product.carbonFootprint} 
                                showText={false}
                                size="sm"
                              />
                              <span className="text-xs text-neutral-500 ml-2">
                                Total: {(item.product.carbonFootprint * item.quantity).toFixed(1)} kg CO₂
                              </span>
                            </div>
                          </div>
                          <span className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between mt-2 gap-4">
                          <div className="flex items-center border border-neutral-200 rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-2 text-neutral-600 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="p-2 text-neutral-600 hover:text-primary-600"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-neutral-500 hover:text-error-600 flex items-center text-sm"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">${getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax</span>
                    <span className="font-medium">${(getTotalAmount() * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-3 my-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(getTotalAmount() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Carbon Impact Summary */}
                <div className="bg-primary-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium mb-3 text-primary-800">Environmental Impact</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-neutral-600">Your Order</span>
                        <span className="text-success-700 font-medium">
                          {getTotalCarbonFootprint().toFixed(1)} kg CO₂
                        </span>
                      </div>
                      <div className="carbon-indicator">
                        <div className="carbon-indicator-fill low" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-neutral-600">Traditional Shopping</span>
                        <span className="text-error-700 font-medium">
                          {traditionalCarbonFootprint.toFixed(1)} kg CO₂
                        </span>
                      </div>
                      <div className="carbon-indicator">
                        <div className="carbon-indicator-fill high" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-success-100 text-success-800 p-3 rounded-md text-sm flex">
                      <div className="mr-2 flex-shrink-0">🌱</div>
                      <div>
                        <strong>You're saving {savingsPercentage.toFixed(0)}%</strong> in carbon emissions compared to traditional shopping. That's equivalent to planting {Math.max(1, Math.round(carbonSavings / 10))} trees!
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Coupon */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="input flex-1"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button 
                      className="btn btn-outline"
                      onClick={handleApplyCoupon}
                      disabled={isApplying || !couponCode.trim()}
                    >
                      {isApplying ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                </div>
                
                <button
                  className="btn btn-primary w-full mb-3 flex items-center justify-center"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                
                <div className="flex items-start mt-4 text-sm text-neutral-600">
                  <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-warning-500" />
                  <p>
                    Orders will be processed securely using Razorpay. Your carbon savings will be added to your profile after purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
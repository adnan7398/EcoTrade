import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Package, CheckCircle, AlertTriangle, Leaf } from 'lucide-react';
import { useCartStore } from '../store';
import { useAuthStore } from '../store';
import { firestore, payment } from '../services/firebase';
import { Address, OrderStatus } from '../types';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getTotalAmount, getTotalCarbonFootprint, clearCart } = useCartStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [shippingAddress, setShippingAddress] = useState<Address>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const handleShippingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };
  
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShippingAddress({ ...shippingAddress, country: e.target.value });
  };
  
  const validateShippingAddress = () => {
    return (
      shippingAddress.line1 &&
      shippingAddress.city &&
      shippingAddress.state &&
      shippingAddress.postalCode &&
      shippingAddress.country
    );
  };
  
  const validatePaymentDetails = () => {
    if (paymentMethod === 'card') {
      return (
        cardDetails.cardNumber.replace(/\s/g, '').length === 16 &&
        cardDetails.cardholderName &&
        cardDetails.expiryDate &&
        cardDetails.cvv.length === 3
      );
    }
    return true;
  };
  
  const handleNextStep = () => {
    if (currentStep === 1 && validateShippingAddress()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validatePaymentDetails()) {
      processPayment();
    }
  };
  
  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const processPayment = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setPaymentProcessing(true);
    
    try {
      // Simulate Razorpay payment processing
      const paymentResult = await payment.createOrder(getTotalAmount() * 100);
      
      // Create order in database
      const newOrder = await firestore.orders.create({
        userId: user.id,
        items,
        totalAmount: getTotalAmount(),
        totalCarbonFootprint: getTotalCarbonFootprint(),
        paymentId: paymentResult.id,
        status: OrderStatus.PAID,
        shippingAddress,
        createdAt: new Date(),
      });
      
      setOrderId(newOrder.id);
      setOrderCompleted(true);
      clearCart();
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setPaymentProcessing(false);
    }
  };
  
  if (items.length === 0 && !orderCompleted) {
    navigate('/cart');
    return null;
  }
  
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success-600" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-neutral-600 mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            
            <div className="bg-primary-50 rounded-lg p-6 text-left mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Leaf className="h-5 w-5 text-primary-600 mr-2" />
                Your Environmental Impact
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-neutral-700 mb-1">You saved:</p>
                  <p className="text-2xl font-bold text-success-600">
                    {(getTotalCarbonFootprint() * 1.5).toFixed(1)} kg CO₂
                  </p>
                  <p className="text-sm text-neutral-500">
                    Compared to purchasing non-recycled alternatives
                  </p>
                </div>
                
                <div className="carbon-indicator">
                  <div className="carbon-indicator-fill low" style={{ width: '60%' }}></div>
                </div>
                
                <p className="text-sm text-neutral-600">
                  That's equivalent to planting {Math.max(1, Math.round(getTotalCarbonFootprint() / 10))} trees or driving {Math.round(getTotalCarbonFootprint() * 6)} fewer kilometers in an average car.
                </p>
              </div>
            </div>
            
            <div className="text-left border-t border-neutral-200 pt-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Order Number:</span>
                  <span className="font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Total Amount:</span>
                  <span className="font-medium">${getTotalAmount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Carbon Footprint:</span>
                  <span className="font-medium">{getTotalCarbonFootprint().toFixed(1)} kg CO₂</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/profile')}
              >
                View My Orders
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-white font-medium
                  ${currentStep >= 1 ? 'bg-primary-600' : 'bg-neutral-300'}
                `}>
                  1
                </div>
                <div className={`
                  w-24 h-1 mx-1
                  ${currentStep >= 2 ? 'bg-primary-600' : 'bg-neutral-300'}
                `}></div>
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-medium
                  ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-neutral-300 text-white'}
                `}>
                  2
                </div>
                <div className={`
                  w-24 h-1 mx-1
                  ${currentStep >= 3 ? 'bg-primary-600' : 'bg-neutral-300'}
                `}></div>
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-medium
                  ${currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-neutral-300 text-white'}
                `}>
                  3
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <div className="flex items-center text-sm">
                <div className={`w-10 text-center ${currentStep === 1 ? 'text-primary-600 font-medium' : 'text-neutral-600'}`}>
                  Shipping
                </div>
                <div className="w-24"></div>
                <div className={`w-10 text-center ${currentStep === 2 ? 'text-primary-600 font-medium' : 'text-neutral-600'}`}>
                  Payment
                </div>
                <div className="w-24"></div>
                <div className={`w-10 text-center ${currentStep === 3 ? 'text-primary-600 font-medium' : 'text-neutral-600'}`}>
                  Confirm
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Shipping Address */}
                <div className={currentStep === 1 ? 'block' : 'hidden'}>
                  <div className="p-6 border-b border-neutral-100">
                    <h2 className="text-lg font-semibold flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                      Shipping Address
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            First Name*
                          </label>
                          <input
                            type="text"
                            className="input"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Last Name*
                          </label>
                          <input
                            type="text"
                            className="input"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Address Line 1*
                        </label>
                        <input
                          type="text"
                          name="line1"
                          value={shippingAddress.line1}
                          onChange={handleShippingAddressChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Address Line 2 (Optional)
                        </label>
                        <input
                          type="text"
                          name="line2"
                          value={shippingAddress.line2}
                          onChange={handleShippingAddressChange}
                          className="input"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            City*
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleShippingAddressChange}
                            className="input"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            State/Province*
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={shippingAddress.state}
                            onChange={handleShippingAddressChange}
                            className="input"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Postal Code*
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={shippingAddress.postalCode}
                            onChange={handleShippingAddressChange}
                            className="input"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Country*
                        </label>
                        <select
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleCountryChange}
                          className="input"
                          required
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="IN">India</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          className="input"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className={currentStep === 2 ? 'block' : 'hidden'}>
                  <div className="p-6 border-b border-neutral-100">
                    <h2 className="text-lg font-semibold flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-primary-600" />
                      Payment Method
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="card"
                              checked={paymentMethod === 'card'}
                              onChange={() => setPaymentMethod('card')}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2">Credit/Debit Card</span>
                          </label>
                          
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="paypal"
                              checked={paymentMethod === 'paypal'}
                              onChange={() => setPaymentMethod('paypal')}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2">PayPal</span>
                          </label>
                        </div>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              Card Number*
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={cardDetails.cardNumber}
                              onChange={handleCardDetailsChange}
                              placeholder="1234 5678 9012 3456"
                              className="input"
                              required
                              maxLength={19}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              Cardholder Name*
                            </label>
                            <input
                              type="text"
                              name="cardholderName"
                              value={cardDetails.cardholderName}
                              onChange={handleCardDetailsChange}
                              className="input"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Expiry Date*
                              </label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={cardDetails.expiryDate}
                                onChange={handleCardDetailsChange}
                                placeholder="MM/YY"
                                className="input"
                                required
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                CVV*
                              </label>
                              <input
                                type="text"
                                name="cvv"
                                value={cardDetails.cvv}
                                onChange={handleCardDetailsChange}
                                placeholder="123"
                                className="input"
                                required
                                maxLength={3}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'paypal' && (
                        <div className="bg-neutral-50 rounded-lg p-6 text-center">
                          <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                          <button 
                            className="btn bg-[#0070BA] text-white hover:bg-[#005ea6] px-6 py-2"
                          >
                            <span className="font-bold">Pay</span><span className="font-light">Pal</span>
                          </button>
                        </div>
                      )}
                      
                      <div className="bg-neutral-50 border border-neutral-200 rounded-md p-4 flex items-start">
                        <AlertTriangle className="h-5 w-5 text-warning-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-neutral-600">
                          <p className="font-medium mb-1">Secure Payment</p>
                          <p>
                            All transactions are secure and encrypted. Credit card information is never stored on our servers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Review */}
                <div className={currentStep === 3 ? 'block' : 'hidden'}>
                  <div className="p-6 border-b border-neutral-100">
                    <h2 className="text-lg font-semibold flex items-center">
                      <Package className="h-5 w-5 mr-2 text-primary-600" />
                      Review Order
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">Items</h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div 
                              key={item.product.id}
                              className="flex items-center border-b border-neutral-100 pb-3 last:border-b-0"
                            >
                              <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden mr-4">
                                <img 
                                  src={item.product.images[0]} 
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.product.name}</h4>
                                <div className="flex justify-between text-sm">
                                  <span className="text-neutral-600">Qty: {item.quantity}</span>
                                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-3">Shipping Address</h3>
                          <address className="not-italic text-neutral-600">
                            123 Main St<br />
                            Apt 4B<br />
                            New York, NY 10001<br />
                            United States<br />
                            +1 (555) 123-4567
                          </address>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Payment Method</h3>
                          <div className="text-neutral-600">
                            {paymentMethod === 'card' ? (
                              <div className="flex items-center">
                                <CreditCard className="h-5 w-5 mr-2 text-primary-600" />
                                <span>
                                  •••• •••• •••• 
                                  {cardDetails.cardNumber.slice(-4)}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <span className="font-bold mr-1">Pay</span>
                                <span className="font-light">Pal</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Environmental Impact</h3>
                        <div className="bg-primary-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-neutral-700">Carbon Footprint:</span>
                            <span className="font-medium">{getTotalCarbonFootprint().toFixed(1)} kg CO₂</span>
                          </div>
                          
                          <div className="carbon-indicator mb-3">
                            <div className="carbon-indicator-fill low" style={{ width: '60%' }}></div>
                          </div>
                          
                          <p className="text-sm text-neutral-600">
                            Your purchase today saves approximately {(getTotalCarbonFootprint() * 1.5).toFixed(1)} kg CO₂ compared to buying non-recycled alternatives.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Form Navigation */}
                <div className="p-6 border-t border-neutral-100 bg-neutral-50">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="btn btn-outline"
                      disabled={currentStep === 1}
                    >
                      Back
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-primary"
                      disabled={loading || paymentProcessing}
                    >
                      {paymentProcessing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : currentStep === 2 ? (
                        'Place Order'
                      ) : (
                        'Continue'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal ({items.reduce((total, item) => total + item.quantity, 0)} items)</span>
                    <span className="font-medium">${getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>
                    <span className="font-medium">${(getTotalAmount() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Carbon Offset</span>
                    <span className="font-medium text-success-600">-$2.00</span>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${(getTotalAmount() * 1.1 - 2).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-success-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-600 mr-2 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-success-800 mb-1">Environmental Benefits</h3>
                      <p className="text-xs text-success-700">
                        Your purchase will earn you {Math.floor(getTotalAmount() / 10)} eco points and save approximately {(getTotalCarbonFootprint() * 1.5).toFixed(1)} kg of CO₂!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4 text-sm text-neutral-600">
                  <p className="mb-2">We accept:</p>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-neutral-200 rounded"></div>
                    <div className="w-10 h-6 bg-neutral-200 rounded"></div>
                    <div className="w-10 h-6 bg-neutral-200 rounded"></div>
                    <div className="w-10 h-6 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
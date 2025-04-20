import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, ShoppingBag, BarChart2, Award, Settings, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../store';
import { auth, firestore } from '../services/firebase';
import { Order, UserStats } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock user stats (in a real app, this would come from the backend)
  const userStats: UserStats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((total, order) => total + order.totalAmount, 0),
    totalCarbonFootprint: orders.reduce((total, order) => total + order.totalCarbonFootprint, 0),
    carbonOverTime: [
      { date: new Date(2023, 0, 1), value: 12 },
      { date: new Date(2023, 1, 1), value: 19 },
      { date: new Date(2023, 2, 1), value: 3 },
      { date: new Date(2023, 3, 1), value: 5 },
      { date: new Date(2023, 4, 1), value: 2 },
      { date: new Date(2023, 5, 1), value: 3 },
      { date: new Date(2023, 6, 1), value: 10 },
    ]
  };
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchOrders = async () => {
      try {
        const userOrders = await firestore.orders.getByUserId(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user, navigate]);
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 text-center border-b border-neutral-100">
                <div className="w-20 h-20 rounded-full bg-primary-100 mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold">{user.displayName}</h2>
                <p className="text-neutral-500">{user.email}</p>
                
                <div className="mt-4 flex justify-center space-x-3">
                  <div className="text-center">
                    <div className="text-lg font-bold">{user.points}</div>
                    <div className="text-xs text-neutral-500">Eco Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{user.carbonFootprint.toFixed(1)}</div>
                    <div className="text-xs text-neutral-500">kg CO₂</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    className={`w-full flex items-center px-4 py-2 rounded-md transition ${
                      activeTab === 'overview' 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <BarChart2 className="h-5 w-5 mr-3" />
                    Overview
                  </button>
                  
                  <button
                    className={`w-full flex items-center px-4 py-2 rounded-md transition ${
                      activeTab === 'orders' 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <ShoppingBag className="h-5 w-5 mr-3" />
                    My Orders
                  </button>
                  
                  <button
                    className={`w-full flex items-center px-4 py-2 rounded-md transition ${
                      activeTab === 'impact' 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                    onClick={() => setActiveTab('impact')}
                  >
                    <Award className="h-5 w-5 mr-3" />
                    Environmental Impact
                  </button>
                  
                  <button
                    className={`w-full flex items-center px-4 py-2 rounded-md transition ${
                      activeTab === 'settings' 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </button>
                </nav>
              </div>
              
              <div className="p-4 border-t border-neutral-100">
                <button
                  className="w-full flex items-center px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md transition"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-primary-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-neutral-600">Total Orders</p>
                          <p className="text-2xl font-bold">{userStats.totalOrders}</p>
                        </div>
                        <div className="bg-primary-100 rounded-full p-2">
                          <ShoppingBag className="h-6 w-6 text-primary-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-neutral-600">Eco Points</p>
                          <p className="text-2xl font-bold">{user.points}</p>
                        </div>
                        <div className="bg-secondary-100 rounded-full p-2">
                          <Award className="h-6 w-6 text-secondary-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-success-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-neutral-600">CO₂ Saved</p>
                          <p className="text-2xl font-bold">{(userStats.totalCarbonFootprint * 1.5).toFixed(1)} kg</p>
                        </div>
                        <div className="bg-success-100 rounded-full p-2">
                          <Leaf className="h-6 w-6 text-success-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">Carbon Footprint Over Time</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userStats.carbonOverTime.map(item => ({
                          name: item.date.toLocaleDateString('en-US', { month: 'short' }),
                          value: item.value
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12, fill: '#616161' }} 
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#616161' }}
                          label={{ 
                            value: 'kg CO₂', 
                            angle: -90, 
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#616161' }
                          }} 
                        />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#2E7D32" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {userStats.totalOrders > 0 ? (
                    <div className="mt-6 bg-success-50 rounded-lg p-4 flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-success-600 mr-2 mt-0.5"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-success-900">Great progress!</h4>
                        <p className="text-xs text-success-700">
                          Your sustainable shopping has saved {(userStats.totalCarbonFootprint * 1.5).toFixed(1)} kg of CO₂ emissions, equivalent to planting {Math.max(1, Math.round(userStats.totalCarbonFootprint * 1.5 / 10))} trees!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 bg-primary-50 rounded-lg p-4 flex items-start">
                      <Info className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-primary-900">Start Your Sustainable Journey</h4>
                        <p className="text-xs text-primary-700">
                          Make your first purchase to start tracking your environmental impact and earning eco points!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <button
                      className="text-primary-600 text-sm font-medium hover:text-primary-700"
                      onClick={() => setActiveTab('orders')}
                    >
                      View All
                    </button>
                  </div>
                  
                  {loading ? (
                    <div className="animate-pulse space-y-4">
                      {[1, 2].map((_, index) => (
                        <div key={index} className="border border-neutral-200 rounded-lg p-4">
                          <div className="h-4 bg-neutral-200 rounded w-1/4 mb-4"></div>
                          <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div 
                          key={order.id}
                          className="border border-neutral-200 hover:border-primary-200 rounded-lg p-4 transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Order #{order.id.substring(0, 8)}</h3>
                              <p className="text-sm text-neutral-500">
                                {order.createdAt.toLocaleDateString()} • {order.items.length} items
                              </p>
                              <p className="text-sm mt-1">
                                <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                                <span className="px-2 py-0.5 ml-2 text-xs bg-success-100 text-success-800 rounded-full">
                                  Saved {(order.totalCarbonFootprint * 1.5).toFixed(1)} kg CO₂
                                </span>
                              </p>
                            </div>
                            <span className={`
                              text-xs px-2 py-1 rounded-full
                              ${order.status === 'delivered' ? 'bg-success-100 text-success-800' : 
                                order.status === 'shipped' ? 'bg-primary-100 text-primary-800' : 
                                order.status === 'pending' ? 'bg-warning-100 text-warning-800' : 
                                'bg-neutral-100 text-neutral-800'}
                            `}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-neutral-200 rounded-lg">
                      <ShoppingBag className="h-10 w-10 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-neutral-600 mb-6">Start shopping to see your orders here.</p>
                      <Link to="/products" className="btn btn-primary">
                        Browse Products
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100">
                  <h2 className="text-xl font-semibold">My Orders</h2>
                </div>
                
                {loading ? (
                  <div className="p-6 animate-pulse space-y-6">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="border border-neutral-200 rounded-lg p-4">
                        <div className="h-4 bg-neutral-200 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : orders.length > 0 ? (
                  <div className="p-6 space-y-6">
                    {orders.map((order) => (
                      <div 
                        key={order.id}
                        className="border border-neutral-200 hover:border-primary-200 rounded-lg overflow-hidden transition"
                      >
                        <div className="p-4 flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Order #{order.id.substring(0, 8)}</h3>
                            <p className="text-sm text-neutral-500">
                              {order.createdAt.toLocaleDateString()} • {order.items.length} items
                            </p>
                          </div>
                          <span className={`
                            text-xs px-2 py-1 rounded-full
                            ${order.status === 'delivered' ? 'bg-success-100 text-success-800' : 
                              order.status === 'shipped' ? 'bg-primary-100 text-primary-800' : 
                              order.status === 'pending' ? 'bg-warning-100 text-warning-800' : 
                              'bg-neutral-100 text-neutral-800'}
                          `}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="border-t border-neutral-100 p-4">
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.product.id} className="flex items-center">
                                <div className="w-12 h-12 bg-neutral-100 rounded overflow-hidden mr-4">
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
                        
                        <div className="border-t border-neutral-100 p-4 bg-neutral-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-sm text-neutral-600">Total:</span>
                              <span className="font-semibold ml-2">${order.totalAmount.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="px-2 py-0.5 text-xs bg-success-100 text-success-800 rounded-full">
                                Saved {(order.totalCarbonFootprint * 1.5).toFixed(1)} kg CO₂
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <ShoppingBag className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-neutral-600 mb-6">
                      You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                    <Link to="/products" className="btn btn-primary">
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Environmental Impact Tab */}
            {activeTab === 'impact' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Environmental Impact</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-success-50 rounded-lg p-6">
                      <div className="text-center mb-4">
                        <Leaf className="h-10 w-10 text-success-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold">Total CO₂ Saved</h3>
                      </div>
                      <div className="text-4xl font-bold text-center mb-4">
                        {(userStats.totalCarbonFootprint * 1.5).toFixed(1)} <span className="text-sm font-normal">kg CO₂</span>
                      </div>
                      <p className="text-sm text-center text-neutral-600">
                        That's equivalent to planting {Math.max(1, Math.round(userStats.totalCarbonFootprint * 1.5 / 10))} trees or driving {Math.round(userStats.totalCarbonFootprint * 9)} km less.
                      </p>
                    </div>
                    
                    <div className="bg-primary-50 rounded-lg p-6">
                      <div className="text-center mb-4">
                        <Award className="h-10 w-10 text-primary-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold">Eco Points</h3>
                      </div>
                      <div className="text-4xl font-bold text-center mb-4">
                        {user.points} <span className="text-sm font-normal">points</span>
                      </div>
                      <p className="text-sm text-center text-neutral-600">
                        Keep shopping sustainably to earn more points and climb the leaderboard!
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">Carbon Footprint Breakdown</h3>
                  <div className="h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userStats.carbonOverTime.map(item => ({
                          name: item.date.toLocaleDateString('en-US', { month: 'short' }),
                          value: item.value
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12, fill: '#616161' }} 
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#616161' }}
                          label={{ 
                            value: 'kg CO₂', 
                            angle: -90, 
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#616161' }
                          }} 
                        />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#2E7D32" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-white border border-neutral-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Sustainability Badges</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-2">
                          <Leaf className="h-8 w-8 text-success-600" />
                        </div>
                        <h4 className="font-medium">Eco Shopper</h4>
                        <p className="text-xs text-neutral-500">10+ eco purchases</p>
                      </div>
                      
                      <div className="text-center opacity-50">
                        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-2">
                          <Award className="h-8 w-8 text-neutral-400" />
                        </div>
                        <h4 className="font-medium">Carbon Saver</h4>
                        <p className="text-xs text-neutral-500">Save 100kg CO₂</p>
                      </div>
                      
                      <div className="text-center opacity-50">
                        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-2">
                          <ShoppingBag className="h-8 w-8 text-neutral-400" />
                        </div>
                        <h4 className="font-medium">Frequent Buyer</h4>
                        <p className="text-xs text-neutral-500">25+ orders</p>
                      </div>
                      
                      <div className="text-center opacity-50">
                        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-8 w-8 text-neutral-400"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </div>
                        <h4 className="font-medium">Earth Lover</h4>
                        <p className="text-xs text-neutral-500">1 year membership</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Your Rank</h2>
                    <Link 
                      to="/leaderboard"
                      className="text-primary-600 text-sm font-medium hover:text-primary-700"
                    >
                      View Leaderboard
                    </Link>
                  </div>
                  
                  <div className="bg-primary-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                          <Award className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium">{user.displayName}</p>
                          <p className="text-sm text-neutral-500">Rank #42 of 1,248</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{user.points}</p>
                        <p className="text-sm text-neutral-500">Eco Points</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-md p-4">
                      <p className="text-sm mb-2">You need <span className="font-medium">28 more points</span> to reach the next rank!</p>
                      <div className="carbon-indicator">
                        <div className="carbon-indicator-fill low" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100">
                  <h2 className="text-xl font-semibold">Account Settings</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Display Name
                          </label>
                          <input
                            type="text"
                            className="input"
                            defaultValue={user.displayName}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="input"
                            defaultValue={user.email}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-neutral-200">
                      <h3 className="text-lg font-medium mb-4">Password</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-neutral-200">
                      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            defaultChecked
                          />
                          <span className="ml-2">Order updates</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            defaultChecked
                          />
                          <span className="ml-2">Sustainability tips</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            defaultChecked
                          />
                          <span className="ml-2">New eco-friendly products</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2">Promotional emails</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-neutral-200">
                      <h3 className="text-lg font-medium mb-4 text-error-600">Danger Zone</h3>
                      <div className="bg-error-50 border border-error-100 rounded-lg p-4 flex items-start">
                        <AlertTriangle className="h-5 w-5 text-error-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-error-800 mb-2">Delete Account</p>
                          <p className="text-sm text-error-700 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <button className="btn border border-error-600 text-error-600 bg-white hover:bg-error-50">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-end">
                    <button className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
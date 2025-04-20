import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, BarChart2 } from 'lucide-react';

const SustainabilityBanner: React.FC = () => {
  return (
    <section className="py-16 bg-primary-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
              <Activity className="h-4 w-4" />
              <span>Track Your Impact</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-neutral-900">
              See the Difference <br />
              <span className="text-primary-600">Your Choices Make</span>
            </h2>
            
            <p className="text-neutral-700 mb-6">
              Every product on EcoTrade comes with a detailed carbon footprint analysis. Track your personal environmental impact with each purchase and see your contribution to a healthier planet.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/leaderboard" className="btn btn-primary">
                View Leaderboard
              </Link>
              <Link to="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-eco p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100 rounded-bl-full z-0"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-medium">Your Carbon Impact</h3>
                  <p className="text-neutral-500 text-sm">Last 30 days summary</p>
                </div>
                <div className="bg-primary-100 rounded-full p-2">
                  <BarChart2 className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-neutral-700">Carbon Saved</span>
                    <span className="text-sm font-medium text-success-600">74%</span>
                  </div>
                  <div className="carbon-indicator">
                    <div className="carbon-indicator-fill low" style={{ width: '74%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-neutral-700">Traditional Shopping</span>
                    <span className="text-sm font-medium text-neutral-700">124kg CO₂</span>
                  </div>
                  <div className="carbon-indicator">
                    <div className="carbon-indicator-fill high" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-neutral-700">Your EcoTrade Impact</span>
                    <span className="text-sm font-medium text-success-600">32kg CO₂</span>
                  </div>
                  <div className="carbon-indicator">
                    <div className="carbon-indicator-fill low" style={{ width: '26%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-success-50 rounded-lg border border-success-100 flex items-start">
                <div className="bg-success-100 rounded-full p-1.5 mr-3 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-success-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-success-900">Great progress!</h4>
                  <p className="text-xs text-success-700">
                    You've saved the equivalent of planting 4 trees this month with your eco-friendly purchases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityBanner;
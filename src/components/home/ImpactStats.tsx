import React from 'react';
import { Recycle, Droplet, Wind, Trees } from 'lucide-react';

const ImpactStats: React.FC = () => {
  return (
    <section className="py-16 bg-secondary-900 text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Impact Together</h2>
          <p className="text-secondary-100 max-w-2xl mx-auto">
            Every purchase on EcoTrade contributes to a more sustainable future. Here's our community impact so far.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="h-8 w-8 text-accent-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">1.2K</h3>
            <p className="text-secondary-200 text-sm">Recycled Products Sold</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplet className="h-8 w-8 text-accent-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">120K</h3>
            <p className="text-secondary-200 text-sm">Liters of Water Saved</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wind className="h-8 w-8 text-accent-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">25K</h3>
            <p className="text-secondary-200 text-sm">kg of CO₂ Reduced</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trees className="h-8 w-8 text-accent-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">845</h3>
            <p className="text-secondary-200 text-sm">Trees Equivalent Saved</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
import React from 'react';
import { Leaf, Recycle, BarChart2, Users, Sun, Wind, Droplet, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <section className="relative py-20 bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Forest" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission to Protect the Planet</h1>
            <p className="text-xl text-white/90 mb-8">
              We're building a sustainable future through conscious consumption and transparency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="btn bg-white text-primary-800 hover:bg-white/90">
                Shop Sustainable Products
              </Link>
              <a href="#our-story" className="btn border border-white bg-transparent text-white hover:bg-white/10">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section id="our-story" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
                <Leaf className="h-4 w-4" />
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From Idea to <span className="text-primary-600">Impact</span>
              </h2>
              <p className="text-neutral-700 mb-6">
                EcoTrade started with a simple but powerful idea: make sustainable shopping accessible and transparent. We recognized that while many people want to shop more sustainably, it's often difficult to know the true environmental impact of products.
              </p>
              <p className="text-neutral-700 mb-6">
                Our team of environmental scientists, engineers, and designers came together to build a platform that not only offers high-quality recycled and upcycled products but also provides complete transparency about their environmental footprint.
              </p>
              <p className="text-neutral-700">
                Today, we're proud to offer a marketplace where every purchase contributes to a healthier planet. With detailed carbon footprint tracking and a growing community of eco-conscious shoppers, we're proving that sustainable consumption can be both convenient and impactful.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/7345444/pexels-photo-7345444.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Sustainable product creation" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-start">
                  <Recycle className="h-10 w-10 text-primary-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">100% Sustainable</h3>
                    <p className="text-sm text-neutral-600">
                      Every product on our platform is either recycled, upcycled, or made from sustainable materials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
              <Award className="h-4 w-4" />
              <span>Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Principles That Guide Us
            </h2>
            <p className="text-neutral-700">
              At EcoTrade, our values aren't just words on a page – they're the foundation of everything we do. From product selection to carbon footprint calculations, these principles guide our decisions every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-5">
                <BarChart2 className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-neutral-600">
                We provide detailed information about the environmental impact of every product, empowering you to make informed decisions.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-5">
                <Recycle className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Circularity</h3>
              <p className="text-neutral-600">
                We promote a circular economy by prioritizing products made from recycled materials or those designed for multiple lifecycles.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-5">
                <Users className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-neutral-600">
                We're building a community of conscious consumers who understand that everyday choices have a global impact.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-5">
                <Leaf className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-neutral-600">
                We're committed to sustainable practices not just in our products, but in every aspect of our business operations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Environmental Impact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-success-50 rounded-xl p-6 text-center">
                  <Sun className="h-8 w-8 text-success-600 mx-auto mb-3" />
                  <h4 className="text-2xl font-bold mb-2">12K+</h4>
                  <p className="text-sm text-neutral-700">kg of CO₂ Saved</p>
                </div>
                
                <div className="bg-primary-50 rounded-xl p-6 text-center">
                  <Wind className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                  <h4 className="text-2xl font-bold mb-2">845</h4>
                  <p className="text-sm text-neutral-700">Trees Equivalent</p>
                </div>
                
                <div className="bg-secondary-50 rounded-xl p-6 text-center">
                  <Droplet className="h-8 w-8 text-secondary-600 mx-auto mb-3" />
                  <h4 className="text-2xl font-bold mb-2">120K</h4>
                  <p className="text-sm text-neutral-700">Liters of Water Saved</p>
                </div>
                
                <div className="bg-accent-50 rounded-xl p-6 text-center">
                  <Recycle className="h-8 w-8 text-accent-600 mx-auto mb-3" />
                  <h4 className="text-2xl font-bold mb-2">2.4K</h4>
                  <p className="text-sm text-neutral-700">Products Recycled</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 bg-success-100 text-success-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
                <BarChart2 className="h-4 w-4" />
                <span>Our Impact</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Real Numbers, Real <span className="text-success-600">Impact</span>
              </h2>
              <p className="text-neutral-700 mb-6">
                We believe in measuring what matters. Every product sold through EcoTrade contributes to our collective environmental impact, and we're proud to track and share these results with our community.
              </p>
              <p className="text-neutral-700 mb-6">
                Our carbon footprint calculations are based on rigorous lifecycle assessments that consider everything from material extraction to manufacturing, transportation, and end-of-life scenarios.
              </p>
              <p className="text-neutral-700">
                By choosing EcoTrade, you're not just buying products – you're contributing to a measurable positive impact on our planet. Every purchase adds to these numbers, demonstrating the power of collective action.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
              <Users className="h-4 w-4" />
              <span>Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet the People Behind EcoTrade
            </h2>
            <p className="text-neutral-700">
              Our diverse team brings together expertise in environmental science, technology, design, and retail to create a platform that makes sustainable shopping both easy and impactful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src="src/uploads/profile copy.jpeg" 
                alt="MOHD ADNAN" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">MOHD ADNAN</h3>
                <p className="text-primary-600 mb-3">Co-Founder & CEO</p>
                <p className="text-neutral-600 text-sm">
                  Environmental scientist with a passion for making sustainability accessible to everyone.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src="mohit copy.jpeg" 
                alt="Mohit" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">MOHIT</h3>
                <p className="text-primary-600 mb-3">Co-Founder & CTO</p>
                <p className="text-neutral-600 text-sm">
                  Tech innovator focused on using data to drive environmental change and transparency.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src="src/uploads/faizan copy.jpeg" 
                alt="Mohd Faizan" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Mohd Faizan</h3>
                <p className="text-primary-600 mb-3">Head of Product</p>
                <p className="text-neutral-600 text-sm">
                  Product designer with experience in creating sustainable consumer goods and services.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src="src/uploads/image.png" 
                alt="Mohd Faizan" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Waqas Anwar</h3>
                <p className="text-primary-600 mb-3">Sustainability Director</p>
                <p className="text-neutral-600 text-sm">
                  Climate scientist specializing in carbon footprint assessment and lifecycle analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Leaf className="h-12 w-12 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in Creating a More Sustainable Future
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Every purchase on EcoTrade contributes to a healthier planet. Start your sustainable shopping journey today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="btn bg-white text-primary-800 hover:bg-white/90 px-6 py-3">
                Shop Now
              </Link>
              <Link to="/signup" className="btn border border-white bg-transparent text-white hover:bg-white/10 px-6 py-3">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
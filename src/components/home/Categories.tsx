import React from 'react';
import { Link } from 'react-router-dom';

const categoriesData = [
  {
    id: 'furniture',
    name: 'Recycled Furniture',
    image: 'https://images.pexels.com/photos/4112557/pexels-photo-4112557.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 42,
  },
  {
    id: 'fashion',
    name: 'Sustainable Fashion',
    image: 'https://images.pexels.com/photos/5662862/pexels-photo-5662862.png?auto=compress&cs=tinysrgb&w=800',
    count: 76,
  },
  {
    id: 'home-decor',
    name: 'Eco Home Decor',
    image: 'https://images.pexels.com/photos/7195232/pexels-photo-7195232.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 53,
  },
  {
    id: 'electronics',
    name: 'Refurbished Electronics',
    image: 'https://images.pexels.com/photos/3733929/pexels-photo-3733929.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 29,
  },
];

const Categories: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Shop by Category</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Browse our curated selection of sustainable products in various categories.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.name}`}
              className="card overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-medium">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
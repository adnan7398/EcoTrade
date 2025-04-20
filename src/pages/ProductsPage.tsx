import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ArrowUpDown, GridIcon, List } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';
import { firestore } from '../services/firebase';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: [0, 1000],
    carbonImpact: 'all', // 'all', 'low', 'medium', 'high'
    materials: [] as string[],
  });
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'carbon-asc'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productList: Product[];
        
        if (filters.category) {
          productList = await firestore.products.getByCategory(filters.category);
        } else {
          productList = await firestore.products.getAll();
        }
        
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters.category]);
  
  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Price range filter
    result = result.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Carbon impact filter
    if (filters.carbonImpact !== 'all') {
      switch (filters.carbonImpact) {
        case 'low':
          result = result.filter((product) => product.carbonFootprint < 10);
          break;
        case 'medium':
          result = result.filter(
            (product) => product.carbonFootprint >= 10 && product.carbonFootprint < 30
          );
          break;
        case 'high':
          result = result.filter((product) => product.carbonFootprint >= 30);
          break;
      }
    }
    
    // Materials filter
    if (filters.materials.length > 0) {
      result = result.filter((product) =>
        product.materials.some((material) => filters.materials.includes(material))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'carbon-asc':
        result.sort((a, b) => a.carbonFootprint - b.carbonFootprint);
        break;
      default:
        // featured - no specific sort, use default
        break;
    }
    
    setFilteredProducts(result);
  }, [products, filters, sortBy]);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const resetFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 1000],
      carbonImpact: 'all',
      materials: [],
    });
    setSortBy('featured');
  };
  
  const handleCategoryChange = (category: string) => {
    setFilters({ ...filters, category });
  };
  
  const handleCarbonImpactChange = (impact: string) => {
    setFilters({ ...filters, carbonImpact: impact });
  };
  
  const handleMaterialToggle = (material: string) => {
    if (filters.materials.includes(material)) {
      setFilters({
        ...filters,
        materials: filters.materials.filter((m) => m !== material),
      });
    } else {
      setFilters({
        ...filters,
        materials: [...filters.materials, material],
      });
    }
  };
  
  const categories = ['Furniture', 'Fashion', 'Home Decor', 'Electronics', 'Accessories'];
  const materials = ['Recycled Plastic', 'Upcycled Wood', 'Reclaimed Metal', 'Organic Cotton', 'Recycled Paper'];
  
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sustainable Products</h1>
          <p className="text-neutral-600">
            Browse our collection of eco-friendly, recycled, and upcycled products.
          </p>
        </div>
        
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <button
              className="btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 flex items-center"
              onClick={toggleFilter}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            {filters.category && (
              <div className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                {filters.category}
                <button 
                  className="ml-2 text-primary-500 hover:text-primary-700"
                  onClick={() => handleCategoryChange('')}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {filters.carbonImpact !== 'all' && (
              <div className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                {filters.carbonImpact === 'low' && 'Low Impact'}
                {filters.carbonImpact === 'medium' && 'Medium Impact'}
                {filters.carbonImpact === 'high' && 'High Impact'}
                <button 
                  className="ml-2 text-primary-500 hover:text-primary-700"
                  onClick={() => handleCarbonImpactChange('all')}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {(filters.category || filters.carbonImpact !== 'all' || filters.materials.length > 0) && (
              <button 
                className="text-sm text-neutral-600 hover:text-primary-600"
                onClick={resetFilters}
              >
                Reset all
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-neutral-300 text-neutral-700 py-2 pl-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="carbon-asc">Lowest Carbon Impact</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
            
            <div className="flex bg-white border border-neutral-300 rounded-md">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-neutral-600'}`}
                onClick={() => setViewMode('grid')}
              >
                <GridIcon className="h-5 w-5" />
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-neutral-600'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-64 bg-white rounded-lg shadow-sm p-6 space-y-6 h-fit">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Carbon Impact</h3>
              <div className="space-y-2">
                {['all', 'low', 'medium', 'high'].map((impact) => (
                  <label key={impact} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="impact"
                      checked={filters.carbonImpact === impact}
                      onChange={() => handleCarbonImpactChange(impact)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">
                      {impact === 'all' && 'All Products'}
                      {impact === 'low' && 'Low Impact'}
                      {impact === 'medium' && 'Medium Impact'}
                      {impact === 'high' && 'High Impact'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Materials</h3>
              <div className="space-y-2">
                {materials.map((material) => (
                  <label key={material} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.materials.includes(material)}
                      onChange={() => handleMaterialToggle(material)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">{material}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
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
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg">
                <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <X className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-neutral-500 mb-6">
                  Try adjusting your filters or search criteria.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Filters */}
        {isFilterOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex justify-end">
            <div className="w-80 bg-white h-full overflow-y-auto p-6 animate-slide-left">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button 
                  className="p-2 hover:bg-neutral-100 rounded-full"
                  onClick={toggleFilter}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category}
                          onChange={() => handleCategoryChange(category)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Carbon Impact</h4>
                  <div className="space-y-2">
                    {['all', 'low', 'medium', 'high'].map((impact) => (
                      <label key={impact} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="impact"
                          checked={filters.carbonImpact === impact}
                          onChange={() => handleCarbonImpactChange(impact)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">
                          {impact === 'all' && 'All Products'}
                          {impact === 'low' && 'Low Impact'}
                          {impact === 'medium' && 'Medium Impact'}
                          {impact === 'high' && 'High Impact'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Materials</h4>
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <label key={material} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.materials.includes(material)}
                          onChange={() => handleMaterialToggle(material)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <button 
                  className="btn btn-primary w-full"
                  onClick={toggleFilter}
                >
                  Apply Filters
                </button>
                <button 
                  className="btn btn-outline w-full"
                  onClick={() => {
                    resetFilters();
                    toggleFilter();
                  }}
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
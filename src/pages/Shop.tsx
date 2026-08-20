import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { Search, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  
  const { products, loading, error } = useProducts();
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Shop | Heritage Finger';
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCategories = CATEGORIES.filter(cat => cat === 'All' || products.some(p => p.category === cat));

  return (
    <div className="bg-transparent min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#183C2B] mb-4">Our Catalogue</h1>
          <p className="text-gray-600 text-lg">
            Browse our selection of authentic African foods, groceries, and ingredients.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Search and Filter */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#183C2B]/20 focus:border-[#183C2B] transition-all"
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-[#171717] mb-4">Categories</h3>
                <ul className="space-y-2">
                  {activeCategories.map(category => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          activeCategory === category
                            ? "bg-[#183C2B] text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-[#183C2B]"
                        )}
                      >
                        {category === 'All' ? 'All Products' : category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-[#183C2B]/20 border-t-[#183C2B] rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 flex flex-col items-center px-6">
                <p className="text-red-500 font-medium mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-[#183C2B] text-white rounded-lg hover:bg-[#11331e] transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 flex flex-col items-center px-6">
                <p className="text-gray-500 text-lg mb-2">No products available yet.</p>
                <p className="text-gray-400">Please check back later.</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 flex flex-col items-center">
                <p className="text-gray-500 text-lg mb-2">No products found matching your search.</p>
                <p className="font-bold text-[#171717] mb-6">Can't find what you're looking for?</p>
                
                <a 
                  href="https://wa.me/447464053335?text=Hello%20Heritage%20Finger,%20I'm%20looking%20for%20a%20product%20I%20couldn't%20find%20on%20your%20website..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#25D366] hover:bg-[#1DA851] transition-colors mb-4"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </a>
                
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="text-[#C96B3B] font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

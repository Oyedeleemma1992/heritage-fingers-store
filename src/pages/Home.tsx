import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, ShoppingBag, MapPin, Truck, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

import { Reviews } from '../components/Reviews';

export const Home = () => {
  useEffect(() => {
    document.title = 'Heritage Finger | Authentic Pan-African Food & Groceries UK';
  }, []);

  const { products, loading, error } = useProducts();

  const featuredProductNames = [
    'Nigerian Honey Beans (Oloyin)',
    'Peeled Beans',
    'Dry Crayfish',
    'Spicy Plantain Chips',
    'Malt Drink',
    'Ground Egusi (Melon Seeds)'
  ];
  
  // Try to find the featured products by name from the API results. 
  // If we can't find them by name (or if they changed), gracefully fallback to the first 6 products.
  let featuredProducts = featuredProductNames
    .map(name => products.find(p => p.name === name))
    .filter(Boolean) as typeof products;

  if (featuredProducts.length === 0 && products.length > 0) {
    featuredProducts = products.slice(0, 6);
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-[#183C2B] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80" 
            alt="African spices and ingredients" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Authentic African Flavours, <span className="text-[#C96B3B]">Delivered Across the UK</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
              Shop authentic African groceries, ingredients, snacks, drinks, cakes, baked treats and small chops from Heritage Finger. Based in Birmingham and serving customers across the UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#183C2B] bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                Shop Our Products
              </Link>
              <a 
                href="https://wa.me/447464053335" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
              >
                Order via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold text-[#C96B3B] uppercase tracking-wider mb-2">Discover</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#183C2B]">Shop by Category</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.filter(cat => cat !== 'All' && products.some(p => p.category === cat)).map(category => (
              <Link 
                key={category} 
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-[#E8E1D5] hover:shadow-md transition-all hover:border-[#C96B3B]/50"
              >
                <h3 className="font-serif text-lg font-bold text-[#171717] text-center group-hover:text-[#183C2B] transition-colors">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-sm font-bold text-[#C96B3B] uppercase tracking-wider mb-2">Our Catalogue</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#183C2B]">Featured Products</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center text-[#183C2B] font-medium hover:text-[#C96B3B] transition-colors">
              View all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20 flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-[#183C2B]/20 border-t-[#183C2B] rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading featured products...</p>
              </div>
            ) : error ? (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20">
                <p className="text-red-500 font-medium">{error}</p>
              </div>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20">
                <p className="text-gray-500 font-medium">More products coming soon.</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/shop" className="inline-flex items-center text-[#183C2B] font-medium hover:text-[#C96B3B] transition-colors">
              View all products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#183C2B] mb-4">How to Order</h2>
            <p className="text-lg text-gray-600">
              We've made ordering simple and personal. Select your items and we'll handle the rest directly with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Browse', desc: 'Explore our African food and grocery products.' },
              { num: '02', title: 'Select', desc: 'Add the products you want to your order request.' },
              { num: '03', title: 'Send', desc: 'Submit your request through WhatsApp or email.' },
              { num: '04', title: 'Confirm', desc: 'Our team contacts you to confirm availability, delivery/collection and payment arrangements.' }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <span className="block text-4xl font-serif font-bold text-[#C96B3B]/20 mb-4">{step.num}</span>
                <h3 className="font-serif text-xl font-bold text-[#183C2B] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#183C2B] mb-6">A Taste of Home, Wherever You Are</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Heritage Finger exists to make authentic African food, ingredients and treats more accessible to customers across the UK. We understand the importance of traditional ingredients in creating the meals you love.
              </p>
              
              <ul className="space-y-6">
                {[
                  { icon: MapPin, title: 'UK-Wide Service', desc: 'Based in Birmingham and serving customers across the United Kingdom.' },
                  { icon: ShoppingBag, title: 'Authentic Flavours', desc: 'African food products and ingredients selected with authenticity in mind.' },
                  { icon: Truck, title: 'Easy Ordering', desc: 'Simple product browsing with WhatsApp and email order requests.' },
                  { icon: MessageCircle, title: 'Personal Service', desc: 'Customers can communicate directly with the Heritage Finger team.' },
                ].map((item, idx) => (
                  <li key={idx} className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#183C2B]/10 text-[#183C2B]">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-[#171717]">{item.title}</h4>
                      <p className="text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200" 
                  alt="Assorted African ingredients and spices" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#C96B3B] rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reviews />
        </div>
      </section>

    </div>
  );
};

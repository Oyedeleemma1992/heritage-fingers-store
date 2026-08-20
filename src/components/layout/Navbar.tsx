import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { cn } from '../../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useOrder();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Delivery & Collection', path: '/delivery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F7F1E5]/90 backdrop-blur-md border-b border-[#C96B3B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 md:h-24 lg:h-28">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="https://i.ibb.co/rKjDRxn8/heritage-logo-removebg-preview.png" 
                alt="Heritage Finger Logo" 
                className="h-16 md:h-20 lg:h-24 w-auto object-contain py-1" 
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#C96B3B]",
                  location.pathname === link.path ? "text-[#C96B3B]" : "text-[#171717]"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              to="/order-request"
              className="relative p-2 text-[#183C2B] hover:text-[#C96B3B] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#C96B3B] rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <Link
              to="/order-request"
              className="relative p-2 text-[#183C2B]"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#C96B3B] rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#183C2B] hover:text-[#C96B3B] p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#F7F1E5] border-t border-[#C96B3B]/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "text-[#C96B3B] bg-[#C96B3B]/10"
                    : "text-[#171717] hover:text-[#C96B3B] hover:bg-gray-50"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://wa.me/447464053335" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block mt-4 w-full text-center px-4 py-3 bg-[#183C2B] text-white font-medium rounded-md"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

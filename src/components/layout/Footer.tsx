import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91.04c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93v8.12c0 4.48-3.58 8.13-8.06 8.13c-4.48 0-8.06-3.65-8.06-8.13c0-4.48 3.58-8.12 8.06-8.12c.31 0 .61.02.91.07v4.06c-.29-.05-.6-.08-.91-.08c-2.24 0-4.06 1.82-4.06 4.06c0 2.24 1.82 4.06 4.06 4.06c2.24 0 4.06-1.82 4.06-4.06V.02h-4.06z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-[#183C2B] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <img 
              src="https://i.ibb.co/rKjDRxn8/heritage-logo-removebg-preview.png" 
              alt="Heritage Finger Logo" 
              className="h-24 md:h-28 lg:h-32 w-auto mb-6 object-contain bg-white/95 p-3 rounded-lg shadow-sm" 
            />
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs mb-4">
              Authentic African Flavours, Delivered Across the UK.
            </p>
            <div className="inline-block border border-white/20 rounded-md px-3 py-1 bg-white/5 mb-6">
              <p className="text-sm font-medium text-white">Online Store: Open 24/7</p>
            </div>
            <div className="flex items-center space-x-5">
              <a 
                href="https://www.instagram.com/h_spicyfingers?igsh=MWFoY2tyd3lrdmV2cA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-[#C96B3B] transition-colors" 
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.tiktok.com/@heritagefingers?_r=1&_t=ZS-990kC5qjwzi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-[#C96B3B] transition-colors" 
                aria-label="TikTok"
              >
                <TikTokIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-[#C96B3B]">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0 text-[#C96B3B]" />
                <span className="text-sm text-gray-300">
                  Heritage Fingers Pan-African Stores Ltd.<br />
                  10 Robert Road, Handsworth<br />
                  Birmingham, B20 3RT<br />
                  United Kingdom
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-[#C96B3B]" />
                <a href="mailto:info@heritagefingers.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                  info@heritagefingers.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-[#C96B3B]" />
                <a href="https://wa.me/447464053335" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors">
                  +44 7464 053335 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-[#C96B3B]">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop', path: '/shop' },
                { name: 'About Us', path: '/about' },
                { name: 'Delivery & Collection', path: '/delivery' },
                { name: 'Contact', path: '/contact' },
                { name: 'Admin Portal', path: '/admin' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Heritage Fingers Pan-African Stores Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Privacy Policy', path: '/privacy-policy' },
              { name: 'Terms & Conditions', path: '/terms-and-conditions' },
              { name: 'Delivery Policy', path: '/delivery-collection' },
              { name: 'Returns / Refund Policy', path: '/returns-policy' },
              { name: 'Cookie Policy', path: '/cookie-policy' },
            ].map((link) => (
              <Link key={link.name} to={link.path} className="text-xs text-gray-400 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

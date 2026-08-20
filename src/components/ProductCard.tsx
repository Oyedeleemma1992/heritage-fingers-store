import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { useOrder } from '../context/OrderContext';
import { ShoppingBag, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useOrder();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello Heritage Finger, I am interested in ordering ${product.name}. Please provide availability and price.`);
    window.open(`https://wa.me/447464053335?text=${text}`, '_blank');
  };

  const getImages = () => {
    let parsed: string[] = [];
    
    // 1. Check if the primary imageUrl is a comma-separated list (backend sometimes returns this)
    if (typeof product.imageUrl === 'string' && product.imageUrl.includes(',')) {
      parsed = product.imageUrl.split(',').map(s => s.trim());
    }
    // 2. Check if imageUrls array is provided
    else if (Array.isArray(product.imageUrls) && product.imageUrls.length > 0) {
      parsed = product.imageUrls;
    } 
    // 3. Check if imageUrls is a string (JSON or CSV)
    else if (typeof product.imageUrls === 'string' && product.imageUrls.length > 0) {
      try {
        parsed = JSON.parse(product.imageUrls as string);
      } catch {
        parsed = (product.imageUrls as string).split(',').map(s => s.trim());
      }
    } 
    // 4. Fallback to single primary image
    else if (product.imageUrl) {
      parsed = [product.imageUrl];
    }
    
    // Remove any empty strings or nulls
    return parsed.filter(Boolean);
  };

  const images = getImages();

  useEffect(() => {
    if (images.length <= 1) return;
    
    // Reset index if out of bounds (e.g. after filtering/navigating)
    if (currentImageIndex >= images.length) {
      setCurrentImageIndex(0);
    }
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [images.length, currentImageIndex]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {images.length > 0 ? images.map((img, idx) => (
          <img 
            key={idx}
            src={img as string} 
            alt={`${product.name} ${idx + 1}`} 
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105",
              idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          />
        )) : (
          <img 
            src={FALLBACK_IMAGE}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-sm opacity-0 group-hover:opacity-100 z-20 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-sm opacity-0 group-hover:opacity-100 z-20 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {!product.available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30">
            <span className="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow p-5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-medium text-[#C96B3B] uppercase tracking-wider">{product.category}</p>
          <span className="text-sm text-gray-500">{product.size}</span>
        </div>
        
        <h3 className="font-serif text-lg font-bold text-[#183C2B] mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto mb-4">
          <span className="text-lg font-bold text-[#171717]">
            {product.price ? `£${product.price.toFixed(2)}` : 'Price on request'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {product.price ? (
            <>
              <button
                onClick={() => addItem(product)}
                disabled={!product.available}
                className={cn(
                  "flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                  product.available 
                    ? "bg-[#183C2B] text-white hover:bg-[#11331e]" 
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                )}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Order
              </button>
              
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask on WA
              </button>
            </>
          ) : (
            <button
              onClick={handleWhatsApp}
              className="col-span-2 flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium bg-[#25D366] text-white hover:bg-[#1DA851] transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Enquire on WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

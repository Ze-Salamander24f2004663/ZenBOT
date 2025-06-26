import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { getAllPopularItems } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ProductBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items] = useState(getAllPopularItems());
  const { addToCart } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // 5 second delay as requested

    return () => clearInterval(interval);
  }, [items.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      type: item.id.startsWith('p') ? 'product' : 'service'
    });
  };

  if (items.length === 0) return null;

  return (
    <div className="relative bg-gradient-to-r from-teal-600 to-cyan-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="z-10">
            <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              Popular {items[currentIndex].id.startsWith('p') ? 'Product' : 'Service'}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {items[currentIndex].name}
            </h2>
            <p className="text-xl text-teal-100 mb-6 leading-relaxed">
              {items[currentIndex].description}
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-3xl font-bold">₹{items[currentIndex].price}</span>
              {items[currentIndex].id.startsWith('p') && (
                <span className="text-teal-200">per 10GB</span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => handleAddToCart(items[currentIndex])}
                className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden shadow-2xl">
              <img
                src={items[currentIndex].image}
                alt={items[currentIndex].name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
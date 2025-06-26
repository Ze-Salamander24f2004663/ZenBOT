import React, { useState } from 'react';
import { Search, ShoppingCart, User, ChevronDown, Salad as Salamander, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, searchQuery, onSearchChange }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('home');
    setShowDropdown(null);
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setShowDropdown(null);
    setShowMobileMenu(false);
  };

  const DropdownMenu = ({ title, items }: { title: string; items: { label: string; page: string }[] }) => (
    <div 
      className="relative"
      onMouseEnter={() => setShowDropdown(title)}
      onMouseLeave={() => setShowDropdown(null)}
    >
      <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 font-medium transition-colors">
        <span>{title}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {showDropdown === title && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          {items.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavigation(item.page)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavigation('home')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="bg-teal-600 p-2 rounded-lg group-hover:bg-teal-700 transition-colors">
              <Salamander className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Ze Salamander</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu 
              title="Products" 
              items={[
                { label: 'All Products', page: 'products' },
                { label: 'Cloud Storage', page: 'products' },
                { label: 'Business Solutions', page: 'products' }
              ]} 
            />
            <DropdownMenu 
              title="Services" 
              items={[
                { label: 'All Services', page: 'services' },
                { label: 'Migration', page: 'services' },
                { label: 'Support', page: 'services' }
              ]} 
            />
            <button 
              onClick={() => handleNavigation('about')}
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
            >
              Contact Us
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products and services..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Cart */}
                <button 
                  onClick={() => handleNavigation('cart')}
                  className="relative p-2 text-gray-700 hover:text-teal-600 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>

                {/* User Menu */}
                <div 
                  className="relative"
                  onMouseEnter={() => setShowDropdown('user')}
                  onMouseLeave={() => setShowDropdown(null)}
                >
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.firstName?.[0] || 'U'}
                    </div>
                    <span className="hidden sm:block font-medium">{user?.firstName}</span>
                  </button>
                  {showDropdown === 'user' && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                      <button
                        onClick={() => handleNavigation('dashboard')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      >
                        Dashboard
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <button 
                  onClick={() => handleNavigation('login')}
                  className="px-4 py-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => handleNavigation('register')}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-700 hover:text-teal-600 transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-2">
                <button onClick={() => handleNavigation('products')} className="text-left py-2 text-gray-700 hover:text-teal-600">Products</button>
                <button onClick={() => handleNavigation('services')} className="text-left py-2 text-gray-700 hover:text-teal-600">Services</button>
                <button onClick={() => handleNavigation('about')} className="text-left py-2 text-gray-700 hover:text-teal-600">About Us</button>
                <button onClick={() => handleNavigation('contact')} className="text-left py-2 text-gray-700 hover:text-teal-600">Contact Us</button>
                
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                    <button onClick={() => handleNavigation('login')} className="text-left py-2 text-teal-600">Login</button>
                    <button onClick={() => handleNavigation('register')} className="text-left py-2 bg-teal-600 text-white rounded-lg px-4">Register</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
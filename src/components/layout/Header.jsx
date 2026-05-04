import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
  FiPhone, FiMail
} from 'react-icons/fi';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import { categories } from '../../data/categories';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const cartCount = useCartStore(state => state.getCartCount());
  const wishlistCount = useWishlistStore(state => state.getWishlistCount());

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:+911234567890" className="flex items-center gap-1 hover:text-green-200">
                <FiPhone size={14} />
                <span>+91 123-456-7890</span>
              </a>
              <a href="mailto:info@ssherbal.com" className="hidden md:flex items-center gap-1 hover:text-green-200">
                <FiMail size={14} />
                <span>info@ssherbal.com</span>
              </a>
            </div>
            <div className="text-sm">
              <span>🎉 Free Shipping on Orders Above ₹499</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/Images/image.png" 
              alt="SS Herbal India" 
              className="h-24 w-auto"
            />
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Ayurvedic products..."
                className="w-full px-4 py-2.5 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-md hover:bg-primary-dark"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative hover:text-primary transition-colors">
              <FiHeart size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-primary transition-colors">
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link to="/account" className="hidden md:block hover:text-primary transition-colors">
              <FiUser size={24} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-md"
            >
              <FiSearch size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden md:block bg-gray-50 border-t border-gray-200">
        <div className="container-custom">
          <ul className="flex items-center gap-8 py-3">
            <li>
              <Link to="/" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link to="/products" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Shop All
              </Link>
              
              {/* Mega Menu */}
              <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-6">
                <div className="grid grid-cols-4 gap-6">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/products/${category.slug}`}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-4xl">{category.icon}</div>
                      <span className="text-sm font-medium text-center">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link to="/about" className="font-medium text-gray-700 hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="font-medium text-gray-700 hover:text-primary transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="container-custom">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop All
              </Link>
              
              {/* Categories */}
              <div className="pl-4 space-y-2">
                {categories.slice(0, 6).map(category => (
                  <Link
                    key={category.id}
                    to={`/products/${category.slug}`}
                    className="block text-sm text-gray-600 hover:text-primary py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.icon} {category.name}
                  </Link>
                ))}
              </div>
              
              <Link 
                to="/about" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQs
              </Link>
              <Link 
                to="/account" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

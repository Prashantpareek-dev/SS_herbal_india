'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
  FiPhone, FiMail, FiGift
} from 'react-icons/fi';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import useRewardsStore from '../../store/rewardsStore';
import ScrollingAnnouncementBar from '../common/ScrollingAnnouncementBar';
import CartDropdown from '../common/CartDropdown';
import WishlistDropdown from '../common/WishlistDropdown';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showIngredientsMenu, setShowIngredientsMenu] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  
  const cartCount = useCartStore(state => state.getCartCount());
  const wishlistCount = useWishlistStore(state => state.getWishlistCount());
  const { totalPoints } = useRewardsStore();

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      {/* Scrolling Announcement Bar */}
      <ScrollingAnnouncementBar />

      {/* Main Header */}
      <div className="container-custom py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* <img 
              src="/Images/image.png" 
              alt="SS Herbal India" 
              className="h-24 w-auto"
            /> */}
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent font-company">SS Herbal India</div>
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
            {/* Rewards - Desktop */}
            <Link href="/rewards" className="hidden md:flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors">
              <FiGift className="text-green-600" size={20} />
              <span className="text-sm font-semibold text-green-700">{totalPoints} pts</span>
            </Link>
            
            {/* Rewards - Mobile */}
            <Link href="/rewards" className="md:hidden relative hover:text-primary transition-colors">
              <FiGift size={24} className="text-green-600" />
              {totalPoints > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                  {totalPoints}
                </span>
              )}
            </Link>

            {/* Wishlist with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowWishlistDropdown(true)}
              onMouseLeave={() => setShowWishlistDropdown(false)}
            >
              <Link href="/wishlist" className="relative hover:text-primary transition-colors block">
                <FiHeart size={24} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <WishlistDropdown
                isVisible={showWishlistDropdown}
                onClose={() => setShowWishlistDropdown(false)}
              />
            </div>

            {/* Cart with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowCartDropdown(true)}
              onMouseLeave={() => setShowCartDropdown(false)}
            >
              <Link href="/cart" className="relative hover:text-primary transition-colors block">
                <FiShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <CartDropdown 
                isVisible={showCartDropdown} 
                onClose={() => setShowCartDropdown(false)} 
              />
            </div>

            {/* User */}
            <Link href="/account" className="hidden md:block hover:text-primary transition-colors">
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
          <ul className="flex items-center gap-6 py-3">
            {/* Home */}
            <li>
              <Link href="/" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
            </li>

            {/* Shop By Category with Dropdown */}
            <li className="relative group">
              <button className="font-medium text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
                Shop By Category
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50">
                <Link href="/products/beard-growth" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Beard Growth (Serum & Oil)
                </Link>
                <Link href="/products/thyroid-care" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Thyroid Care
                </Link>
                <Link href="/products/hypertension" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Hypertension (BP Care)
                </Link>
                <Link href="/products/piles-care" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Piles Care
                </Link>
                <Link href="/products/hair-care" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Hair Care
                </Link>
                <Link href="/products/pain-relief" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Pain Relief and Joint Care
                </Link>
                <Link href="/products/diabetes-care" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Diabetes Care
                </Link>
                <Link href="/products/weight-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Weight Management and Fitness
                </Link>
                <Link href="/products/liver-detox" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Liver and Detox Support
                </Link>
                <Link href="/products/mens-wellness" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Men's Wellness
                </Link>
                <Link href="/products/immunity" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Immunity and General Wellness
                </Link>
                <Link href="/products/womens-health" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Women's Health
                </Link>
                <Link href="/products/combos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Combos
                </Link>
                <Link href="/products/face-wash" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Face Wash
                </Link>
                <div className="border-t border-gray-200 my-2"></div>
                <Link href="/products/daily-ayurveda" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Daily Ayurveda & Grocery
                </Link>
                <Link href="/products/gym-fitness" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Gym & Fitness
                </Link>
                <Link href="/products/energy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Energy
                </Link>
                <Link href="/products/sugar-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Sugar Management
                </Link>
                <Link href="/products/skin-hair" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Skin & Hair
                </Link>
                <Link href="/products/heart-health" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Heart Health
                </Link>
              </div>
            </li>

            {/* Shop All */}
            <li>
              <Link href="/products" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Shop All
              </Link>
            </li>

            {/* Free Video Consultation */}
            <li>
              <Link href="/consultation" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Free Video Consultation
              </Link>
            </li>

            {/* Blogs */}
            <li>
              <Link href="/blogs" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Blogs
              </Link>
            </li>

            {/* Diabetes Test */}
            <li>
              <Link href="/diabetes-test" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Diabetes Test
              </Link>
            </li>

            {/* Track Order */}
            <li>
              <Link href="/track-order" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Track Order
              </Link>
            </li>

            {/* Ingredients with Dropdown */}
            <li className="relative group">
              <button className="font-medium text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
                Ingredients
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50 max-h-96 overflow-y-auto">
                <Link href="/products?ingredient=aloe-vera" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Aloe Vera
                </Link>
                <Link href="/products?ingredient=amla" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Amla
                </Link>
                <Link href="/products?ingredient=ashwagandha" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Ashwagandha
                </Link>
                <Link href="/products?ingredient=brahmi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Brahmi
                </Link>
                <Link href="/products?ingredient=garcinia" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Garcinia
                </Link>
                <Link href="/products?ingredient=giloy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Giloy
                </Link>
                <Link href="/products?ingredient=moringa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Moringa
                </Link>
                <Link href="/products?ingredient=noni" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Noni
                </Link>
                <Link href="/products?ingredient=rose" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Rose
                </Link>
                <Link href="/products?ingredient=shilajeet" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Shilajeet
                </Link>
                <Link href="/products?ingredient=spirulina" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Spirulina
                </Link>
                <Link href="/products?ingredient=tulsi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Tulsi
                </Link>
                <Link href="/products?ingredient=turmeric" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Turmeric
                </Link>
                <Link href="/products?ingredient=wheatgrass" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Wheatgrass
                </Link>
                <Link href="/products?ingredient=plant-protein" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                  Plant Protein
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 max-h-[70vh] overflow-y-auto">
          <div className="container-custom">
            <nav className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Shop By Category - Mobile */}
              <div>
                <button
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className="w-full text-left text-gray-700 font-medium hover:text-primary transition-colors py-2 flex items-center justify-between"
                >
                  Shop By Category
                  <svg 
                    className={`w-4 h-4 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showCategoryMenu && (
                  <div className="pl-4 space-y-1 mt-1">
                    <Link href="/products/beard-growth" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Beard Growth (Serum & Oil)
                    </Link>
                    <Link href="/products/thyroid-care" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Thyroid Care
                    </Link>
                    <Link href="/products/hypertension" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Hypertension (BP Care)
                    </Link>
                    <Link href="/products/piles-care" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Piles Care
                    </Link>
                    <Link href="/products/hair-care" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Hair Care
                    </Link>
                    <Link href="/products/pain-relief" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Pain Relief and Joint Care
                    </Link>
                    <Link href="/products/diabetes-care" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Diabetes Care
                    </Link>
                    <Link href="/products/weight-management" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Weight Management and Fitness
                    </Link>
                    <Link href="/products/liver-detox" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Liver and Detox Support
                    </Link>
                    <Link href="/products/mens-wellness" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Men's Wellness
                    </Link>
                    <Link href="/products/immunity" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Immunity and General Wellness
                    </Link>
                    <Link href="/products/womens-health" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Women's Health
                    </Link>
                    <Link href="/products/combos" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Combos
                    </Link>
                    <Link href="/products/face-wash" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Face Wash
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <Link href="/products/daily-ayurveda" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Daily Ayurveda & Grocery
                    </Link>
                    <Link href="/products/gym-fitness" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Gym & Fitness
                    </Link>
                    <Link href="/products/energy" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Energy
                    </Link>
                    <Link href="/products/sugar-management" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Sugar Management
                    </Link>
                    <Link href="/products/skin-hair" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Skin & Hair
                    </Link>
                    <Link href="/products/heart-health" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Heart Health
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                href="/products" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop All
              </Link>

              <Link 
                href="/consultation" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Video Consultation
              </Link>

              <Link 
                href="/blogs" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>

              <Link 
                href="/diabetes-test" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Diabetes Test
              </Link>

              <Link 
                href="/track-order" 
                className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Order
              </Link>

              {/* Ingredients - Mobile */}
              <div>
                <button
                  onClick={() => setShowIngredientsMenu(!showIngredientsMenu)}
                  className="w-full text-left text-gray-700 font-medium hover:text-primary transition-colors py-2 flex items-center justify-between"
                >
                  Ingredients
                  <svg 
                    className={`w-4 h-4 transition-transform ${showIngredientsMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showIngredientsMenu && (
                  <div className="pl-4 space-y-1 mt-1">
                    <Link href="/products?ingredient=aloe-vera" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Aloe Vera
                    </Link>
                    <Link href="/products?ingredient=amla" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Amla
                    </Link>
                    <Link href="/products?ingredient=ashwagandha" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Ashwagandha
                    </Link>
                    <Link href="/products?ingredient=brahmi" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Brahmi
                    </Link>
                    <Link href="/products?ingredient=garcinia" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Garcinia
                    </Link>
                    <Link href="/products?ingredient=giloy" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Giloy
                    </Link>
                    <Link href="/products?ingredient=moringa" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Moringa
                    </Link>
                    <Link href="/products?ingredient=noni" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Noni
                    </Link>
                    <Link href="/products?ingredient=rose" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Rose
                    </Link>
                    <Link href="/products?ingredient=shilajeet" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Shilajeet
                    </Link>
                    <Link href="/products?ingredient=spirulina" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Spirulina
                    </Link>
                    <Link href="/products?ingredient=tulsi" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Tulsi
                    </Link>
                    <Link href="/products?ingredient=turmeric" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Turmeric
                    </Link>
                    <Link href="/products?ingredient=wheatgrass" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Wheatgrass
                    </Link>
                    <Link href="/products?ingredient=plant-protein" className="block text-sm text-gray-600 hover:text-primary py-1.5" onClick={() => setIsMenuOpen(false)}>
                      Plant Protein
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

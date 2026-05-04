import { Link } from 'react-router-dom';
import { 
  FiFacebook, FiInstagram, FiTwitter, FiYoutube,
  FiMail, FiPhone, FiMapPin
} from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <img 
              src="/Images/image.png" 
              alt="Ss Herbal India" 
              className="h-30 w-auto mb-4 "
            />
            <p className="text-sm leading-relaxed mb-4">
              SS Herbal India provides premium Ayurvedic nutrition products made from 100% natural ingredients. 
              Trusted for quality, purity, and traditional wisdom.
            </p>
            
            {/* Certifications */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="bg-white text-green-600 px-3 py-1 rounded text-xs font-bold">
                GMP
              </div>
              <div className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-bold">
                ISO 22000
              </div>
              <div className="bg-white text-orange-600 px-3 py-1 rounded text-xs font-bold">
                FSSAI
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Health Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-1 flex-shrink-0" size={18} />
                <span className="text-sm">
                  123 Wellness Street, Ayurveda Nagar, Delhi - 110001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={18} />
                <a href="tel:+911234567890" className="hover:text-white">
                  +91 123-456-7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail size={18} />
                <a href="mailto:info@ssherbal.com" className="hover:text-white">
                  info@ssherbal.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-medium mb-2">Newsletter</h4>
              <p className="text-sm mb-3">Subscribe for health tips & offers</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary text-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm mb-2">We Accept:</p>
              <div className="flex items-center gap-3">
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-800">
                  UPI
                </div>
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-800">
                  Cards
                </div>
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-800">
                  Wallets
                </div>
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-800">
                  COD
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm mb-2">Follow Us:</p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-primary p-2 rounded-full transition-colors"
                >
                  <FiFacebook size={20} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-primary p-2 rounded-full transition-colors"
                >
                  <FiInstagram size={20} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-primary p-2 rounded-full transition-colors"
                >
                  <FiTwitter size={20} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-primary p-2 rounded-full transition-colors"
                >
                  <FiYoutube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
            <p>© {new Date().getFullYear()} SS Herbal India. All rights reserved.</p>
            <p className="text-gray-500">
              Made with ❤️ for Natural Wellness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

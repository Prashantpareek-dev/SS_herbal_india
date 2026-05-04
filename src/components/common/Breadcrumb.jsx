import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="py-4 bg-gray-50">
      <div className="container-custom">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
            >
              <FiHome size={16} />
              <span>Home</span>
            </Link>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <FiChevronRight className="text-gray-400" size={14} />
              {item.link ? (
                <Link 
                  to={item.link} 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;

const SkeletonLoader = ({ type = 'default', count = 1, className = '' }) => {
  const skeletons = Array(count).fill(0);

  const renderSkeleton = () => {
    switch (type) {
      case 'product-card':
        return (
          <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
            <div className="skeleton h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-4 space-y-3">
              <div className="skeleton h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="skeleton h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="skeleton h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="skeleton h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        );

      case 'banner':
        return (
          <div className={`skeleton h-96 md:h-[500px] bg-gray-200 rounded-lg ${className}`}></div>
        );

      case 'category-card':
        return (
          <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="skeleton h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="skeleton h-6 bg-gray-200 rounded w-40"></div>
              </div>
              <div className="skeleton h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="skeleton h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="skeleton h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="skeleton h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="skeleton h-3 bg-gray-200 rounded"></div>
              <div className="skeleton h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="skeleton h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            <div className="skeleton h-4 bg-gray-200 rounded"></div>
            <div className="skeleton h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="skeleton h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        );

      case 'title':
        return (
          <div className={`skeleton h-8 bg-gray-200 rounded w-1/2 mx-auto ${className}`}></div>
        );

      case 'circle':
        return (
          <div className={`skeleton bg-gray-200 rounded-full ${className}`}></div>
        );

      case 'rectangle':
        return (
          <div className={`skeleton bg-gray-200 rounded ${className}`}></div>
        );

      default:
        return (
          <div className={`skeleton h-32 bg-gray-200 rounded ${className}`}></div>
        );
    }
  };

  return (
    <>
      {skeletons.map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;

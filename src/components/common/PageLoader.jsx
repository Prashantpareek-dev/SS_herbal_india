import SkeletonLoader from './SkeletonLoader';

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-40 bg-white shadow-md">
        {/* Announcement Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-2">
          <div className="skeleton h-6 bg-green-500/30 rounded w-64 mx-auto"></div>
        </div>
        
        {/* Main Header */}
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="skeleton h-8 w-40 bg-gray-200 rounded"></div>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="skeleton h-10 w-full bg-gray-200 rounded-lg"></div>
            </div>
            
            {/* Icons */}
            <div className="flex items-center gap-4">
              <div className="skeleton h-8 w-20 bg-gray-200 rounded-full"></div>
              <div className="skeleton h-6 w-6 bg-gray-200 rounded-full"></div>
              <div className="skeleton h-6 w-6 bg-gray-200 rounded-full"></div>
              <div className="skeleton h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="container-custom py-3">
            <div className="flex items-center gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton h-4 w-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="flex-1">
        {/* Hero Banner Skeleton */}
        <div className="container-custom py-8">
          <SkeletonLoader type="banner" />
        </div>

        {/* Category Selector Skeleton */}
        <div className="py-12 bg-white">
          <div className="container-custom">
            <SkeletonLoader type="title" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <SkeletonLoader type="category-card" count={4} />
            </div>
          </div>
        </div>

        {/* Products Section Skeleton */}
        <div className="py-12 bg-gray-50">
          <div className="container-custom">
            <SkeletonLoader type="title" className="mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <SkeletonLoader type="product-card" count={8} />
            </div>
          </div>
        </div>

        {/* Testimonials Skeleton */}
        <div className="py-12 bg-white">
          <div className="container-custom">
            <SkeletonLoader type="title" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonLoader type="testimonial" count={3} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="skeleton h-6 w-32 bg-gray-700 rounded"></div>
                <div className="space-y-2">
                  <div className="skeleton h-3 bg-gray-700 rounded w-24"></div>
                  <div className="skeleton h-3 bg-gray-700 rounded w-28"></div>
                  <div className="skeleton h-3 bg-gray-700 rounded w-20"></div>
                  <div className="skeleton h-3 bg-gray-700 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLoader;

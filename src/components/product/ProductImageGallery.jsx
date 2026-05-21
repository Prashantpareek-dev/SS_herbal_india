import { useState, useEffect } from 'react';
import { FiZoomIn, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductImageGallery = ({ images, productName, selectedVariant }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset to first image when variant changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedVariant]);

  // Get images based on selected variant or default; filter out empty entries
  const displayImages = (
    selectedVariant?.images?.filter(Boolean).length > 0
      ? selectedVariant.images.filter(Boolean)
      : images?.filter(Boolean)
  ) || [];

  // Nothing to show — render placeholder
  if (displayImages.length === 0) {
    return (
      <div className="sticky top-24">
        <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-4 h-[500px] flex items-center justify-center">
          <span className="text-8xl opacity-20">🌿</span>
        </div>
      </div>
    );
  }

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="sticky top-24">
      {/* Main Image */}
      <div 
        className="relative bg-gray-50 rounded-2xl overflow-hidden mb-4 cursor-zoom-in group"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={displayImages[selectedImage]}
          alt={`${productName} - ${selectedImage + 1}`}
          className="w-full h-[500px] object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <FiChevronLeft size={24} className="text-gray-700" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <FiChevronRight size={24} className="text-gray-700" />
            </button>
          </>
        )}

        {/* Zoom Icon */}
        <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg">
          <FiZoomIn size={20} className="text-gray-700" />
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage + 1} / {displayImages.length}
        </div>

        {/* Variant Badge */}
        {selectedVariant && (
          <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {selectedVariant.colorName}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-5 gap-2">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative bg-gray-50 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
              selectedImage === index 
                ? 'border-primary-600 ring-2 ring-primary-200' 
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-20 object-contain p-1"
              loading="lazy"
            />
            {selectedImage === index && (
              <div className="absolute inset-0 bg-primary-600 bg-opacity-10"></div>
            )}
          </button>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-6xl max-h-screen">
            <img
              src={displayImages[selectedImage]}
              alt={productName}
              className="max-w-full max-h-screen object-contain"
              loading="lazy"
            />
            
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation in Zoom */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <FiChevronLeft size={32} className="text-gray-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <FiChevronRight size={32} className="text-gray-700" />
                </button>
              </>
            )}

            {/* Image Counter in Zoom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {selectedImage + 1} / {displayImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

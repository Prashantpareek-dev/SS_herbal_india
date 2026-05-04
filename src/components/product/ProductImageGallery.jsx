import { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi';

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="sticky top-24">
      {/* Main Image */}
      <div 
        className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={images[selectedImage]}
          alt={`${productName} - ${selectedImage + 1}`}
          className="w-full h-[500px] object-contain"
        />
        <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full">
          <FiZoomIn size={20} className="text-gray-700" />
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index 
                ? 'border-primary' 
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-24 object-contain"
            />
          </button>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={images[selectedImage]}
            alt={productName}
            className="max-w-full max-h-full object-contain"
          />
          <button 
            className="absolute top-4 right-4 text-white text-4xl"
            onClick={() => setIsZoomed(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

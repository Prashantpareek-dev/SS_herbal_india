import { useState } from 'react';

const ColorVariantSelector = ({ variants, selectedVariant, onSelectVariant }) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Color: <span className="text-gray-900">{selectedVariant?.colorName || 'Select'}</span>
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {variants.map((variant, index) => (
          <button
            key={index}
            onClick={() => onSelectVariant(variant)}
            className={`group relative flex flex-col items-center transition-all ${
              selectedVariant?.colorName === variant.colorName
                ? 'scale-105'
                : 'hover:scale-105'
            }`}
            title={variant.colorName}
          >
            {/* Color Swatch */}
            <div
              className={`w-12 h-12 rounded-full border-2 transition-all ${
                selectedVariant?.colorName === variant.colorName
                  ? 'border-primary-600 shadow-lg ring-2 ring-primary-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{ backgroundColor: variant.colorHex }}
            >
              {/* Checkmark for selected */}
              {selectedVariant?.colorName === variant.colorName && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Color Name */}
            <span className={`text-xs mt-1 transition-colors ${
              selectedVariant?.colorName === variant.colorName
                ? 'text-primary-600 font-semibold'
                : 'text-gray-600'
            }`}>
              {variant.colorName}
            </span>
            
            {/* Stock Badge */}
            {variant.stock < 5 && variant.stock > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {variant.stock} left
              </span>
            )}
            {variant.stock === 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                Out
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Selected Variant Details */}
      {selectedVariant && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-gray-600">Price: </span>
              <span className="font-bold text-primary-600">₹{selectedVariant.price}</span>
              {selectedVariant.originalPrice && (
                <span className="ml-2 text-gray-400 line-through">₹{selectedVariant.originalPrice}</span>
              )}
            </div>
            <div>
              <span className="text-gray-600">Stock: </span>
              <span className={`font-semibold ${
                selectedVariant.stock > 10 ? 'text-green-600' : selectedVariant.stock > 0 ? 'text-green-600' : 'text-gray-600'
              }`}>
                {selectedVariant.stock > 0 ? `${selectedVariant.stock} available` : 'Out of stock'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorVariantSelector;

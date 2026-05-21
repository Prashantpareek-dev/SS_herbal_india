'use client';
import { useState, useEffect } from 'react';
import useLocationStore from '../../store/locationStore';
import { majorCities, validatePinCode } from '../../data/locations';

const LocationModal = () => {
  const {
    showLocationModal,
    setLocation,
    setShowLocationModal,
    pinCode: savedPinCode
  } = useLocationStore();
  
  const [pinCode, setPinCode] = useState('');
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-detect location (mock)
  const handleAutoDetect = () => {
    setIsLoading(true);
    // Simulate geolocation API call
    setTimeout(() => {
      const mockPinCode = '110001'; // Mock Delhi pin code
      const result = setLocation(mockPinCode, 'Delhi');
      if (result.success) {
        setError('');
      }
      setIsLoading(false);
    }, 1000);
  };

  // Handle pin code input
  const handlePinCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPinCode(value);
    setError('');
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city.name);
    const firstPinCode = city.pinCodes[0];
    setPinCode(firstPinCode);
  };

  // Submit location
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePinCode(pinCode)) {
      setError('Please enter a valid 6-digit PIN code');
      return;
    }

    const result = setLocation(pinCode, selectedCity || null);
    if (result.success) {
      setError('');
      // Modal will close automatically
    } else {
      setError(result.error);
    }
  };

  // Skip for now
  const handleSkip = () => {
    setShowLocationModal(false);
  };

  if (!showLocationModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Select Your Location
          </h2>
          <p className="text-gray-600 text-sm">
            Get accurate delivery estimates and local offers
          </p>
        </div>

        {/* Auto-detect */}
        <button
          onClick={handleAutoDetect}
          disabled={isLoading}
          className="w-full mb-4 py-3 px-4 bg-primary-50 text-primary-600 rounded-lg font-medium hover:bg-primary-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              Detecting...
            </>
          ) : (
            <>
              <span className="text-xl">🎯</span>
              Auto-Detect My Location
            </>
          )}
        </button>

        <div className="text-center text-sm text-gray-500 mb-4">OR</div>

        {/* Popular Cities */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Popular Cities
          </label>
          <div className="grid grid-cols-2 gap-2">
            {majorCities.slice(0, 6).map((city) => (
              <button
                key={city.name}
                onClick={() => handleCitySelect(city)}
                className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                  selectedCity === city.name
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 text-gray-700 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* PIN Code Input */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
              Enter PIN Code
            </label>
            <input
              type="text"
              id="pincode"
              value={pinCode}
              onChange={handlePinCodeChange}
              placeholder="e.g., 110001"
              maxLength="6"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                error ? 'border-green-500' : 'border-gray-300'
              }`}
            />
            {error && (
              <p className="mt-1 text-sm text-green-600">{error}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Apply
          </button>
        </form>

        {/* Skip */}
        <button
          onClick={handleSkip}
          className="w-full mt-3 text-sm text-gray-600 hover:text-gray-900"
        >
          I'll do this later
        </button>
      </div>
    </div>
  );
};

export default LocationModal;

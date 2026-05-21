import { useState } from 'react';
import { FiX, FiSend } from 'react-icons/fi';

const DoctorChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleWhatsAppChat = () => {
    const whatsappNumber = '919876543210';
    const defaultMessage = message || 'Hi! I would like to consult with a doctor.';
    const encodedMessage = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  const quickMessages = [
    'I need a health consultation',
    'Product recommendation needed',
    'Book an appointment',
    'Ask about specific concern'
  ];

  const handleQuickMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">
                    <img src="../../../Images/Doctor.png" style={{ width: '100%', height: '100%', borderRadius: '50%' }} alt="Doctor" loading="lazy" />
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold">Dr. Ayurveda Expert</h3>
                <p className="text-xs text-green-100">Online • Responds in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4 bg-gray-50 max-h-96 overflow-y-auto">
            {/* Welcome Message */}
            <div className="mb-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-sm text-gray-700">
                  👋 Hello! I'm your Ayurvedic health consultant. How can I help you today?
                </p>
              </div>
            </div>

            {/* Quick Replies */}
            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-500 mb-2">Quick options:</p>
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(msg)}
                  className="block w-full text-left bg-white border border-green-200 hover:border-green-400 hover:bg-green-50 rounded-lg p-2 text-sm text-gray-700 transition-colors"
                >
                  {msg}
                </button>
              ))}
            </div>

            {/* Info Box */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <span className="text-lg">💚</span>
                <div className="text-xs text-gray-600">
                  <p className="font-semibold text-green-700 mb-1">Free Consultation</p>
                  <p>Get personalized advice from certified BAMS doctors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleWhatsAppChat()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-500 text-sm"
              />
              <button
                onClick={handleWhatsAppChat}
                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors flex items-center justify-center"
              >
                <FiSend size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by WhatsApp • Quick Response
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 md:right-6 z-50 group transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-75"></div>
        
        {/* Main Button */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white w-20 h-20 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform  ">
          <span className="text-3xl flex items-center justify-center">
            <img src="../../../Images/Doctor.png" style={{ width: '90%', height: '90%', borderRadius: '50%' }} alt="Doctor" loading="lazy" />
          </span>
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with Doctor
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>

        {/* Badge */}
        <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
          !
        </div>
      </button>
    </>
  );
};

export default DoctorChatBot;

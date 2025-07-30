import React from 'react';

const PinModal = ({ isOpen, onClose, onConfirm, pin, setPin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-100">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#169fcb] rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Enter PIN</h2>
              <p className="text-gray-600 text-sm">Please enter your PIN to complete the visit</p>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
              PIN Code
            </label>
            <input
              id="pin"
              type="password"
              placeholder="Enter your PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] text-center text-lg font-mono transition-colors"
              autoFocus
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!pin.trim()}
              className={`flex-1 px-4 py-3 rounded-md font-medium transition-colors ${
                pin.trim()
                  ? 'bg-[#169fcb] text-white hover:bg-[#128ab2]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinModal;
        
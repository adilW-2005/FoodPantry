import React from 'react';

const ItemDetail = ({ item, loading, onClose }) => {
   
    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#169fcb]"></div>
                        <p className="text-gray-600 ml-3">Loading item details...</p>
                    </div>
                </div>
            </div>
        );
    }
    
    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-gray-100 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-[#169fcb] rounded-lg flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
                                <p className="text-gray-600">
                                    {item.barcode ? 'Grocery Item' : 'Household Item'}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-md"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Type</p>
                                    <p className="text-gray-900">{item.barcode ? 'Grocery' : 'Home'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Total Quantity</p>
                                    <p className="text-gray-900 font-semibold">{item.total_quantity || item.quantity}</p>
                                </div>
                            </div>
                        </div>

                        {item.batches ? (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Batches</h3>
                                <div className="space-y-3">
                                    {item.batches.map((batch, i) => (
                                        <div key={i} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-gray-900">Batch {i + 1}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Expires: {new Date(batch.expiration_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-[#169fcb]">{batch.quantity}</p>
                                                    <p className="text-xs text-gray-500">available</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900">Available Stock</p>
                                        <p className="text-sm text-gray-600">Ready for distribution</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-[#169fcb]">{item.quantity}</p>
                                        <p className="text-xs text-gray-500">items</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="w-full bg-[#169fcb] text-white px-4 py-3 rounded-md hover:bg-[#128ab2] transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default ItemDetail;
  
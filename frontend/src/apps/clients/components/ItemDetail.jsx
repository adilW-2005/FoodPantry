import React from 'react';

const ItemDetail = ({ item, loading, onClose }) => {
   
    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-center">Loading item...</p>
                </div>
            </div>
        );
    }
    
    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                    >
                        ×
                    </button>
                </div>
                <p className="text-gray-700 mb-1">
                    <strong>Type:</strong> {item.barcode ? 'Grocery' : 'Home'}
                </p>
                {item.batches ? (
                    <div>
                        <p className="text-gray-700 mb-2">
                            <strong>Total Quantity:</strong> {item.total_quantity}
                        </p>
                        <h3 className="font-semibold mt-4">Batches:</h3>
                        <ul className="list-disc pl-6 text-sm text-gray-600">
                            {item.batches.map((batch, i) => (
                                <li key={i}>
                                    Qty: {batch.quantity}, Exp: {batch.expiration_date}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                )}
            </div>
        </div>
    );
};
  
  export default ItemDetail;
  
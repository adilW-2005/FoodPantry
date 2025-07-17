const ItemDetail = ({ item, loading, onClose }) => {
    if (loading) return <p className="text-center mt-8">Loading item...</p>;
    if (!item) return null;
  
    return (
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
          <button onClick={onClose} className="text-blue-600 hover:underline text-sm">
            Close
          </button>
        </div>
        <p className="text-gray-700 mb-1"><strong>Type:</strong> {item.barcode ? 'Grocery' : 'Home'}</p>
        {item.batches ? (
          <div>
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
    );
  };
  
  export default ItemDetail;
  
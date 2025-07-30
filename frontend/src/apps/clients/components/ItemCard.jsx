const ItemCard = ({ item, onClick, selected }) => (
  <div
    onClick={() => onClick(item)}
    className={`cursor-pointer bg-white rounded-lg shadow-md border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
      selected 
        ? 'border-[#169fcb] bg-blue-50 shadow-lg' 
        : 'border-gray-100 hover:border-[#169fcb]'
    }`}
  >
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.name}</h3>
        {selected && (
          <div className="flex-shrink-0 ml-2">
            <svg className="w-5 h-5 text-[#169fcb]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600 flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          {item.type === 'grocery'
            ? `${item.batches?.length || 0} batches available`
            : `${item.quantity || 0} items in stock`}
        </p>
        
        <div className="flex items-center text-xs">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.type === 'grocery' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {item.type === 'grocery' ? 'Food Item' : 'Household Item'}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Click for details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default ItemCard;

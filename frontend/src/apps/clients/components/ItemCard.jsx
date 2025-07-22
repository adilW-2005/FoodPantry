const ItemCard = ({ item, onClick, selected }) => (
  <div
    onClick={() => onClick(item)}
    className={`cursor-pointer bg-white p-4 rounded-lg shadow transition border-2 ${
      selected ? 'border-green-500 bg-green-100' : 'border-transparent hover:shadow-lg'
    }`}
  >
    <h3 className="font-semibold text-gray-800">{item.name}</h3>
    <p className="text-gray-600 text-sm mt-1">
      {item.type === 'grocery'
        ? `${item.batches?.length || 0} batches`
        : `${item.quantity || 0} in stock`}
    </p>
  </div>
);

export default ItemCard;

const ItemCard = ({ item, onClick }) => (
    <div
      onClick={() => onClick(item.id, item.type)}
      className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
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
  
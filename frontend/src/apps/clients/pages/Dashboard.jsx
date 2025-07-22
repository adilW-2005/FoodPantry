import React, { useEffect, useState } from 'react';
import { viewItem, fetchItems } from '../api/inventory';
import DashboardHeader from '../components/DashboardHeader';
import ItemCard from '../components/ItemCard';
import ItemDetail from '../components/ItemDetail';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const allItems = await fetchItems();
        setItems(allItems);
      } catch (err) {
        console.error('Error loading items:', err);
      } finally {
        setLoadingItems(false);
      }
    };
    load();
  }, []);

  const handleItemClick = async (id, item_type) => {
    if (id === selectedItemId) {
      setSelectedItemId(null);
      setSelectedItemDetails(null);
      return;
    }

    setSelectedItemId(id);
    setLoadingDetail(true);
    try {
      const data = await viewItem(id, item_type);
      setSelectedItemDetails(data.item);
    } catch (err) {
      console.error('Error loading item details:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardHeader />
      
      {/* Search */}
      <div className="max-w-md mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid */}
      {loadingItems ? (
        <p className="text-center py-8 text-gray-500">Loading items...</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} onClick={handleItemClick} />
          ))}
        </div>
      )}

      {/* Detail */}
      <ItemDetail
        item={selectedItemDetails}
        loading={loadingDetail}
        onClose={() => {
          setSelectedItemId(null);
          setSelectedItemDetails(null);
        }}
      />
    </div>
  );
};

export default Dashboard;

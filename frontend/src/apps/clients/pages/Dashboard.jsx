import React, { useEffect, useState } from 'react';
import { viewItem, fetchItems } from '../api/inventory';
import DashboardHeader from '../components/DashboardHeader';
import ItemCard from '../components/ItemCard';
import ItemDetail from '../components/ItemDetail';
import logo from '../../../assets/annisa logo antry.png';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#169fcb] to-[#0d7aa7] shadow-lg border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="AnNisa Pantry Logo" 
                className="h-50 w-50 object-contain mr-3 rounded-lg p-1"
              />
              <h1 className="text-2xl font-bold text-white">AnNisa Food Pantry</h1>
            </div>
            <p className="text-blue-100 font-medium">Client Portal</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardHeader />
        
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Items</h2>
          <p className="text-gray-600 mb-4">
            Browse our current inventory of food and household items. Click on any item to view details.
          </p>
          
          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] sm:text-sm transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {loadingItems ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#169fcb]"></div>
            <p className="text-gray-500 mt-4">Loading items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No items are currently available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onClick={(item) => handleItemClick(item.id, item.type)}
                selected={selectedItemId === item.id}
              />
            ))}
          </div>
        )}

        {/* Item Detail Modal */}
        <ItemDetail
          item={selectedItemDetails}
          loading={loadingDetail}
          onClose={() => {
            setSelectedItemId(null);
            setSelectedItemDetails(null);
          }}
        />
      </main>
    </div>
  );
};

export default Dashboard;

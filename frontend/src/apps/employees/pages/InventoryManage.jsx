import React, { useEffect, useState } from 'react';
import {
  fetchItems,
  deleteItem,
  createItem,
  viewItem,
  decreaseItemQuantity,
  editBatch
} from '../api/inventory';

function InventoryManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadItems = async () => {
    try {
      const allItems = await fetchItems();
      setItems(allItems);
    } catch (err) {
      console.error('Error loading inventory:', err);
      alert('Failed to load inventory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (item) => {
    const confirmMsg = item.type === 'grocery' 
      ? 'Are you sure you want to delete this batch?' 
      : 'Are you sure you want to delete this item?';
    
    if (!window.confirm(confirmMsg)) return;
    
    try {
      if (item.type === 'grocery') {
        // For grocery items, delete by item_id (which will delete the whole item and all batches)
        await deleteItem(item.item_id, item.type);
        // Remove all batches of this item from the local state
        setItems((prev) => prev.filter((i) => i.item_id !== item.item_id || i.type !== 'grocery'));
      } else {
        // For home items, delete by item id
        await deleteItem(item.id, item.type);
        setItems((prev) => prev.filter((i) => i.id !== item.id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete item.');
    }
  };

  const handleCreateItem = async () => {
    const name = prompt('Enter item name:');
    const item_type = prompt('Is it a "grocery" or "home" item?');
    const unit = item_type === 'grocery' ? prompt('Enter unit (e.g. lbs, cans):') : null;
    const expiration_date = item_type === 'grocery' ? prompt('Enter expiration date (YYYY-MM-DD):') : null;

    try {
      const data = {
        name,
        unit,
        item_type,
        quantity: 0,
        category: '',
        expiration_date
      };
      await createItem(data);
      alert('Item created!');
      loadItems();
    } catch (err) {
      alert('Failed to create item.');
    }
  };

  const handleDecreaseQty = async (item) => {
    const quantity = parseInt(prompt(`How much to decrease from "${item.name}"?`));
    if (!quantity || quantity <= 0) return;
    try {
      if (item.type === 'grocery') {
        // For grocery batches, use the batch ID
        await decreaseItemQuantity(item.batch_id, { quantity, item_type: item.type });
      } else {
        // For home items, use the item ID
        await decreaseItemQuantity(item.id, { quantity, item_type: item.type });
      }
      alert('Quantity updated!');
      loadItems();
    } catch (err) {
      console.error('Error decreasing quantity:', err);
      alert('Failed to decrease quantity.');
    }
  };

  const handleEditBatch = async (item) => {
    if (item.type !== 'grocery') {
      alert('Only grocery items have batches to edit');
      return;
    }
    try {
      const quantity = parseInt(prompt('New batch quantity:'));
      const expiration_date = prompt('New expiration date (YYYY-MM-DD):');

      if (!quantity || quantity < 0) return alert('Invalid quantity');
      if (!expiration_date) return alert('Expiration date is required');

      await editBatch(item.batch_id, { quantity, expiration_date });
      alert('Batch updated!');
      loadItems();
    } catch (err) {
      console.error(err);
      alert('Batch edit failed.');
    }
  };

  const grouped = {
    grocery: items.filter((i) => i.type === 'grocery'),
    home: items.filter((i) => i.type === 'home'),
  };

  const filteredGrocery = grouped.grocery.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHome = grouped.home.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-[#169fcb]">AnNisa Pantry</h1>
            <p className="text-gray-600">Inventory Management</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h2>
          <p className="text-gray-600">
            Manage food items, household goods, and track inventory levels
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900">Inventory Database</h3>
              <p className="text-gray-600 text-sm">Add new items and manage existing inventory</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Search */}
              <div className="w-full md:w-80">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] sm:text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Add New Item Button */}
              <button
                className="bg-[#169fcb] text-white px-6 py-2 rounded-md hover:bg-[#128ab2] transition-colors font-medium flex items-center whitespace-nowrap"
                onClick={handleCreateItem}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Item
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-[#169fcb]">{items.length}</p>
              <p className="text-sm text-gray-600">Total Items</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{grouped.grocery.length}</p>
              <p className="text-sm text-gray-600">Grocery Batches</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{grouped.home.length}</p>
              <p className="text-sm text-gray-600">Home Items</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#169fcb]"></div>
            <p className="text-gray-500 mt-4">Loading inventory...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No inventory items found</h3>
            <p className="mt-1 text-gray-500">Get started by adding your first inventory item.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Grocery Items */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-green-50 px-6 py-4 border-b border-green-200">
                <h3 className="text-lg font-bold text-green-800 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Grocery Batches ({filteredGrocery.length})
                </h3>
              </div>
              
              {filteredGrocery.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  {searchTerm ? 'No grocery items match your search.' : 'No grocery items available.'}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-6">
                  {filteredGrocery.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                        <span className="text-lg font-bold text-green-600">{item.total_quantity}</span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p>Category: {item.category || 'N/A'}</p>
                        {item.unit && <p>Unit: {item.unit}</p>}
                        <p>Expires: {new Date(item.expiration_date).toLocaleDateString()}</p>
                        <p className={item.days_until_expiration <= 3 ? 'text-red-600 font-medium' : ''}>
                          Days until expiration: {item.days_until_expiration}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="text-[#169fcb] text-sm hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                          onClick={() => handleEditBatch(item)}
                        >
                          Edit Batch
                        </button>
                        <button
                          className="text-orange-600 text-sm hover:bg-orange-50 px-2 py-1 rounded transition-colors"
                          onClick={() => handleDecreaseQty(item)}
                        >
                          Decrease Qty
                        </button>
                        <button
                          className="text-red-600 text-sm hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Home Items */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v2z" />
                  </svg>
                  Home Items ({filteredHome.length})
                </h3>
              </div>
              
              {filteredHome.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  {searchTerm ? 'No home items match your search.' : 'No home items available.'}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-6">
                  {filteredHome.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                        <span className="text-lg font-bold text-blue-600">{item.total_quantity}</span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p>Category: {item.category || 'N/A'}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="text-orange-600 text-sm hover:bg-orange-50 px-2 py-1 rounded transition-colors"
                          onClick={() => handleDecreaseQty(item)}
                        >
                          Decrease Qty
                        </button>
                        <button
                          className="text-red-600 text-sm hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default InventoryManage;

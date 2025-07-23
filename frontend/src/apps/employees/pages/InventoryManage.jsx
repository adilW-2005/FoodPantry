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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        AnNisa Pantry Inventory Management
      </h1>

      <div className="text-center mb-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleCreateItem}
        >
          + Create New Item
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center mt-8">Loading inventory...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">No inventory items found.</p>
      ) : (
        <>
          {['grocery', 'home'].map((type) => (
            <div key={type} className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 capitalize mb-2">
                {type === 'grocery' ? 'Grocery Batches' : 'Home Items'}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {grouped[type].map((item) => (
                  <div key={`${item.type}-${item.id}`} className="bg-white p-4 shadow rounded">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.total_quantity}</p>
                    <p className="text-sm text-gray-500">Category: {item.category || 'N/A'}</p>
                    {item.unit && <p className="text-sm text-gray-500">Unit: {item.unit}</p>}
                    
                    {/* Show batch-specific info for grocery items */}
                    {item.type === 'grocery' && (
                      <>
                        <p className="text-sm text-gray-500">
                          Expires: {new Date(item.expiration_date).toLocaleDateString()}
                        </p>
                        <p className={`text-sm ${item.days_until_expiration <= 3 ? 'text-red-600' : 'text-gray-500'}`}>
                          Days until expiration: {item.days_until_expiration}
                        </p>
                      </>
                    )}
                    
                    <div className="mt-3 flex gap-3 flex-wrap">
                        {item.type === 'grocery' && (
                          <button
                            className="text-blue-600 text-sm hover:underline"
                            onClick={() => handleEditBatch(item)}
                          >
                            Edit Batch
                          </button>
                        )}
                        <button
                          className="text-yellow-600 text-sm hover:underline"
                          onClick={() => handleDecreaseQty(item)}
                        >
                          Decrease Qty
                        </button>
                        <button
                          className="text-red-600 text-sm hover:underline"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </button>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default InventoryManage;

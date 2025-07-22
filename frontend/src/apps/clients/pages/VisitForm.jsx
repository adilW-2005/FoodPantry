import React, { useEffect, useState } from 'react'
import { fetchItems } from '../api/inventory';
import DashboardHeader from '../components/DashboardHeader';
import PinModal from '../components/PinModal';
import QuantityInput from '../components/QuantityInput';
import { startVisit } from '../api/visit';
import { submitVisit } from '../api/visit';
import { useNavigate } from 'react-router-dom';

function VisitForm() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loadingItems, setLoadingItems] = useState(true);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const [grocerySelections, setGrocerySelections] = useState({});
    const [homeSelections, setHomeSelections] = useState({});

    const [visitId, setVisitId] = useState(null);
    const [pin, setPin] = useState('');
    const [showPinModal, setShowPinModal] = useState(false);

    const handleCancelVisit = () => {
        if (window.confirm("Are you sure you want to cancel this visit?")) {
            setName('');
            setAddress('');
            setGrocerySelections({});
            setHomeSelections({});
            setVisitId(null);
            setPin('');
            setShowPinModal(false);
            }
        navigate('/client/dashboard');
        };
      

    const grocery_items = Object.entries(grocerySelections)
    .filter(([_, qty]) => qty > 0)
    .map(([batch_id, quantity]) => ({
        batch_id: Number(batch_id),
        quantity,
    }));

    const home_items = Object.entries(homeSelections)
    .filter(([_, qty]) => qty > 0)
    .map(([item_id, quantity]) => ({
        item_id: Number(item_id),
        quantity,
    }));

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

    const handleStartVisit = async () => {
        if (!name.trim() || !address.trim()) {
            alert('Please enter your name and address.');
            return;
        }        
        try {
            const res = await startVisit({ name, address });
            setVisitId(res.visit_id);
            setShowPinModal(true);
        } catch (err) {
            console.error('Failed to start visit:', err);
            alert('Could not start visit. Try again.');
        }
    };     

    const handleSubmitVisit = async () => {
    
        if (!visitId) {
            alert('Visit not initialized.');
            return;
        }

        if (!pin || pin.trim().length === 0) {
            alert('Please enter a valid PIN.');
            return;
        }

        try {
            await submitVisit({
            visit_id: visitId,
            grocery_items,
            home_items,
            pin,
            });

            alert('Visit submitted successfully!');
            setShowPinModal(false);
            // optionally reset state or navigate
        } catch (error) {
            console.error('Failed to submit visit:', error);
            alert('Failed to submit visit. Please check your PIN or try again.');
        }
    };
            

    const handleGroceryQuantityChange = (batch_id, quantity) => {
        setGrocerySelections(prev => ({
        ...prev,
        [batch_id]: quantity > 0 ? quantity : undefined,
        }));
    };
    
    const handleHomeQuantityChange = (item_id, quantity) => {
        setHomeSelections(prev => ({
        ...prev,
        [item_id]: quantity > 0 ? quantity : undefined,
        }));
    };
    
    return (
    <div>
        <DashboardHeader onCancel={handleCancelVisit}/>

        <div className="max-w-xl mx-auto mb-6 space-y-4">
        <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        </div>

    <div className="container mx-auto p-4">
        <h2 className="text-lg font-semibold mt-8 mb-2">Grocery Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items
            .filter(item => item.type === 'grocery')
            .map(item => (
            <div key={item.id} className="border rounded p-3 bg-white shadow-sm">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                {item.batches.map(batch => (
                <div key={batch.id} className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">
                    Exp: {batch.expiration_date} | Qty: {batch.quantity}
                    </span>
                    <QuantityInput
                    value={grocerySelections[batch.id] || ''}
                    max={batch.quantity}
                    onChange={quantity => handleGroceryQuantityChange(batch.id, quantity)}
                    />
                </div>
                ))}
            </div>
            ))}
        </div>
                <h2 className="text-lg font-semibold mt-8 mb-2">Home Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items
            .filter(item => item.type === 'home')
            .map(item => (
            <div key={item.id} className="border rounded p-3 bg-white shadow-sm">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">In stock: {item.quantity}</p>
                <QuantityInput
                    value={homeSelections[item.id] || ''}
                    max={item.quantity}
                    onChange={quantity => handleHomeQuantityChange(item.id, quantity)}
                />
            </div>
        ))}
        </div>
        </div>

                <div className="text-center mt-10">
        <button
            onClick={handleStartVisit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
            Continue to PIN
        </button>
        </div>

        <PinModal
            isOpen={showPinModal}
            onClose={() => setShowPinModal(false)}
            onConfirm={handleSubmitVisit}
            pin={pin}
            setPin={setPin}
        />
    </div>
  )
}

export default VisitForm
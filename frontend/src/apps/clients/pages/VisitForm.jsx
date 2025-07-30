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
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold text-[#169fcb]">AnNisa Pantry</h1>
                    <p className="text-gray-600">Visit Form</p>
                </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <DashboardHeader onCancel={handleCancelVisit}/>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] transition-colors"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Grocery Items */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden mb-6">
                <div className="bg-green-50 px-6 py-4 border-b border-green-200">
                    <h3 className="text-lg font-bold text-green-800 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Grocery Items
                    </h3>
                    <p className="text-green-700 text-sm mt-1">Select quantities for food items</p>
                </div>
                
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items
                            .filter(item => item.type === 'grocery')
                            .map(item => (
                            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">{item.name}</h4>
                                <div className="space-y-3">
                                    {item.batches.map(batch => (
                                        <div key={batch.id} className="bg-gray-50 rounded-md p-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        Expires: {batch.expiration_date}
                                                    </p>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Available: {batch.quantity}
                                                    </p>
                                                </div>
                                                <QuantityInput
                                                    value={grocerySelections[batch.id] || ''}
                                                    max={batch.quantity}
                                                    onChange={quantity => handleGroceryQuantityChange(batch.id, quantity)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Home Items */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden mb-8">
                <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
                    <h3 className="text-lg font-bold text-blue-800 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v2z" />
                        </svg>
                        Home Items
                    </h3>
                    <p className="text-blue-700 text-sm mt-1">Select quantities for household items</p>
                </div>
                
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items
                            .filter(item => item.type === 'home')
                            .map(item => (
                            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h4>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-600">In stock: {item.quantity}</p>
                                    <QuantityInput
                                        value={homeSelections[item.id] || ''}
                                        max={item.quantity}
                                        onChange={quantity => handleHomeQuantityChange(item.id, quantity)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    onClick={handleStartVisit}
                    disabled={!name.trim() || !address.trim()}
                    className={`px-8 py-4 rounded-lg font-medium text-lg transition-colors ${
                        name.trim() && address.trim()
                            ? 'bg-[#169fcb] text-white hover:bg-[#128ab2] shadow-md hover:shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Continue to PIN Verification
                </button>
            </div>

            <PinModal
                isOpen={showPinModal}
                onClose={() => setShowPinModal(false)}
                onConfirm={handleSubmitVisit}
                pin={pin}
                setPin={setPin}
            />
        </main>
    </div>
  )
}

export default VisitForm
import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { viewVisitHistory } from '../api/visit';

function VisitHistory() {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
        try {
            const data = await viewVisitHistory();
            setVisits(data.visits || []);
        } catch (err) {
            console.error('Error fetching visit history:', err);
            alert('Could not load visit history.');
        } finally {
            setLoading(false);
        }
        };
        loadHistory();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getExpirationStatus = (daysUntilExpiration) => {
        if (daysUntilExpiration <= 0) {
            return { text: 'Expired', color: 'text-red-600' };
        } else if (daysUntilExpiration <= 7) {
            return { text: `Expires in ${daysUntilExpiration} day${daysUntilExpiration !== 1 ? 's' : ''}`, color: 'text-orange-600' };
        } else {
            return { text: `Expires in ${daysUntilExpiration} days`, color: 'text-green-600' };
        }
    };

    return (
        <div className="container mx-auto p-4">
        <DashboardHeader title="Your Visit History" />
        {loading ? (
            <p className="text-gray-600 text-center mt-10">Loading...</p>
        ) : visits.length === 0 ? (
            <p className="text-gray-600 text-center mt-10">No visits yet.</p>
        ) : (
            <div className="space-y-6">
            {visits.map((visit) => {
                console.log('Visit data:', visit); // Debug log
                return (
                <div key={visit.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                    Visit by {visit.name} — {formatDate(visit.created_at)}
                    </h2>
                    <span className="text-sm text-gray-500">{visit.address}</span>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Grocery Items</h3>
                    {visit.grocery_items.length === 0 ? (
                        <p className="text-gray-500 italic">No grocery items selected</p>
                    ) : (
                        <div className="space-y-2">
                        {visit.grocery_items.map((item, idx) => {
                            console.log('Grocery item:', item); // Debug log
                            const batch = item.batch;
                            const groceryItem = batch?.item;
                            console.log('Batch:', batch); // Debug log
                            console.log('Grocery item details:', groceryItem); // Debug log
                            
                            const expirationStatus = batch?.days_until_expiration !== undefined 
                                ? getExpirationStatus(batch.days_until_expiration) 
                                : null;
                            
                            return (
                            <div key={idx} className="bg-gray-50 rounded p-3 border-l-4 border-blue-400">
                                <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-800">
                                    {groceryItem?.name || 'Unknown Item'}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                    Category: {groceryItem?.category || 'N/A'} | 
                                    Unit: {groceryItem?.unit || 'N/A'}
                                    </p>
                                    {groceryItem?.barcode && (
                                        <p className="text-xs text-gray-500">
                                        Barcode: {groceryItem.barcode}
                                        </p>
                                    )}
                                    {batch?.expiration_date && (
                                    <p className="text-sm">
                                        Expires: {formatDate(batch.expiration_date)}
                                        {expirationStatus && (
                                        <span className={`ml-2 font-medium ${expirationStatus.color}`}>
                                            ({expirationStatus.text})
                                        </span>
                                        )}
                                    </p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <span className="font-semibold text-lg text-blue-600">
                                    {item.quantity}
                                    </span>
                                    <p className="text-xs text-gray-500">
                                    {groceryItem?.unit || 'units'}
                                    </p>
                                </div>
                                </div>
                            </div>
                            );
                        })}
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Home Items</h3>
                    {visit.home_items.length === 0 ? (
                        <p className="text-gray-500 italic">No home items selected</p>
                    ) : (
                        <div className="space-y-2">
                        {visit.home_items.map((item, idx) => {
                            console.log('Home item:', item); // Debug log
                            const homeItem = item.item;
                            console.log('Home item details:', homeItem); // Debug log
                            
                            return (
                            <div key={idx} className="bg-gray-50 rounded p-3 border-l-4 border-green-400">
                                <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-800">
                                    {homeItem?.name || 'Unknown Item'}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                    {homeItem?.brand && `Brand: ${homeItem.brand} | `}
                                    Category: {homeItem?.category || 'N/A'}
                                    </p>
                                    {homeItem?.barcode && (
                                        <p className="text-xs text-gray-500">
                                        Barcode: {homeItem.barcode}
                                        </p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <span className="font-semibold text-lg text-green-600">
                                    {item.quantity}
                                    </span>
                                    <p className="text-xs text-gray-500">items</p>
                                </div>
                                </div>
                            </div>
                            );
                        })}
                        </div>
                    )}
                </div>
                </div>
                )
            })}
            </div>
        )}
        </div>
    );
    }

    export default VisitHistory;

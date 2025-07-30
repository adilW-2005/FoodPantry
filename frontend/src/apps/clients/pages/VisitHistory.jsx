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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-[#169fcb]">AnNisa Pantry</h1>
                        <p className="text-gray-600">Visit History</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <DashboardHeader title="Your Visit History" />
                
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#169fcb]"></div>
                        <p className="text-gray-500 mt-4">Loading your visit history...</p>
                    </div>
                ) : visits.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No visits yet</h3>
                        <p className="mt-1 text-gray-500">
                            Start your first visit to see your history here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {visits.map((visit) => {
                            console.log('Visit data:', visit); // Debug log
                            return (
                                <div key={visit.id} className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                                    {/* Visit Header */}
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    Visit by {visit.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {formatDate(visit.created_at)} • {visit.address}
                                                </p>
                                            </div>
                                            <div className="mt-2 sm:mt-0">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Completed
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Grocery Items */}
                                        <div className="mb-8">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                                Grocery Items ({visit.grocery_items.length})
                                            </h4>
                                            {visit.grocery_items.length === 0 ? (
                                                <p className="text-gray-500 italic">No grocery items selected</p>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                            <div key={idx} className="border border-green-200 rounded-lg p-4 bg-green-50">
                                                                <div className="flex justify-between items-start">
                                                                    <div className="flex-1">
                                                                        <h5 className="font-semibold text-gray-900">
                                                                            {groceryItem?.name || 'Unknown Item'}
                                                                        </h5>
                                                                        <div className="mt-1 space-y-1">
                                                                            <p className="text-sm text-gray-600">
                                                                                Category: {groceryItem?.category || 'N/A'} • 
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
                                                                    </div>
                                                                    <div className="text-right ml-4">
                                                                        <span className="text-2xl font-bold text-green-600">
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

                                        {/* Home Items */}
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v2z" />
                                                </svg>
                                                Home Items ({visit.home_items.length})
                                            </h4>
                                            {visit.home_items.length === 0 ? (
                                                <p className="text-gray-500 italic">No home items selected</p>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {visit.home_items.map((item, idx) => {
                                                        console.log('Home item:', item); // Debug log
                                                        const homeItem = item.item;
                                                        console.log('Home item details:', homeItem); // Debug log
                                                        
                                                        return (
                                                            <div key={idx} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                                                                <div className="flex justify-between items-start">
                                                                    <div className="flex-1">
                                                                        <h5 className="font-semibold text-gray-900">
                                                                            {homeItem?.name || 'Unknown Item'}
                                                                        </h5>
                                                                        <div className="mt-1 space-y-1">
                                                                            <p className="text-sm text-gray-600">
                                                                                {homeItem?.brand && `Brand: ${homeItem.brand} • `}
                                                                                Category: {homeItem?.category || 'N/A'}
                                                                            </p>
                                                                            {homeItem?.barcode && (
                                                                                <p className="text-xs text-gray-500">
                                                                                    Barcode: {homeItem.barcode}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right ml-4">
                                                                        <span className="text-2xl font-bold text-blue-600">
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
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default VisitHistory;

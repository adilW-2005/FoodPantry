import React, { useEffect, useState } from 'react';
import { fetchVisits } from '../api/visit'; // your api function

function VisitManage() {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadVisits = async () => {
            try {
                
                const data = await fetchVisits();
                
                setVisits(data.visits || []);
                setError(null);
            } catch (err) {
            
                setError('Failed to load visits: ' + (err.message || err.toString()));
            } finally {
                setLoading(false);
            }
        };

        loadVisits();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                AnNisa Pantry Employee Dashboard
            </h1>
            
            {loading ? (
                <p className="text-gray-500 text-center mt-8">Loading visits...</p>
            ) : error ? (
                <div className="text-red-600 text-center mt-8 p-4 bg-red-50 rounded border">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                </div>
            ) : visits.length === 0 ? (
                <p className="text-gray-500 text-center mt-8">No visits found.</p>
            ) : (
                <div className="space-y-6">
                    {visits.map((visit) => (
                        <div
                            key={visit.id}
                            className="bg-white shadow-md rounded p-4 border border-gray-100"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {visit.client?.full_name || 'Unknown Client'}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {new Date(visit.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mt-1">{visit.address}</p>

                            <div className="mt-3">
                                <h3 className="font-semibold text-gray-700">Grocery Items</h3>
                                <ul className="list-disc list-inside text-gray-600 text-sm">
                                    {visit.grocery_items?.map((item) => (
                                        <li key={item.id}>
                                            {item.batch?.item?.name || 'Unknown Item'} — Qty: {item.quantity}
                                        </li>
                                    )) || <li>No grocery items</li>}
                                </ul>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-700">Home Items</h3>
                                <ul className="list-disc list-inside text-gray-600 text-sm">
                                    {visit.home_items?.map((item) => (
                                        <li key={item.id}>
                                            {item.item?.name || 'Unknown Item'} — Qty: {item.quantity}
                                        </li>
                                    )) || <li>No home items</li>}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VisitManage;

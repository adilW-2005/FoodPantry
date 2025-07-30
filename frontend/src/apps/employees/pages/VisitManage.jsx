import React, { useEffect, useState } from 'react';
import { fetchVisits } from '../api/visit';
import logo from '../../../assets/annisa logo antry.png';

function VisitManage() {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredVisits = visits.filter(visit => {
        const clientName = visit.client?.full_name || '';
        const searchLower = searchTerm.toLowerCase();
        return clientName.toLowerCase().includes(searchLower);
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#169fcb] to-[#0d7aa7] shadow-lg border-b border-blue-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <img 
                                src={logo} 
                                alt="AnNisa Food Pantry Logo" 
                                className="h-12 w-12 object-contain mr-3 bg-white rounded-lg p-1"
                            />
                            <h1 className="text-2xl font-bold text-white">AnNisa Food Pantry</h1>
                        </div>
                        <p className="text-blue-100 font-medium">Visit Management</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Visit Management</h2>
                    <p className="text-gray-600">
                        View and track all client visit activity and pantry service history
                    </p>
                </div>

                {/* Search and Stats */}
                <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-900">Visit Database</h3>
                            <p className="text-gray-600 text-sm">Track and manage client pantry visits</p>
                        </div>
                        
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
                                    placeholder="Search visits by client name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] sm:text-sm transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-[#169fcb]">{visits.length}</p>
                            <p className="text-sm text-gray-600">Total Visits</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {visits.filter(v => new Date(v.created_at).toDateString() === new Date().toDateString()).length}
                            </p>
                            <p className="text-sm text-gray-600">Today's Visits</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">
                                {visits.filter(v => {
                                    const visitDate = new Date(v.created_at);
                                    const weekAgo = new Date();
                                    weekAgo.setDate(weekAgo.getDate() - 7);
                                    return visitDate >= weekAgo;
                                }).length}
                            </p>
                            <p className="text-sm text-gray-600">This Week</p>
                        </div>
                    </div>
                </div>

                {/* Visits List */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#169fcb]"></div>
                        <p className="text-gray-500 mt-4">Loading visits...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100">
                        <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Visits</h3>
                        <p className="mt-1 text-red-600">{error}</p>
                    </div>
                ) : filteredVisits.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No visits found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm ? 'Try adjusting your search terms.' : 'No client visits have been recorded yet.'}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 divide-y divide-gray-200">
                            {filteredVisits.map((visit) => (
                                <div key={visit.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                                        <div className="flex-1 mb-4 lg:mb-0">
                                            <div className="flex items-center mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900 mr-3">
                                                    {visit.client?.full_name || 'Unknown Client'}
                                                </h3>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                    </svg>
                                                    {new Date(visit.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {visit.address && (
                                                <p className="text-gray-600 text-sm flex items-center mb-3">
                                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {visit.address}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Grocery Items */}
                                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                            <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                                Grocery Items
                                            </h4>
                                            {visit.grocery_items && visit.grocery_items.length > 0 ? (
                                                <ul className="space-y-1 text-sm text-green-700">
                                                    {visit.grocery_items.map((item) => (
                                                        <li key={item.id} className="flex justify-between">
                                                            <span>{item.batch?.item?.name || 'Unknown Item'}</span>
                                                            <span className="font-medium">Qty: {item.quantity}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-green-600 italic">No grocery items</p>
                                            )}
                                        </div>

                                        {/* Home Items */}
                                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v2z" />
                                                </svg>
                                                Home Items
                                            </h4>
                                            {visit.home_items && visit.home_items.length > 0 ? (
                                                <ul className="space-y-1 text-sm text-blue-700">
                                                    {visit.home_items.map((item) => (
                                                        <li key={item.id} className="flex justify-between">
                                                            <span>{item.item?.name || 'Unknown Item'}</span>
                                                            <span className="font-medium">Qty: {item.quantity}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-blue-600 italic">No home items</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default VisitManage;

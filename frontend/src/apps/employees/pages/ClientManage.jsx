import React, { useEffect, useState } from 'react';
import { fetchClients, qualifyClient } from '../api/clients';

function ClientManage() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadClients = async () => {
            try {
                const data = await fetchClients();
                setClients(data);
            } catch (err) {
                console.error('Error loading clients:', err);
            } finally {
                setLoading(false);
            }
        };
        loadClients();
    }, []);

    const handleQualify = async (clientId) => {
        try {
            await qualifyClient(clientId);
            // Reload clients to update status
            const data = await fetchClients();
            setClients(data);
        } catch (err) {
            console.error('Error qualifying client:', err);
            alert('Failed to qualify client. Please try again.');
        }
    };

    const filteredClients = clients.filter(client =>
        client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-[#169fcb]">AnNisa Pantry</h1>
                        <p className="text-gray-600">Client Management</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Client Management</h2>
                    <p className="text-gray-600">
                        Review and qualify client applications for pantry services
                    </p>
                </div>

                {/* Search and Stats */}
                <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-gray-900">Client Database</h3>
                            <p className="text-gray-600 text-sm">Manage client qualifications and information</p>
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
                                    placeholder="Search clients..."
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
                            <p className="text-2xl font-bold text-[#169fcb]">{clients.length}</p>
                            <p className="text-sm text-gray-600">Total Clients</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">{clients.filter(c => c.qualified).length}</p>
                            <p className="text-sm text-gray-600">Qualified</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-orange-600">{clients.filter(c => !c.qualified).length}</p>
                            <p className="text-sm text-gray-600">Pending Review</p>
                        </div>
                    </div>
                </div>

                {/* Clients List */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#169fcb]"></div>
                        <p className="text-gray-500 mt-4">Loading clients...</p>
                    </div>
                ) : filteredClients.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No clients found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm ? 'Try adjusting your search terms.' : 'No clients have registered yet.'}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 divide-y divide-gray-200">
                            {filteredClients.map(client => (
                                <div key={client.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div className="flex-1 mb-4 md:mb-0">
                                            <div className="flex items-center mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900 mr-3">
                                                    {client.full_name}
                                                </h3>
                                                {client.qualified ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        Qualified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Pending Review
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {client.email}
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3">
                                            {!client.qualified && (
                                                <button
                                                    onClick={() => handleQualify(client.id)}
                                                    className="bg-[#169fcb] text-white px-4 py-2 rounded-md hover:bg-[#128ab2] transition-colors font-medium flex items-center"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Qualify Client
                                                </button>
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

export default ClientManage;

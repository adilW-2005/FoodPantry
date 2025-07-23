import React, { useEffect, useState } from 'react';
import { viewAllClients, qualifyClient } from '../api/clients';
import { useAuth } from '../../auth/authContext';

function ClientManage() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
        try {
            
            const res = await viewAllClients();
            
            setClients(res || []); // API returns data directly, ensure we have an array
        } catch (err) {
            console.error('Failed to fetch clients:', err);
            console.error('Error details:', err.response?.data || err.message);
            alert(`Error loading clients: ${err.response?.data?.detail || err.message}`);
            setClients([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
        };

        fetchClients();
    }, []);

    const handleQualify = async (clientId) => {
        try {
        await qualifyClient(clientId);
        setClients(prev =>
            prev.map(client =>
            client.id === clientId ? { ...client, qualified: true } : client
            )
        );
        } catch (err) {
        console.error('Failed to qualify client:', err);
        alert('Could not qualify client.');
        }
    };

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        AnNisa Pantry Client Management
        </h1>
        {loading ? (
            <p>Loading clients...</p>
        ) : (
            <div className="space-y-4">
            {clients && clients.length > 0 ? (
                clients.map(client => (
                    <div key={client.id} className="bg-white shadow rounded p-4 flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-gray-800">{client.full_name}</p>
                        <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                    <div>
                        {client.qualified ? (
                        <span className="text-green-600 font-semibold">Qualified</span>
                        ) : (
                        <button
                            onClick={() => handleQualify(client.id)}
                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                        >
                            Qualify
                        </button>
                        )}
                    </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No clients found.</p>
            )}
            </div>
        )}
        </div>
    );
    }

    export default ClientManage;

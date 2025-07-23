import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        AnNisa Pantry Employee Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Management */}
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Client Management</h2>
          <p className="text-gray-600 mb-4">
            Qualify clients, register new ones, and update their information.
          </p>
          <button
            onClick={() => navigate('/employee/clients')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Manage Clients
          </button>
        </div>

        {/* Visit Records */}
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Visit Records</h2>
          <p className="text-gray-600 mb-4">
            View, edit, and track all client visit activity.
          </p>
          <button
            onClick={() => navigate('/employee/visits')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Manage Visits
          </button>
        </div>

        {/* Inventory */}
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Inventory</h2>
          <p className="text-gray-600 mb-4">
            Add or update inventory and monitor low-stock items.
          </p>
          <button
            onClick={() => navigate('/employee/inventory')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Manage Inventory
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/annisa logo antry.png';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#169fcb] to-[#0d7aa7] shadow-lg border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="AnNisa Pantry Logo" 
                className="h-50 w-50 object-contain mr-3 rounded-lg p-1"
              />
              <h1 className="text-2xl font-bold text-white">AnNisa Food Pantry</h1>
            </div>
            <p className="text-blue-100 font-medium">Employee Dashboard</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, Employee
          </h2>
          <p className="text-gray-600">
            Manage pantry operations and support our community members
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Client Management Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#169fcb] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-3">Client Management</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Qualify new clients, register applications, and update client information in the system.
              </p>
              <button
                onClick={() => navigate('/employee/clients')}
                className="w-full bg-[#169fcb] text-white px-4 py-3 rounded-md hover:bg-[#128ab2] transition-colors font-medium"
              >
                Manage Clients
              </button>
            </div>
          </div>

          {/* Visit Records Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#169fcb] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-3">Visit Records</h3>
              </div>
              <p className="text-gray-600 mb-6">
                View, edit, and track all client visit activity and pantry service history.
              </p>
              <button
                onClick={() => navigate('/employee/visits')}
                className="w-full bg-[#169fcb] text-white px-4 py-3 rounded-md hover:bg-[#128ab2] transition-colors font-medium"
              >
                Manage Visits
              </button>
            </div>
          </div>

          {/* Inventory Management Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#169fcb] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-3">Inventory</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Manage food items, household goods, track quantities, and update expiration dates.
              </p>
              <button
                onClick={() => navigate('/employee/inventory')}
                className="w-full bg-[#169fcb] text-white px-4 py-3 rounded-md hover:bg-[#128ab2] transition-colors font-medium"
              >
                Manage Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats or Additional Info */}
        <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-[#169fcb]">•</p>
              <p className="text-sm text-gray-600 mt-1">Today's Visits</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-[#169fcb]">•</p>
              <p className="text-sm text-gray-600 mt-1">Active Clients</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-[#169fcb]">•</p>
              <p className="text-sm text-gray-600 mt-1">Low Stock Items</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

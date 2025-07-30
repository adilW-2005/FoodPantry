import React from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from './api/axiosInstance'
import { useAuth } from './apps/auth/authContext'
import logo from './assets/annisa logo antry.png'

function HomePage() {

    const test = async () => {
        const response = await axiosInstance.post('/auth/test')
        console.log(response)
    }
    
    const { logoutContext } = useAuth();
    const navigate = useNavigate();
    
      const handleLogout = () => {
        logoutContext();
        navigate('/login');
      };
      
  return (
    <div className="min-h-screen bg-white">
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
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-blue-100 hover:text-white font-medium transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-white text-[#169fcb] px-4 py-2 rounded-md hover:bg-gray-50 transition-colors font-medium shadow-sm"
              >
                Register
              </button>
              <button 
                onClick={handleLogout}
                className="text-blue-100 hover:text-white font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to AnNisa Food Pantry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Supporting our community with dignity and care. Access fresh food, household items, 
            and essential resources through our compassionate pantry services.
          </p>
          
          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#169fcb] rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Clients</h3>
              <p className="text-gray-600 mb-6">
                Access our pantry services, schedule visits, and browse available items.
              </p>
              <button 
                onClick={() => navigate('/register')}
                className="bg-[#169fcb] text-white px-6 py-3 rounded-md hover:bg-[#128ab2] transition-colors font-medium"
              >
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#169fcb] rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Staff</h3>
              <p className="text-gray-600 mb-6">
                Manage inventory, client records, and coordinate pantry operations.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="bg-[#169fcb] text-white px-6 py-3 rounded-md hover:bg-[#128ab2] transition-colors font-medium"
              >
                Staff Login
              </button>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To foster pathways to self-sufficiency by educating individuals, empowering families, 
              and enriching communities through advocacy, skill-building, and social services support. 
              We serve with dignity, respect, and compassion.
            </p>
          </div>

          {/* Test Button (for development) */}
          <div className="mt-8">
            <button 
              onClick={test}
              className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
            >
              Test Connection
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 AnNisa Hope Center. Serving our community with dignity and care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
  }


export default HomePage
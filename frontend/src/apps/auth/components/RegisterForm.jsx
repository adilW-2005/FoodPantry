import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { register } from '../authApi'
import { useAuth } from '../authContext.jsx'

function RegisterForm() {
    const [form, setForm] = useState({ email: '', name: '', password: '', role: 'client' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { loginContext, logoutContext } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        logoutContext();
        
        try{
            const response = await register(form);
            const { access } = response;
            loginContext(access);
            const user = jwtDecode(access);
            
            if(user.role === 'client'){
                console.log(user.role)
                navigate('/client/client-intake');
            }else if(user.role === 'employee'){
                console.log(user.role)
                navigate('/');
            }
        }catch(error){
            setError(error.response?.data?.detail || error.response?.data?.message || JSON.stringify(error.response?.data) || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#169fcb] mb-2">AnNisa Pantry</h1>
                    <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                    <p className="text-gray-600 mt-2">Join our community to access pantry services</p>
                </div>
            </div>

            {/* Form */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10 border border-gray-100">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] sm:text-sm transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] sm:text-sm transition-colors"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] sm:text-sm transition-colors"
                                placeholder="Create a password"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                Account Type
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] sm:text-sm transition-colors bg-white"
                            >
                                <option value="client">Client (Access pantry services)</option>
                                <option value="employee">Employee (Staff access)</option>
                            </select>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#169fcb] hover:bg-[#128ab2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#169fcb] transition-colors ${
                                    loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Login link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-[#169fcb] hover:text-[#128ab2] font-medium transition-colors"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>

                    {/* Back to home */}
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                        >
                            ← Back to home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;
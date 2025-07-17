import React, { useState } from 'react'
import { intakeClient } from '../api/clientApi';

function ClientIntake() {
  const [form, setForm] = useState({
    user: '',
    full_name: '',
    dob: '',
    phone: '',
    email: '',
    num_children: '',
    num_adults: '', 
    snap: false,
    wic: false,
    tanf: false,
    ssi: false,
    medicaid: false,
    food_allergies: '', 
    consent_signed: false,
    staff_signature: '',
    lease_doc: '',
    id_doc: '',
    bank_statement: '',
    qualified: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }

      const response = await intakeClient(formData);
      console.log('Submitted successfully:', response.data);
      
      // Reset form after successful submission
      setForm({
        user: '',
        full_name: '',
        dob: '',
        phone: '',
        email: '',
        num_children: '',
        num_adults: '', 
        snap: false,
        wic: false,
        tanf: false,
        ssi: false,
        medicaid: false,
        food_allergies: '', 
        consent_signed: false,
        staff_signature: '',
        lease_doc: '',
        id_doc: '',
        bank_statement: '',
        qualified: false
      });
      
      alert('Client intake submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <h1 className="text-4xl font-bold mb-2">Client Intake Form</h1>
            <p className="text-blue-100 text-lg">Please fill out all required information below</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Personal Information Section */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  placeholder="Enter full name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(123) 456-7890"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Household Information Section */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
              Household Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="num_children" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Children
                </label>
                <input
                  type="number"
                  id="num_children"
                  name="num_children"
                  min="0"
                  placeholder="0"
                  value={form.num_children}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="num_adults" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Adults
                </label>
                <input
                  type="number"
                  id="num_adults"
                  name="num_adults"
                  min="1"
                  placeholder="1"
                  value={form.num_adults}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Assistance Programs Section */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
              Current Assistance Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'snap', label: 'SNAP (Food Stamps)' },
                { name: 'wic', label: 'WIC' },
                { name: 'tanf', label: 'TANF' },
                { name: 'ssi', label: 'SSI' },
                { name: 'medicaid', label: 'Medicaid' }
              ].map((program) => (
                <label key={program.name} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name={program.name}
                    checked={form[program.name]}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{program.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">4</div>
              Additional Information
            </h2>
            <div>
              <label htmlFor="food_allergies" className="block text-sm font-medium text-gray-700 mb-2">
                Food Allergies/Dietary Restrictions
              </label>
              <textarea
                id="food_allergies"
                name="food_allergies"
                placeholder="Please list any food allergies or dietary restrictions..."
                value={form.food_allergies}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
              />
            </div>
          </div>

          {/* Required Documents Section */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">5</div>
              Required Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'lease_doc', label: 'Lease Document' },
                { name: 'id_doc', label: 'ID Document' },
                { name: 'bank_statement', label: 'Bank Statement' }
              ].map((doc) => (
                <div key={doc.name} className="space-y-2">
                  <label htmlFor={doc.name} className="block text-sm font-medium text-gray-700">
                    {doc.label}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id={doc.name}
                      name={doc.name}
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG accepted</p>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Information Section */}
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-3">6</div>
              Staff Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div>
                <label htmlFor="staff_signature" className="block text-sm font-medium text-gray-700 mb-2">
                  Staff Signature <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="staff_signature"
                  name="staff_signature"
                  placeholder="Staff member signature"
                  value={form.staff_signature}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="flex items-center p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent_signed"
                    checked={form.consent_signed}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 text-yellow-600 border-yellow-300 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 font-medium">
                    Client consent has been signed and documented <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-8 bg-gray-50">
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed transform-none' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Client Intake'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientIntake;
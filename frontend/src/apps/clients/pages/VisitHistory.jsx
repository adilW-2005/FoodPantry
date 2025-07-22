import React from 'react';
import DashboardHeader from '../components/DashboardHeader';

const VisitHistory = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardHeader title="Visit History" />
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">Visit history will be displayed here.</p>
      </div>
    </div>
  );
};

export default VisitHistory;

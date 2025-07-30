import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/annisa logo antry.png';

const DashboardHeader = ({ title = "Client Dashboard", onCancel }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#169fcb] to-[#0d7aa7] rounded-lg shadow-lg border border-blue-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-4 sm:mb-0 flex items-center">
          <img 
            src={logo} 
            alt="AnNisa Pantry Logo" 
            className="h-50 w-50 object-contain mr-3 rounded-lg p-1"
          />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-blue-100">
              {onCancel ? 'Complete your visit by selecting items below' : 'Welcome to your pantry dashboard'}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {onCancel ? (
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-red-200 text-red-500 bg-white rounded-md hover:bg-red-50 hover:border-red-300 transition-colors font-medium"
            >
              Cancel Visit
            </button>
          ) : (
            <button
              onClick={() => navigate('/client/visit-form')}
              className="bg-white text-[#169fcb] px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Start Visit
            </button>
          )}

          <button
            onClick={() => navigate('/client/visit-history')}
            className="px-6 py-3 border border-white/30 text-white rounded-md hover:bg-white/10 hover:border-white/50 transition-colors font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Visit History
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

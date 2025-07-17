import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Client Dashboard</h1>
      <div className="flex gap-3 mt-4 sm:mt-0">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Visit
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Visit History
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;

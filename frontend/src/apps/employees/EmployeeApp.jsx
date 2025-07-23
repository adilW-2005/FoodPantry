import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClientManage from './pages/ClientManage';
import VisitManage from './pages/VisitManage';
import InventoryManage from './pages/InventoryManage';

const EmployeeApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clients" element={<ClientManage />} />
      <Route path="/visits" element={<VisitManage />} />
      <Route path="/inventory" element={<InventoryManage />} />
    </Routes>
  );
};

export default EmployeeApp;

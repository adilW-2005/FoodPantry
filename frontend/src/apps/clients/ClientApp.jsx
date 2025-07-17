import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Intake from './pages/ClientIntake';


const ClientApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/client-intake" element={<Intake />} />
    </Routes>
  );
};

export default ClientApp;

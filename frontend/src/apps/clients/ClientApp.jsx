import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Intake from './pages/ClientIntake';
import VisitForm from './pages/VisitForm';
import VisitHistory from './pages/VisitHistory';


const ClientApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/client-intake" element={<Intake />} />
      <Route path="/visit-form" element={<VisitForm />} />
      <Route path="/visit-history" element={<VisitHistory />} />
    </Routes>
  );
};

export default ClientApp;

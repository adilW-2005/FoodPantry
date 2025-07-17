// router/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../apps/auth/pages/LoginPage';
import RegisterPage from '../apps/auth/pages/RegisterPage';
import HomePage from '../HomePage';
import ClientApp from '../apps/clients/ClientApp';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/client/*" element={<ClientApp />} />
    </Routes>
  );
}

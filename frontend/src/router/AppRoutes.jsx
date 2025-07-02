// router/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../apps/auth/pages/LoginPage';
import RegisterPage from '../apps/auth/pages/RegisterPage';
import HomePage from '../HomePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

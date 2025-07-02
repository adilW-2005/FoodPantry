import { Navigate } from 'react-router-dom';
import { useAuth } from '../apps/auth/authContext';

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  // Not logged in? Redirect to login
  if (!user) return <Navigate to="/login" />;

  // Logged in, but wrong role? Redirect home
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  // User is authorized
  return children;
}

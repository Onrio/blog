import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/context/auth/hooks/useAuthContext';

export const ProtectedRoute: React.FC = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const RouteWithuser: React.FC = () => {
  const { user } = useAuthContext();
  return !user ? <Outlet /> : <Navigate to="/profile" replace />;
};

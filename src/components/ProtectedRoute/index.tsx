import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/context/auth/hooks/useAuthContext';

const ProtectedRoute: React.FC = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

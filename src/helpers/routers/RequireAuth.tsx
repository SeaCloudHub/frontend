import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../../store/auth/session';

const RequireAuth = () => {
  const session = useSession((state) => state.token);
  const role = useSession((state) => state.role);
  const location = useLocation();
  return role == 'admin' ? <Outlet /> : <Navigate to='/404' state={{ from: location }} replace />;
};

export default RequireAuth;

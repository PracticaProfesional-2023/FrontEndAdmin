import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/authContext';

export default function PublicRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/hirejob" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

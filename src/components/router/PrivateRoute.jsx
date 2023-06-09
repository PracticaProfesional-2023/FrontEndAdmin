import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/authContext';

import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Navbar from '../navbar/Navbar';

const navArrayLinks = [
  {
    title: 'Job Application Tracking',
    path: 'job-track',
    icon: <TrendingUpIcon color="secondary" />,
  },
  {
    title: 'Users',
    path: 'users',
    icon: <GroupIcon color="secondary" />,
  },
  {
    title: 'Jobs Management',
    path: 'jobs-management',
    icon: <WorkIcon color="secondary" />,
  },
];

export default function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar navArrayLinks={navArrayLinks} />
      <div>
        <Outlet />
      </div>
    </>
  );
}

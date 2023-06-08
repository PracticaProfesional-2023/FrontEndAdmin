import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Users from './pages/Users';
import Tracking from './pages/ApplicationTracking';
import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoUser from './pages/InfoUser';
import Navbar from './components/navbar/Navbar';

import PublicRoute from './components/router/PublicRoute';
import PrivateRoute from './components/router/PrivateRoute';

const navArrayLinks = [
  {
    title: 'Job Application Tracking',
    path: 'private/job-track',
    icon: <TrendingUpIcon color="secondary" />,
  },
  {
    title: 'Users',
    path: 'private/users',
    icon: <GroupIcon color="secondary" />,
  },
  {
    title: 'Jobs Management',
    path: 'private/jobs-management',
    icon: <WorkIcon color="secondary" />,
  },
];

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar navArrayLinks={navArrayLinks} />}

      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/private/*" element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="jobs-management" element={<Jobs />} />
          <Route path="users" element={<Users />} />
          <Route path="job-track" element={<Tracking />} />
          <Route path="infoUser" element={<InfoUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { Container } from '@mui/material';
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

const navArrayLinks = [
  {
    title: 'Job Application Tracking',
    path: '/job-track',
    icon: <TrendingUpIcon color="secondary" />,
  },
  { title: 'Users', path: '/users', icon: <GroupIcon color="secondary" /> },
  {
    title: 'Jobs Management',
    path: '/jobs-management',
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
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/jobs-management" element={<Jobs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/job-track" element={<Tracking />} />
        <Route path="/infoUser" element={<InfoUser />} />
      </Routes>
    </>
  );
}

export default App;

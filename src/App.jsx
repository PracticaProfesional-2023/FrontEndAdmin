import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Users from './pages/Users';
import Tracking from './pages/ApplicationTracking';
import InfoUser from './pages/InfoUser';
import PageNotFound from './pages/PageNotFound';
import PublicRoute from './components/router/PublicRoute';
import PrivateRoute from './components/router/PrivateRoute';
import { UserContextProvider } from './contexts/UserContext';
import { JobContextProvider } from './contexts/JobContext'; // Agregado
import { JobTrackingContextProvider } from './contexts/trackingContext';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return (
    <UserContextProvider>
      <JobContextProvider>
      <JobTrackingContextProvider>
        {/* Agregado */}
        <>
          {isLoading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <CircularProgress />
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute
                  startLoading={startLoading}
                  stopLoading={stopLoading}
                />
              }
            >
              <Route index element={<Login />} />
            </Route>
            <Route
              path="/hirejob/*"
              element={
                <PrivateRoute
                  startLoading={startLoading}
                  stopLoading={stopLoading}
                />
              }
            >
              <Route index element={<Home />} />
              <Route path="jobs-management" element={<Jobs />} />
              <Route path="users" element={<Users />} />
              <Route path="job-track" element={<Tracking />} />
              <Route path="infoUser" element={<InfoUser />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
        </JobTrackingContextProvider>
      </JobContextProvider>{' '}
      {/* Agregado */}
    </UserContextProvider>
  );
}

export default App;

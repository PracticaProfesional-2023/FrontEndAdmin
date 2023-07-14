import React, { createContext, useState, useEffect, useContext } from 'react';
import { getJobsPositions } from '../api/trackingApi';
import { AuthContext } from './authContext';

const JobTrackingContext = createContext();

const JobTrackingContextProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const authContext = useContext(AuthContext);
  const { authToken } = authContext;
  const KEY_APP =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJpYXQiOjE2ODkyMTkwODh9.cYMUUzuu1_2ZjBAjRlik8lNrBm7H3WkGHF5I7uRpadg';

  useEffect(() => {
    const fetchJobsPositions = async () => {
      try {
        console.log(authToken);
        const response = await getJobsPositions(KEY_APP);
        setApplications(response.data.jobApplications);
      } catch (error) {
        console.error('Error al obtener las Aplicaciones:', error);
      }
    };

    if (authToken) {
      fetchJobsPositions();
    }
  }, [authToken]);

  return (
    <JobTrackingContext.Provider
      value={{
        applications,
      }}
    >
      {children}
    </JobTrackingContext.Provider>
  );
};

export { JobTrackingContext, JobTrackingContextProvider };

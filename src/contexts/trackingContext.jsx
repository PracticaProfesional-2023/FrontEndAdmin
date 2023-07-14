import React, { createContext, useState, useEffect, useContext } from 'react';
import { getJobsPositions } from '../api/trackingApi';
import { AuthContext } from './authContext';

const  JobTrackingContext = createContext();

const JobTrackingContextProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const authContext = useContext(AuthContext);
  const { authToken } = authContext;

  useEffect(() => {
    const fetchJobsPositions = async () => {
      try {
        const response = await getJobsPositions(authToken);
        console.log(response.data.jobApplications)
        setApplications(response.data.jobApplications);
        console.log(applications)
      } catch (error) {
        console.error('Error al obtener las Plazas:', error);
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

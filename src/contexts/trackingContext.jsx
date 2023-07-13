import React, { createContext, useState, useEffect, useContext } from 'react';
import { getJobsPositions } from '../api/trackingApi';
import { AuthContext } from './authContext';

const  TrackingContext = createContext();

const JobTrackingContextProvider = ({ children }) => {
  const [jobsPositions, setJobsPositions] = useState([]);
  const authContext = useContext(AuthContext);
  const { authToken } = authContext;

  useEffect(() => {
    const fetchJobsPositions = async () => {
      try {
        const response = await getJobsPositions(authToken);
        setJobsPositions(response.data.jobPositions);
      } catch (error) {
        console.error('Error al obtener las Plazas:', error);
      }
    };

    if (authToken) {
      fetchJobsPositions();
    }
  }, [authToken]);

  

  return (
    <TrackingContext.Provider
      value={{
        jobsPositions,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export { TrackingContext, JobTrackingContextProvider };

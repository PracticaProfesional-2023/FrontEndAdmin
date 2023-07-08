import React, { createContext, useState, useEffect, useContext } from 'react';
import { getJobs, deleteJob, createJob, updateJob } from '../api/jobsApi';
import { AuthContext } from './authContext';

const JobContext = createContext();

const JobContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const authContext = useContext(AuthContext);
  const { authToken } = authContext;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs(authToken);
        setJobs(response.data.jobPositions);
      } catch (error) {
        console.error('Error al obtener las Plazas:', error);
      }
    };

    if (authToken) {
      fetchJobs();
    }
  }, [authToken]);

  const updateJobById = async (jobId, jobData) => {
    try {
      const response = await updateUser(jobId, jobData, authToken);
      setUsers((prevJobs) => {
        const updatedJobs = prevUsers.map((job) =>
          job.id === jobId ? response.data.job : job
        );
        return updatedJobs;
      });
    } catch (error) {
      console.error('Error al actualizar el Job:', error);
    }
  };

  const deleteJobById = async (jobId) => {
    try {
      await deleteJob(jobId, authToken);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Error al eliminar la plaza:', error);
    }
  };

  const createJobInternal = async (jobData) => {
    try {
      const response = await createJob(jobData, authToken);
      const newJobPosition = response.data.createdJobPosition;
      setJobs((prevJobs) => {
        return [...prevJobs, newJobPosition];
      });
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(
          'Error en la respuesta del servidor:',
          error.response.data
        );
      } else {
        console.error('Error al crear la plaza:', error);
      }
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        createJobInternal,
        deleteJobById,
        updateJobById,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobContextProvider };

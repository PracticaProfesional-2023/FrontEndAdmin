import axios from 'axios';

const API_BASE_URL = 'http://173.254.242.213:3000';

const getJobs = (token) => {
  return axios.get(`${API_BASE_URL}/job-positions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteJob = (jobId, token) => {
  return axios.delete(`${API_BASE_URL}/job-positions/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createJob = (jobData, token) => {
  return axios.post(`${API_BASE_URL}/job-positions`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getJobs, deleteJob, createJob };

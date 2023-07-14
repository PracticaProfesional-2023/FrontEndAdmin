import axios from 'axios';

const API_BASE_URL = 'http://173.254.242.213:3000';

const getJobsPositions = (token) => {
  return axios.get(`${API_BASE_URL}/job-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getJobsPositions };

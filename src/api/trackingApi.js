import axios from 'axios';

const API_BASE_URL = 'http://104.238.249.113:3000';

const getJobsPositions = (token) => {
  return axios.get(`${API_BASE_URL}/job-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getJobsPositions };

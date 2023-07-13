import axios from 'axios';

const API_BASE_URL = 'https://helpful-woolens-elk.cyclic.app';

const getJobsPositions = (token) => {
  return axios.get(`${API_BASE_URL}/job-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export { getJobsPositions };
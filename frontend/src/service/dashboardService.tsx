import axios from 'axios';

const dashboardService = {
  topWorldTrends: () => {
    return axios
      .get('http://0.0.0.0/api/dashboard/twitter-top-world-trends/')
      .then(resData => {
        if (resData.status !== 401) return resData.data;
      })
      .catch(err => err);
  },
  topPakistanTrends: () => {
    return axios
      .get('http://0.0.0.0/api/dashboard/twitter-top-pakistan-trends/')
      .then(resData => {
        if (resData.status !== 401) return resData.data;
      })
      .catch(err => err);
  },
  topTrendsByArea: areaName => {
    return axios
      .get(
        `http://0.0.0.0/api/dashboard/twitter-top-trends/area/?area=${areaName}`,
      )
      .then(resData => {
        if (resData.status !== 401) return resData.data;
      })
      .catch(err => err);
  },
};

export default dashboardService;

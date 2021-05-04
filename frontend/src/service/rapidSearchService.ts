/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import Cookies from 'js-cookie';

const rapidSearchService = {
  twitterRapidSerach: rapidSearchObject => {
    var csrfCookie = Cookies.get('csrftoken');
    console.log('csrf cookie: ', csrfCookie); // set to undefined

    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.withCredentials = true;

    const config = {
      //   headers: {
      //     'X-CSRFTOKEN': csrfCookie,
      //   },
      //   withCredentials: 'true',
      'Content-Type': 'application/json',
    };
    return axios
      .post(
        `http://0.0.0.0/api/rapid-search/twitter/search/`,
        rapidSearchObject,
        // { body: JSON.stringify(twitterUsername) },
        // config,
      )
      .then(resData => {
        if (resData.status !== 401) return resData.data;
      })
      .catch(err => err);
  },
};
export default rapidSearchService;

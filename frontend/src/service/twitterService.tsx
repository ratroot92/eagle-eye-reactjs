/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import Cookies from 'js-cookie';

const twitterService = {
  Add_Twitter_Tweets_Target: twitterUsername => {
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
        `http://0.0.0.0/api/twitter/add-twitter-tweets-target/`,
        twitterUsername,
        // { body: JSON.stringify(twitterUsername) },
        // config,
      )
      .then(resData => {
        if (resData.status !== 401) return resData.data;
      })
      .catch(err => err);
  },
  Tweets_Target_Exist: twitterUsername => {
    return axios
      .get(
        `http://0.0.0.0/api/twitter/tweets-targets-exist/?target_username=${twitterUsername}`,
      )
      .then(resData => {
        if (resData.status !== 401) return resData.data;
      })
      .catch(err => err);
  },
  allTweetsTargets: () => {
    return axios
      .get(`http://0.0.0.0/api/twitter/all-tweets-targets/`)
      .then(resData => {
        if (resData.status !== 401) return resData.data;
      })
      .catch(err => err);
  },
  deleteTweetsTarget: targetId => {
    return axios
      .get(`http://0.0.0.0/api/twitter/delete-tweets-target/?id=${targetId}`)
      .then(resData => {
        if (resData.status !== 401) return resData.data;
      })
      .catch(err => err);
  },
};

export default twitterService;

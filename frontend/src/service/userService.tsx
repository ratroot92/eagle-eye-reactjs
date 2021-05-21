/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import Cookies from 'js-cookie';

const userService = {
    userIsAuthenticated: userObject => {
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
                `http://0.0.0.0/api/auth/user-is-authenticated/`,
                userObject,
                // { body: JSON.stringify(userObject) },
                // config,
            )
            .then(resData => {
                if (resData.status !== 401) return resData.data;
            })
            .catch(err => err);
    },
    login: userObject => {
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
                `http://0.0.0.0/api/auth/user/login/`,
                userObject,
                // { body: JSON.stringify(userObject) },
                // config,
            )
            .then(resData => {
                if (resData.status !== 401) return resData.data;
            })
            .catch(err => err);
    },
    addUser: userObject => {
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
                `http://0.0.0.0/api/auth/add-user/`,
                userObject,
                // { body: JSON.stringify(userObject) },
                // config,
            )
            .then(resData => {
                if (resData.status !== 401) return resData.data;
            })
            .catch(err => err);
    },
    userAlreadyExist: username => {
        return axios
            .get(`http://0.0.0.0/api/auth/user-exist/?username=${username}`)
            .then(resData => {
                if (resData.status !== 401) return resData.data;
            })
            .catch(err => err);
    },
    getAllUsers: () => {
        return axios
            .get(`http://0.0.0.0/api/auth/all-users/`)
            .then(resData => {
                console.log('====================================');
                console.log('getAllUsers', resData);
                console.log('====================================');
                if (resData.status !== 401) return resData.data;
            })
            .catch(err => err);
    },
};

export default userService;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from 'redux';
import userService from 'service/userService';
import axios from 'axios';
import { AppState } from 'store/configureStore';
import {
  AppActions,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  SET_USERS,
} from 'types/actions';

import { User } from '../types/User';

//  ADD USER
//  ALTER NATIVE WAY
// export const addUser = user => disptach => {
//   axios.post('/api/leads', user).then(res => {
//     dispatch({
//       type: ADD_USER,
//       payload: res.data,
//     })
//     }).catch(err => {
//       const errors = {
//         mesg: err.reponse.data,
//         status: err.response.status,
//       };
//       dispatch({
//         type: GET_ERRORS,
//         payload: errors,
//       })
//     });
//   });
// };

export const addUser = (user: User): AppActions => ({
  type: ADD_USER,
  user,
});

export const deleteUser = (id: string): AppActions => ({
  type: DELETE_USER,
  id,
});

export const editUser = (user: User): AppActions => ({
  type: EDIT_USER,
  user,
});

export const setUser = (users: User[]): AppActions => ({
  type: SET_USERS,
  users,
});

export const startAddUser = (userData: {
  id: string;
  username: string;
  email: string;
  password: string;
  role: number;
  created_at: string;
  updated_at: string;
}) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const {
      id = '',
      username = '',
      email = '',
      password = '',
      role = 0,
      created_at = '',
      updated_at = '',
    } = userData;
    const user = {
      id,
      username,
      email,
      password,
      role,
      created_at,
      updated_at,
    };
    return dispatch(
      addUser({
        ...user,
      }),
    );
  };
};

export const startDeleteUser = (id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(deleteUser(id));
  };
};

export const startEditUser = (user: User) => {
  console.log('====================================');
  console.log('startEditUser', user);
  console.log('====================================');
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(editUser(user));
  };
};

export const startSetUser = (users: User[]) => {
  console.log('====================================');
  console.log('startSetUser');
  console.log('====================================');
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(setUser(users));
    // userService
    //   .getAllUsers()
    //   .then(resData => {
    //     console.log('====================================');
    //     console.log('startSetUser >> :', resData);
    //     console.log('====================================');
    //     dispatch(setUser(resData.data));
    //   })
    //   .catch(err => {
    //     console.log('====================================');
    //     console.log(err);
    //     console.log('====================================');
    //     dispatch(setUser([]));
    //   });
  };
};

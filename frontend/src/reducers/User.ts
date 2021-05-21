/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  SET_USERS,
  UserTypes,
} from 'types/actions';
import { User } from 'types/User';

const userReducersDefaultState: User[] = [];

const UserReducer = (
  state = userReducersDefaultState,
  action: UserTypes,
): User[] => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.user];

    case DELETE_USER:
      return state.filter(({ id }) => id !== action.id);

    case SET_USERS:
      console.log('====================================');
      console.log('SET_USERS');
      console.log('====================================');
      return action.users;

    case EDIT_USER:
      return state.map(user => {
        if (user.id === action.user.id) {
          return {
            ...user,
            ...action.user,
          };
        } else {
          return user;
        }
      });

    default:
      return state;
  }
};

export { UserReducer };

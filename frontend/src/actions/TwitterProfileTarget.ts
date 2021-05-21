/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from 'redux';
import twitterService from 'service/twitterService';
import { AppState } from 'store/configureStore';
import {
  AppActions,
  ADD_TWITTER_PROFILE_TARGET,
  SET_TWITTER_PROFILE_TARGETS,
  DELETE_TWITTER_PROFILE_TARGET,
  EDIT_TWITTER_PROFILE_TARGET,
} from 'types/actions';

import { TwitterProfileTarget } from '../types/TwitterProfileTarget';

export const addTwitterProfileTarget = (
  twitter_profile_target: TwitterProfileTarget,
): AppActions => ({
  type: ADD_TWITTER_PROFILE_TARGET,
  twitter_profile_target,
});

export const deleteTwitterProfileTarget = (id: string): AppActions => ({
  type: DELETE_TWITTER_PROFILE_TARGET,
  id,
});

export const editTwitterProfileTarget = (
  twitter_profile_target: TwitterProfileTarget,
): AppActions => ({
  type: EDIT_TWITTER_PROFILE_TARGET,
  twitter_profile_target,
});

export const setTwitterProfileTarget = (
  twitter_profile_targets: TwitterProfileTarget[],
): AppActions => ({
  type: SET_TWITTER_PROFILE_TARGETS,
  twitter_profile_targets,
});

export const startAddTwitterProfileTarget = (twitterTweetsTargetsData: {
  id?: string | number;
  target_platform?: string | number;
  target_type?: string | number;
  target_username?: string | number;
  tweets_count?: string | number;
  tweets?: Array<any>;
  followers?: Array<any>;
  followings?: Array<any>;
  target_scheduling?: string | number;
  scanning_status?: string | number;
  created_at?: string | number;
  updated_at?: string | number;
}) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const {
      id = '',
      target_platform = '',
      target_type = '',
      target_username = '',
      tweets = [],
      followers = [],
      followings = [],
      scanning_status = '',
      target_scheduling = '',
      created_at = '',
      updated_at = '',
    } = twitterTweetsTargetsData;
    const twitter_profile_target = {
      id,
      target_platform,
      target_type,
      target_username,
      tweets,
      followers,
      followings,
      scanning_status,
      target_scheduling,
      created_at,
      updated_at,
    };
    return dispatch(
      addTwitterProfileTarget({
        ...twitter_profile_target,
      }),
    );
  };
};

export const startDeleteTwitterProfileTarget = (id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(deleteTwitterProfileTarget(id));
  };
};

export const startEditTwitterProfileTarget = (
  twitter_profile_target: TwitterProfileTarget,
) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(editTwitterProfileTarget(twitter_profile_target));
  };
};

export const startSetTwitterProfileTarget = (
  twitter_profile_targets: TwitterProfileTarget[],
) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    twitterService
      .allProfilesTargets()
      .then(resData => {
        console.log('====================================');
        console.log('startSetTwitterProfileTarget >> :', resData);
        console.log('====================================');
        dispatch(setTwitterProfileTarget(resData.data));
      })
      .catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        dispatch(setTwitterProfileTarget([]));
      });
  };
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from 'redux';
import twitterService from 'service/twitterService';
import { AppState } from 'store/configureStore';
import {
  AppActions,
  ADD_TWITTER_TWEETS_TARGET,
  SET_TWITTER_TWEETS_TARGETS,
  DELETE_TWITTER_TWEETS_TARGET,
  EDIT_TWITTER_TWEETS_TARGET,
} from 'types/actions';

import { TwitterTweetsTarget } from '../types/TwitterTweetsTarget';

export const addTwitterTweetsTarget = (
  twitter_tweets_target: TwitterTweetsTarget,
): AppActions => ({
  type: ADD_TWITTER_TWEETS_TARGET,
  twitter_tweets_target,
});

export const deleteTwitterTweetsTarget = (id: string): AppActions => ({
  type: DELETE_TWITTER_TWEETS_TARGET,
  id,
});

export const editTwitterTweetsTarget = (
  twitter_tweets_target: TwitterTweetsTarget,
): AppActions => ({
  type: EDIT_TWITTER_TWEETS_TARGET,
  twitter_tweets_target,
});

export const setTwitterTweetsTarget = (
  twitter_tweets_targets: TwitterTweetsTarget[],
): AppActions => ({
  type: SET_TWITTER_TWEETS_TARGETS,
  twitter_tweets_targets,
});

export const startAddTwitterTweetsTarget = (twitterTweetsTargetsData: {
  id?: string | number;
  target_platform?: string | number;
  target_type?: string | number;
  target_username?: string | number;
  tweets_count?: string | number;
  tweets?: Array<any>;
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
      tweets_count = '',
      tweets = [],
      scanning_status = '',
      target_scheduling = '',
      created_at = '',
      updated_at = '',
    } = twitterTweetsTargetsData;
    const twitter_tweets_target = {
      id,
      target_platform,
      target_type,
      target_username,
      tweets_count,
      tweets,
      scanning_status,
      target_scheduling,
      created_at,
      updated_at,
    };
    return dispatch(
      addTwitterTweetsTarget({
        ...twitter_tweets_target,
      }),
    );
  };
};

export const startDeleteTwitterTweetsTarget = (id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(deleteTwitterTweetsTarget(id));
  };
};

export const startEditTwitterTweetsTarget = (
  twitter_tweets_target: TwitterTweetsTarget,
) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(editTwitterTweetsTarget(twitter_tweets_target));
  };
};

export const startSetTwitterTweetsTarget = (
  twitter_tweets_targets: TwitterTweetsTarget[],
) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    twitterService
      .allTweetsTargets()
      .then(resData => {
        console.log('====================================');
        console.log('startSetTwitterTweetsTarget >> :', resData);
        console.log('====================================');
        dispatch(setTwitterTweetsTarget(resData.data));
      })
      .catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        dispatch(setTwitterTweetsTarget([]));
      });
  };
};

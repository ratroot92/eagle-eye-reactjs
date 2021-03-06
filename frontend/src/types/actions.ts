import { TwitterTweetsTarget } from './TwitterTweetsTarget';
import { TwitterProfileTarget } from './TwitterProfileTarget';
import { User } from './User';

/**
 * TwitterTweetsTarget TYPES START
 */
export const ADD_TWITTER_TWEETS_TARGET = 'ADD_TWITTER_TWEETS_TARGET';
export const DELETE_TWITTER_TWEETS_TARGET = 'DELETE_TWITTER_TWEETS_TARGET';
export const SET_TWITTER_TWEETS_TARGETS = 'SET_TWITTER_TWEETS_TARGETS';
export const EDIT_TWITTER_TWEETS_TARGET = 'EDIT_TWITTER_TWEETS_TARGET';

export interface ADD_TWITTER_TWEETS_ACTION {
  type: typeof ADD_TWITTER_TWEETS_TARGET;
  twitter_tweets_target: TwitterTweetsTarget;
}

export interface EDIT_TWITTER_TWEETS_ACTION {
  type: typeof EDIT_TWITTER_TWEETS_TARGET;
  twitter_tweets_target: TwitterTweetsTarget;
}

export interface DELETE_TWITTER_TWEETS_TARGET_ACTION {
  type: typeof DELETE_TWITTER_TWEETS_TARGET;
  id: string;
}

export interface SET_TWITTER_TWEETS_TARGETS_ACTION {
  type: typeof SET_TWITTER_TWEETS_TARGETS;
  twitter_tweets_targets: TwitterTweetsTarget[];
}

/**
 * TwitterTweetsTarget TYPES END
 */

/**
 * TwitterProfileTarget TYPES START
 */
export const ADD_TWITTER_PROFILE_TARGET = 'ADD_TWITTER_PROFILE_TARGET';
export const DELETE_TWITTER_PROFILE_TARGET = 'DELETE_TWITTER_PROFILE_TARGET';
export const SET_TWITTER_PROFILE_TARGETS = 'SET_TWITTER_PROFILE_TARGETS';
export const EDIT_TWITTER_PROFILE_TARGET = 'EDIT_TWITTER_PROFILE_TARGET';

export interface ADD_TWITTER_PROFILE_ACTION {
  type: typeof ADD_TWITTER_PROFILE_TARGET;
  twitter_profile_target: TwitterProfileTarget;
}

export interface EDIT_TWITTER_PROFILE_ACTION {
  type: typeof EDIT_TWITTER_PROFILE_TARGET;
  twitter_profile_target: TwitterProfileTarget;
}

export interface DELETE_TWITTER_PROFILE_TARGET_ACTION {
  type: typeof DELETE_TWITTER_PROFILE_TARGET;
  id: string;
}

export interface SET_TWITTER_PROFILE_TARGETS_ACTION {
  type: typeof SET_TWITTER_PROFILE_TARGETS;
  twitter_profile_targets: TwitterProfileTarget[];
}
/**
 * TwitterProfileTarget TYPES END
 */

/**
 * USER TYPES START
 */

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_USERS = 'SET_USERS';
export const EDIT_USER = 'EDIT_USER';

export interface ADD_USER_ACTION {
  type: typeof ADD_USER;
  user: User;
}

export interface EDIT_USER_ACTION {
  type: typeof EDIT_USER;
  user: User;
}

export interface DELETE_USER_ACTION {
  type: typeof DELETE_USER;
  id: string;
}

export interface SET_USERS_ACTION {
  type: typeof SET_USERS;
  users: User[];
}

/**
 * USER TYPES END
 */

/**
 * CREATE AGGREGATION OF ALL ACTIONS
 */

export type TwitterTweetsTargetTypes =
  | ADD_TWITTER_TWEETS_ACTION
  | DELETE_TWITTER_TWEETS_TARGET_ACTION
  | EDIT_TWITTER_TWEETS_ACTION
  | SET_TWITTER_TWEETS_TARGETS_ACTION;

export type TwitterProfileTargetTypes =
  | ADD_TWITTER_PROFILE_ACTION
  | DELETE_TWITTER_PROFILE_TARGET_ACTION
  | EDIT_TWITTER_PROFILE_ACTION
  | SET_TWITTER_PROFILE_TARGETS_ACTION;

export type UserTypes =
  | ADD_USER_ACTION
  | EDIT_USER_ACTION
  | DELETE_USER_ACTION
  | SET_USERS_ACTION;

/**
 * TwitterTweetsTarget TYPES END
 */

/**
 * CREATE AGGREGATION OF ALL ACTIONS OF APP
 */
export type AppActions =
  | TwitterTweetsTargetTypes
  | TwitterProfileTargetTypes
  | UserTypes;

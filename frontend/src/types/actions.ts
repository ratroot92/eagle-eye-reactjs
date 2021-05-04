import { TwitterTweetsTarget } from './TwitterTweetsTarget';

/**
 * TwitterTweetsTarget TYPES START
 */
export const ADD_TWITTER_TWEETS_TARGET = 'ADD_TWITTER_TWEETS_TARGET';
export const DELETE_TWITTER_TWEETS_TARGET = 'DELETE_TWITTER_TWEETS_TARGET';
export const SET_TWITTER_TWEETS_TARGETS = 'SET_TWITTER_TWEETS_TARGETS';

export interface ADD_TWITTER_TWEETS_ACTION {
  type: typeof ADD_TWITTER_TWEETS_TARGET;
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
 * CREATE AGGREGATION OF ALL ACTIONS
 */

export type TwitterTweetsTargetTypes =
  | ADD_TWITTER_TWEETS_ACTION
  | DELETE_TWITTER_TWEETS_TARGET_ACTION
  | SET_TWITTER_TWEETS_TARGETS_ACTION;

/**
 * TwitterTweetsTarget TYPES END
 */

/**
 * CREATE AGGREGATION OF ALL ACTIONS OF APP
 */
export type AppActions = TwitterTweetsTargetTypes;

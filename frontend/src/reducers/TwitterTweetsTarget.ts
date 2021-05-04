/* eslint-disable import/no-anonymous-default-export */
import { TwitterTweetsTargetTypes } from 'types/actions';
import { TwitterTweetsTarget } from 'types/TwitterTweetsTarget';

const twitterTweetsTargetReducersDefaultState: TwitterTweetsTarget[] = [];

const TwitterTweetsTargetReducer = (
  state = twitterTweetsTargetReducersDefaultState,
  action: TwitterTweetsTargetTypes,
): TwitterTweetsTarget[] => {
  switch (action.type) {
    case 'ADD_TWITTER_TWEETS_TARGET':
      return [...state, action.twitter_tweets_target];

    case 'DELETE_TWITTER_TWEETS_TARGET':
      return state.filter(({ id }) => id !== action.id);

    case 'SET_TWITTER_TWEETS_TARGETS':
      return action.twitter_tweets_targets;

    // case 'EDIT_TWITTER_TWEETS_TARGETS':
    //   return state.map(twitter_tweets_targets => {
    //     if (twitter_tweets_targets.id === action.id) {
    //       return { ...twitter_tweets_targets, ...action.payload };
    //     }
    //   });

    default:
      return state;
  }
};

export { TwitterTweetsTargetReducer };

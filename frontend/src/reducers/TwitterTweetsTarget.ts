import {
  ADD_TWITTER_TWEETS_TARGET,
  DELETE_TWITTER_TWEETS_TARGET,
  EDIT_TWITTER_TWEETS_TARGET,
  SET_TWITTER_TWEETS_TARGETS,
  TwitterTweetsTargetTypes,
} from 'types/actions';
import { TwitterTweetsTarget } from 'types/TwitterTweetsTarget';

const twitterTweetsTargetReducersDefaultState: TwitterTweetsTarget[] = [];

const TwitterTweetsTargetReducer = (
  state = twitterTweetsTargetReducersDefaultState,
  action: TwitterTweetsTargetTypes,
): TwitterTweetsTarget[] => {
  switch (action.type) {
    case ADD_TWITTER_TWEETS_TARGET:
      return [...state, action.twitter_tweets_target];

    case DELETE_TWITTER_TWEETS_TARGET:
      return state.filter(({ id }) => id !== action.id);

    case SET_TWITTER_TWEETS_TARGETS:
      return action.twitter_tweets_targets;

    case EDIT_TWITTER_TWEETS_TARGET:
      return state.map(twitter_tweets_target => {
        if (twitter_tweets_target.id === action.twitter_tweets_target.id) {
          return { ...twitter_tweets_target, ...action.twitter_tweets_target };
        } else {
          return twitter_tweets_target;
        }
      });

    default:
      return state;
  }
};

export { TwitterTweetsTargetReducer };

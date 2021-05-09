import {
  ADD_TWITTER_PROFILE_TARGET,
  DELETE_TWITTER_PROFILE_TARGET,
  EDIT_TWITTER_PROFILE_TARGET,
  SET_TWITTER_PROFILE_TARGETS,
  TwitterProfileTargetTypes,
} from 'types/actions';
import { TwitterProfileTarget } from 'types/TwitterProfileTarget';

const twitterProfileTargetReducersDefaultState: TwitterProfileTarget[] = [];

const TwitterProfileTargetReducer = (
  state = twitterProfileTargetReducersDefaultState,
  action: TwitterProfileTargetTypes,
): TwitterProfileTarget[] => {
  switch (action.type) {
    case ADD_TWITTER_PROFILE_TARGET:
      return [...state, action.twitter_profile_target];

    case DELETE_TWITTER_PROFILE_TARGET:
      return state.filter(({ id }) => id !== action.id);

    case SET_TWITTER_PROFILE_TARGETS:
      return action.twitter_profile_targets;

    case EDIT_TWITTER_PROFILE_TARGET:
      return state.map(twitter_profile_target => {
        if (twitter_profile_target.id === action.twitter_profile_target.id) {
          return {
            ...twitter_profile_target,
            ...action.twitter_profile_target,
          };
        } else {
          return twitter_profile_target;
        }
      });

    default:
      return state;
  }
};

export { TwitterProfileTargetReducer };

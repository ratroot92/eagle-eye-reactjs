// /**
//  * Create the store with dynamic reducers
//  */

// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { createInjectorsEnhancer } from 'redux-injectors';
// import createSagaMiddleware from 'redux-saga';

// import { createReducer } from './reducers';

// export function configureAppStore() {
//   const reduxSagaMonitorOptions = {};
//   const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
//   const { run: runSaga } = sagaMiddleware;

//   // Create the store with saga middleware
//   const middlewares = [sagaMiddleware];

//   const enhancers = [
//     createInjectorsEnhancer({
//       createReducer,
//       runSaga,
//     }),
//   ];

//   const store = configureStore({
//     reducer: createReducer(),
//     middleware: [...getDefaultMiddleware(), ...middlewares],
//     devTools: process.env.NODE_ENV !== 'production',
//     enhancers,
//   });

//   return store;
// }

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { TwitterTweetsTargetReducer } from '../reducers/TwitterTweetsTarget';
import { TwitterProfileTargetReducer } from '../reducers/TwitterProfileTarget';
import { UserReducer } from '../reducers/User';
import { AppActions } from '../types/actions';
export const rootReducer = combineReducers({
  twitter_tweets_targets: TwitterTweetsTargetReducer,
  twitter_profile_targets: TwitterProfileTargetReducer,
  users: UserReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
);

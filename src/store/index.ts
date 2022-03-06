import { configureStore, Store } from '@reduxjs/toolkit';
// We'll use redux-logger just as an example of adding another middleware
// import logger from 'redux-logger';
// And use redux-batch as an example of adding enhancers
import { reduxBatch } from '@manaflair/redux-batch';
import thunk from 'redux-thunk';
import { createReducer } from './rootReducers';

export function createStoreInstance(): Store {
  // const middlewares = [logger, thunk];
  const middlewares = [thunk];

  const enhancers = [reduxBatch];
  const store = configureStore({
    reducer: createReducer(),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
    middleware: (getDefaultMiddleware) => {
      return [...getDefaultMiddleware(), ...middlewares];
    },
  });
  return store;
}

const store = createStoreInstance();
export default store;

import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { rootReducer, RootState } from '../reducers'

declare global {
  export interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    __PRELOADED_STATE__: RootState
  }
}

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

export const configureStore = (initialState?: RootState) => {
  // configure middlewares
  const middlewares = [
    ReduxThunk
  ];
  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );
  // create store
  return createStore<RootState>(
    rootReducer,
    initialState!,
    enhancer
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;

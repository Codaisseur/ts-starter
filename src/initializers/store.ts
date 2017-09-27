import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { rootReducer, RootState } from '../reducers'

export const configureStore = (initialState?: RootState) => {
  // configure middlewares
  const middlewares = [
    ReduxThunk
  ];
  // compose enhancers
  const enhancer = compose(
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

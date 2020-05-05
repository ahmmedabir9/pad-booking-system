import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './_reducers/rootReducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;

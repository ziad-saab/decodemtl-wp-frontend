import {applyMiddleware, createStore, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

// This logger should be used only on the client
const logger = createLogger({
  collapsed: ()=>true
});

import appReducer from './modules/reducer';

/*
  This is our redux store creator.
  It receives a history object to sync the router with redux using the reduxRouterMIddleware.
  On the client, we initialize a logger middleware, as well as Redux Devtools.
  Our last middleware is reduxThunk: it lets us dispatch functions that receive dispatch and getState to do async work.
  Finally, we enable hot reloading of our store through module.hot.
*/
export default function makeStore(history, initialState) {
  const reduxRouterMiddleware = routerMiddleware(history);

  let middleware = [reduxThunk, reduxRouterMiddleware];
  if (__CLIENT__) {
    middleware.push(logger);
  }
  const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore);
;

  const store = createStoreWithMiddleware(appReducer, initialState);

  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      const nextRootReducer = require('./modules/reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

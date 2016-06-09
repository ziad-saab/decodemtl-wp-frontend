import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import studentsReducer from './students';
import pagesReducer from './pages';
import coursesReducer from './courses';
import i18nReducer from './i18n';
import ssrReducer from './ssr';

/*
  This is our main app reducer.
  In addition to importing our own reducers, it adds reduxAsyncConnect and the routing reducer.
  Together, these reducers create the global state of our application.
*/
export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  students: studentsReducer,
  pages: pagesReducer,
  courses: coursesReducer,
  i18n: i18nReducer,
  ssr: ssrReducer
});

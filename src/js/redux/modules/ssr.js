import {LOAD_PAGE_FAIL} from './pages';
import {LOAD_COURSE_FAIL} from './courses';

const initialState = {};

/*
  This module does not have its own actions nor action types.
  It simply watches the action stream for LOAD_*_FAIL actions, and sets the error404 state to true.
  This gets picked up on the server side rendering and return a 404 for that page instead of a 200!
*/
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PAGE_FAIL:
    case LOAD_COURSE_FAIL:
      return {
        ...state,
        error404: true
      };
  }
  // Default
  return state;
}

import * as api from '../../api-client';

const LOAD_COURSE = 'LOAD_COURSE';
export const LOAD_COURSE_SUCCESS = 'LOAD_COURSE_SUCCESS';
export const LOAD_COURSE_FAIL = 'LOAD_COURSE_FAIL';

const initialState = {};

/*
  This module takes care of loading courses by slug.
  It stores the course data in its sub-state, using the slug as a key

  We export a load action creator. It dispatches a thunk that uses the API to load a course.
*/
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case LOAD_COURSE:
      return {
        ...state,
        [action.slug]: {
          ...(state[action.slug] || {}),
          loading: true
        }
      };

    case LOAD_COURSE_SUCCESS:
      return {
        ...state,
        [action.slug]: {
          ...(state[action.slug] || {}),
          loading: false,
          loaded: true,
          data: action.result,
          error: null
        }
      };

    case LOAD_COURSE_FAIL:
      return {
        ...state,
        [action.slug]: {
          ...(state[action.slug] || {}),
          loading: false,
          loaded: false,
          data: null,
          error: action.error
        }
      };
  }
  // Default
  return state;
}

function _isLoaded(state, slug) {
  return state.courses && state.courses[slug] && state.courses[slug].loaded && state.courses[slug].data;
}

export function load(slug) {
  return (dispatch, getState) => {
    let course = _isLoaded(getState(), slug);
    if (course) {
      return Promise.resolve(course);
    }

    const language = getState().i18n.language; // this feels hackish, gotta be a better way...?

    dispatch({type: LOAD_COURSE, slug});
    return api.fetchCourse(slug, language)
      .then(
        result => {
          if (!result) {
            /*
              Our API call completes successfully even if there's no result (404). Let's change this here!
              The LOAD_COURSE_FAIL action will also be picked up by the ssr reducer to help the server return 404
            */
            // @TODO: Shouldn't this throw an exception instead?
            dispatch({type: LOAD_COURSE_FAIL, slug, error: 404});
          }

          dispatch({type: LOAD_COURSE_SUCCESS, slug, result});
          return result;
        }
      )
      .catch(
        error => dispatch({type: LOAD_COURSE_FAIL, slug, error})
      );
  }
}

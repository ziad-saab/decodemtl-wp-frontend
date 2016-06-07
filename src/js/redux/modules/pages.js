import * as api from '../../api-client';

const LOAD_PAGE = 'LOAD_PAGE';
const LOAD_PAGE_SUCCESS = 'LOAD_PAGE_SUCCESS';
const LOAD_PAGE_FAIL = 'LOAD_PAGE_FAIL';;

const initialState = {};

/*
  This module takes care of loading pages by slug.
  It stores the page data in its sub-state, using the slug as a key

  We export a load action creator. It dispatches a thunk that uses the API to load a page.
*/
//@TODO: implement re-fetching of possibly outdated pages
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case LOAD_PAGE:
      return {
        ...state,
        [action.slug]: {
          ...(state[action.slug] || {}),
          loading: true
        }
      };

    case LOAD_PAGE_SUCCESS:
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

    case LOAD_PAGE_FAIL:
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
  return state.pages && state.pages[slug] && state.pages[slug].loaded;
}

export function load(slug) {
  return (dispatch, getState) => {
    if (_isLoaded(getState(), slug)) {
      return;
    }

    dispatch({type: LOAD_PAGE, slug});
    return api.fetchPage(slug)
      .then(
        result => dispatch({type: LOAD_PAGE_SUCCESS, slug, result})
      )
      .catch(
        error=> dispatch({type: LOAD_PAGE_FAIL, slug, error})
      );
  }
}

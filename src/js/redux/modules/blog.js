import * as api from '../../api-client';

const LOAD_BLOG = 'LOAD_BLOG';
const LOAD_BLOG_SUCCESS = 'LOAD_BLOG_SUCCESS';
const LOAD_BLOG_FAIL = 'LOAD_BLOG_FAIL';

const initialState = {};

/*
  This module takes care of loading title and excerpt for posts, for a list.

  We export a load action creator. It dispatches a thunk that uses the API to load the posts list.
*/
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case LOAD_BLOG:
      return {
        ...state,
        loading: true
      };

    case LOAD_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };

    case LOAD_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
  }
  // Default
  return state;
}

function _isLoaded(state) {
  return state.blog && state.blog.loaded;
}

export function load() {
  return (dispatch, getState) => {
    if (_isLoaded(getState())) {
      return;
    }

    const language = getState().i18n.language; // this feels hackish, gotta be a better way...?

    dispatch({type: LOAD_BLOG});
    return api.fetchBlog(language)
      .then(
        result => dispatch({type: LOAD_BLOG_SUCCESS, result})
      )
      .catch(
        error=> dispatch({type: LOAD_BLOG_FAIL, error})
      );
  }
}

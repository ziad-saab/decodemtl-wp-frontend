import * as api from '../../api-client';

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const LOAD_STUDENTS_SUCCESS = 'LOAD_STUDENTS_SUCCESS';
const LOAD_STUDENTS_FAIL = 'LOAD_STUDENTS_FAIL';

const initialState = {
  loaded: false
};

/*
  This module takes care of loading students data.

  We export a load action creator. It dispatches a thunk that uses the API to load a page.
*/
//@TODO: implement re-fetching of possibly outdated student data
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case LOAD_STUDENTS:
      return {
        ...state,
        loading: true
      };

    case LOAD_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };

    case LOAD_STUDENTS_FAIL:
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
  return state.students && state.students.loaded;
}

export function load() {
  return (dispatch, getState) => {
    if (_isLoaded(getState())) {
      return;
    }

    dispatch({type: LOAD_STUDENTS});
    return api.fetchStudents()
      .then(
        result => dispatch({type: LOAD_STUDENTS_SUCCESS, result})
      )
      .catch(
        error=> dispatch({type: LOAD_STUDENTS_FAIL, error})
      );
  }
}

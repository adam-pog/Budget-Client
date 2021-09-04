import {
  SET_AUTHENTICATED
} from '../constants/action-types';

const authenticated = window.sessionStorage.getItem("authenticated") === 'true'

const initialState = {
  authenticated,
  name: window.sessionStorage.getItem("name")
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_AUTHENTICATED) {
    window.sessionStorage.setItem("authenticated", action.payload.authenticated);
    window.sessionStorage.setItem("name", action.payload.name);
    return Object.assign({}, state, {
      authenticated: action.payload.authenticated,
      name: action.payload.name
    });
  }

  return state;
};

export default rootReducer;

import {
  SET_AUTHENTICATED
} from '../constants/action-types';

const authenticated = localStorage.getItem("authenticated") === 'true'

const initialState = {
  authenticated
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_AUTHENTICATED) {
    localStorage.setItem("authenticated", action.payload.authenticated);

    if(action.payload.authenticated) {
      localStorage.setItem('token', action.payload.token)
    } else {
      localStorage.removeItem('token')
      localStorage.setItem('authenticated', false)
    }

    return Object.assign({}, state, {
      authenticated: action.payload.authenticated
    });
  }

  return state;
}

export default rootReducer;

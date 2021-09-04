import {
  SET_AUTHENTICATED,
  ADD_COMMAND_HISTORY,
  SET_ANIMATE,
  SET_PATH
} from "../constants/action-types";

export function setAuthenticated(payload) {
  return { type: SET_AUTHENTICATED, payload }
};

export function addCommandHistory(payload) {
  return { type: ADD_COMMAND_HISTORY, payload }
};

export function setAnimate(payload) {
  return { type: SET_ANIMATE, payload }
};

export function setPath(payload) {
  return { type: SET_PATH, payload }
};

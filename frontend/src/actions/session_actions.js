import * as SessionAPIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGIN = "RECEIVE_USER_LOGIN";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const receiveUserLogin = () => ({
  type: RECEIVE_USER_LOGIN,
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  SessionAPIUtil.setAuthToken(false);
  dispatch(logoutUser);
};

export const register = user => dispatch =>
  SessionAPIUtil.postNewUser(user).then(
    () => dispatch(receiveUserLogin()),
    err => dispatch(receiveSessionErrors(err.response.data))
  );

export const login = user => dispatch =>
  SessionAPIUtil.postNewSession(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      SessionAPIUtil.setAuthToken(token);
      const decodedUser = jwt_decode(token);
      dispatch(receiveCurrentUser(decodedUser));
    })
    .catch(err => dispatch(receiveSessionErrors(err.response.data)));
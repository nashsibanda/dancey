import * as SessionAPIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";
import { sessionLoadingOn, sessionLoadingOff } from "./loading_actions";

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGIN = "RECEIVE_USER_LOGIN";
export const SHOW_SESSION_FORM_MODAL = "SHOW_SESSION_FORM_MODAL";
export const HIDE_SESSION_FORM_MODAL = "HIDE_SESSION_FORM_MODAL";
export const TOGGLE_SESSION_FORM_MODAL = "TOGGLE_SESSION_FORM_MODAL";

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

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

export const showSessionFormModal = () => ({
  type: SHOW_SESSION_FORM_MODAL,
});

export const hideSessionFormModal = () => ({
  type: HIDE_SESSION_FORM_MODAL,
});

export const toggleSessionFormModal = () => ({
  type: TOGGLE_SESSION_FORM_MODAL,
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  SessionAPIUtil.setAuthToken(false);
  dispatch(logoutUser());
};

export const register = user => dispatch => {
  dispatch(sessionLoadingOn());
  SessionAPIUtil.postNewUser(user).then(
    res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      SessionAPIUtil.setAuthToken(token);
      const decodedUser = jwt_decode(token);
      dispatch(receiveCurrentUser(decodedUser));
      dispatch(hideSessionFormModal());
      dispatch(sessionLoadingOff());
      setLogoutTimeout(decodedUser, dispatch);
    },
    err => {
      dispatch(receiveSessionErrors(err.response.data));
      dispatch(sessionLoadingOff());
    }
  );
};

export const login = user => dispatch => {
  dispatch(sessionLoadingOn());
  SessionAPIUtil.postNewSession(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      SessionAPIUtil.setAuthToken(token);
      const decodedUser = jwt_decode(token);
      dispatch(receiveCurrentUser(decodedUser));
      dispatch(hideSessionFormModal());
      dispatch(sessionLoadingOff());
      setLogoutTimeout(decodedUser, dispatch);
    })
    .catch(err => {
      dispatch(receiveSessionErrors(err.response.data));
      dispatch(sessionLoadingOff());
    });
};

const setLogoutTimeout = (decodedUser, dispatch) => {
  setTimeout(() => {
    dispatch(logout());
    dispatch(
      receiveSessionErrors({
        name: "SessionTimeout",
        message: "Your session has timed out. Please log in again.",
      })
    );
  }, (decodedUser.exp - decodedUser.iat) * 1000);
};

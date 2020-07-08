import {
  SHOW_SESSION_FORM_MODAL,
  HIDE_SESSION_FORM_MODAL,
  TOGGLE_SESSION_FORM_MODAL,
} from "../actions/session_actions";
import { RECEIVE_RELEASES_COUNT } from "../actions/release_actions";

const _initialState = {
  showSessionFormModal: false,
  releasesIndexCount: 0,
  personnelIndexCount: 0,
};

const UiReducer = (state = _initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SHOW_SESSION_FORM_MODAL:
      return Object.assign({}, state, { showSessionFormModal: true });
    case HIDE_SESSION_FORM_MODAL:
      return Object.assign({}, state, { showSessionFormModal: false });
    case TOGGLE_SESSION_FORM_MODAL:
      return Object.assign({}, state, {
        showSessionFormModal: !state.showSessionFormModal,
      });
    case RECEIVE_RELEASES_COUNT:
      return Object.assign({}, state, { releasesIndexCount: action.count });
    default:
      return state;
  }
};

export default UiReducer;

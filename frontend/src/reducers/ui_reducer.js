import {
  SHOW_SESSION_FORM_MODAL,
  HIDE_SESSION_FORM_MODAL,
  TOGGLE_SESSION_FORM_MODAL,
} from "../actions/session_actions";

const _initialState = {
  showSessionFormModal: false,
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
    default:
      return state;
  }
};

export default UiReducer;

import {
  SESSION_LOADING_ON,
  SESSION_LOADING_OFF,
} from "../../actions/loading_actions";

const SessionLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SESSION_LOADING_ON:
      return true;
    case SESSION_LOADING_OFF:
      return false;
    default:
      return state;
  }
};

export default SessionLoadingReducer;

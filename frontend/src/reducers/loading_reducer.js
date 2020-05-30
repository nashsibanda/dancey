import { LOADING_ON, LOADING_OFF } from "../actions/loading_actions";

const LoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING_ON:
      return true;
    case LOADING_OFF:
      return false;
    default:
      return state;
  }
};

export default LoadingReducer;

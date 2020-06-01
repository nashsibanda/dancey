import {
  TRACKS_LOADING_ON,
  TRACKS_LOADING_OFF,
} from "../../actions/loading_actions";

const TracksLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case TRACKS_LOADING_ON:
      return true;
    case TRACKS_LOADING_OFF:
      return false;
    default:
      return state;
  }
};

export default TracksLoadingReducer;

import {
  RELEASES_LOADING_ON,
  RELEASES_LOADING_OFF,
} from "../../actions/loading_actions";

const ReleasesLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RELEASES_LOADING_ON:
      return true;
    case RELEASES_LOADING_OFF:
      return false;
    default:
      return state;
  }
};

export default ReleasesLoadingReducer;

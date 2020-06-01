import {
  TRACK_PERSONNEL_LOADING_ON,
  TRACK_PERSONNEL_LOADING_OFF,
} from "../../actions/loading_actions";

const TrackPersonnelLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case TRACK_PERSONNEL_LOADING_ON:
      return true;
    case TRACK_PERSONNEL_LOADING_OFF:
      return false;
    default:
      return state;
  }
};

export default TrackPersonnelLoadingReducer;

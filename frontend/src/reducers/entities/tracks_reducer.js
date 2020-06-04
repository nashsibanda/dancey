import {
  RECEIVE_TRACKS,
  RECEIVE_TRACK_AND_RELEASE,
} from "../../actions/track_actions";

const TracksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACKS:
      const tracksOutput = {};
      action.tracks.forEach(track => {
        tracksOutput[track._id] = track;
      });
      return Object.assign({}, state, tracksOutput);
    case RECEIVE_TRACK_AND_RELEASE:
      const { track } = action;
      return Object.assign({}, state, { [track._id]: track });
    default:
      return state;
  }
};

export default TracksReducer;

import { RECEIVE_RELEASE } from "../../actions/release_actions";
import { RECEIVE_TRACKS } from "../../actions/track_actions";

const TracksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACKS:
      const tracksOutput = {};
      action.tracks.forEach(track => {
        tracksOutput[track._id] = track;
      });
      return Object.assign({}, state, tracksOutput);
    default:
      return state;
  }
};

export default TracksReducer;

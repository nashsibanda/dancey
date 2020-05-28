import { RECEIVE_RELEASE } from "../../actions/release_actions";

const TracksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RELEASE:
      const releaseTracksOutput = {};
      action.release.trackListing.forEach(({ trackId }) => {
        releaseTracksOutput[trackId._id] = trackId;
      });
      return releaseTracksOutput;
    default:
      return state;
  }
};

export default TracksReducer;

import {
  RECEIVE_RELEASE,
  RECEIVE_RELEASES,
} from "../../actions/release_actions";
import { RECEIVE_TRACK_AND_RELEASE } from "../../actions/track_actions";

const ReleasesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RELEASES:
      const releasesOutput = {};
      action.releases.forEach(release => {
        releasesOutput[release._id] = release;
      });
      return releasesOutput;
    case RECEIVE_RELEASE:
      const { release } = action;
      return Object.assign({}, state, { [release._id]: release });
    case RECEIVE_TRACK_AND_RELEASE:
      const { updatedRelease } = action;
      return Object.assign({}, state, { [updatedRelease._id]: updatedRelease });
    default:
      return state;
  }
};

export default ReleasesReducer;

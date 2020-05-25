import { RECEIVE_RELEASE, RECEIVE_RELEASES } from "../actions/release_actions";

const ReleasesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RELEASES:
      const releasesOutput = {};
      action.releases.forEach(release => {
        releasesOutput[release.id] = release;
      });
      return releasesOutput;
    case RECEIVE_RELEASE:
      const { release } = action;
      return Object.assign({}, state, { [release.id]: release });
    default:
      return state;
  }
};

export default ReleasesReducer;

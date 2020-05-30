import * as ReleaseAPIUtil from "../util/release_api_util";
import { loadingOn, loadingOff } from "./loading_actions";

export const RECEIVE_RELEASE = "RECEIVE_RELEASE";
export const RECEIVE_RELEASES = "RECEIVE_RELEASES";
export const RECEIVE_RELEASE_ERRORS = "RECEIVE_RELEASE_ERRORS";

export const receiveRelease = release => ({
  type: RECEIVE_RELEASE,
  release,
});

export const receiveReleases = releases => ({
  type: RECEIVE_RELEASES,
  releases,
});

export const receiveReleaseErrors = errors => ({
  type: RECEIVE_RELEASE_ERRORS,
  errors,
});

export const fetchAllReleases = () => dispatch => {
  dispatch(loadingOn());
  ReleaseAPIUtil.getAllReleases()
    .then(releases => {
      dispatch(receiveReleases(releases.data));
      dispatch(loadingOff());
    })
    .catch(err => dispatch(receiveReleaseErrors(err.response.data)));
};

export const fetchOneRelease = id => dispatch => {
  dispatch(loadingOn());
  ReleaseAPIUtil.getOneRelease(id)
    .then(release => {
      dispatch(receiveRelease(release.data));
      dispatch(loadingOff());
    })
    .catch(err => dispatch(receiveReleaseErrors(err.response.data)));
};

export const fetchPersonnelReleases = personnelId => dispatch => {
  dispatch(loadingOn());
  ReleaseAPIUtil.getPersonnelReleases(personnelId)
    .then(releases => {
      dispatch(receiveReleases(releases.data));
      dispatch(loadingOff());
    })
    .catch(err => dispatch(receiveReleaseErrors(err.response.data)));
};

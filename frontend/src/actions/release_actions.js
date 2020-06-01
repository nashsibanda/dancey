import * as ReleaseAPIUtil from "../util/release_api_util";
import { releasesLoadingOn, releasesLoadingOff } from "./loading_actions";

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
  dispatch(releasesLoadingOn());
  ReleaseAPIUtil.getAllReleases()
    .then(releases => {
      dispatch(receiveReleases(releases.data));
      dispatch(releasesLoadingOff());
    })
    .catch(err => {
      dispatch(receiveReleaseErrors(err.response.data));
      dispatch(releasesLoadingOff());
    });
};

export const fetchOneRelease = id => dispatch => {
  dispatch(releasesLoadingOn());
  ReleaseAPIUtil.getOneRelease(id)
    .then(release => {
      dispatch(receiveRelease(release.data));
      dispatch(releasesLoadingOff());
    })
    .catch(err => {
      dispatch(receiveReleaseErrors(err.response.data));
      dispatch(releasesLoadingOff());
    });
};

export const fetchPersonnelReleases = personnelId => dispatch => {
  dispatch(releasesLoadingOn());
  ReleaseAPIUtil.getPersonnelReleases(personnelId)
    .then(releases => {
      dispatch(receiveReleases(releases.data));
      dispatch(releasesLoadingOff());
    })
    .catch(err => {
      dispatch(receiveReleaseErrors(err.response.data));
      dispatch(releasesLoadingOff());
    });
};

export const updateRelease = (id, releaseUpdateData) => dispatch => {
  dispatch(releasesLoadingOn());
  ReleaseAPIUtil.putRelease(id, releaseUpdateData)
    .then(release => {
      dispatch(receiveRelease(release.data));
      dispatch(releasesLoadingOff());
    })
    .catch(err => {
      dispatch(receiveReleaseErrors(err.response.data));
      dispatch(releasesLoadingOff());
    });
};

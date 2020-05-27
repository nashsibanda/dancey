import * as ReleaseAPIUtil from "../util/release_api_util";

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

export const fetchAllReleases = () => dispatch =>
  ReleaseAPIUtil.getAllReleases()
    .then(releases => dispatch(receiveReleases(releases.data)))
    .catch(err => dispatch(receiveReleaseErrors(err.response.data)));

export const fetchOneReleases = () => dispatch =>
  ReleaseAPIUtil.getOneRelease()
    .then(release => dispatch(receiveRelease(release)))
    .catch(err => dispatch(receiveReleaseErrors(err.response.data)));

export const fetchPersonnelReleases = personnelId => dispatch =>
  ReleaseAPIUtil.getPersonnelReleases(personnelId)
    .then(releases => dispatch(receiveReleases(releases)))
    .catch(err => dispatch(receiveReleaseErrors(err.response.data)));

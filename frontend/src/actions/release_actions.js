import * as ReleaseAPIUtil from "../util/release_api_util";
import { releasesLoadingOn, releasesLoadingOff } from "./loading_actions";

export const RECEIVE_RELEASE = "RECEIVE_RELEASE";
export const RECEIVE_RELEASES = "RECEIVE_RELEASES";
export const RECEIVE_RELEASES_COUNT = "RECEIVE_RELEASES_COUNT";
export const RECEIVE_RELEASE_ERRORS = "RECEIVE_RELEASE_ERRORS";

export const receiveRelease = release => ({
  type: RECEIVE_RELEASE,
  release,
});

export const receiveReleases = releases => ({
  type: RECEIVE_RELEASES,
  releases,
});

export const receiveReleasesCount = count => ({
  type: RECEIVE_RELEASES_COUNT,
  count,
});

export const receiveReleaseErrors = errors => ({
  type: RECEIVE_RELEASE_ERRORS,
  errors,
});

export const fetchAllReleases = (pageNum, itemsPerPage) => dispatch => {
  dispatch(releasesLoadingOn());
  ReleaseAPIUtil.getAllReleases(pageNum, itemsPerPage)
    .then(releases => {
      dispatch(receiveReleases(releases.data));
      dispatch(releasesLoadingOff());
    })
    .catch(err => {
      dispatch(receiveReleaseErrors(err.response.data));
      dispatch(releasesLoadingOff());
    });
};

export const countAllReleases = () => dispatch => {
  ReleaseAPIUtil.getAllReleasesCount()
    .then(count => dispatch(receiveReleasesCount(count.data)))
    .catch(err => dispatch(receiveReleaseErrors(err.response.data)));
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

export const countResourceReleases = (resourceType, resourceId) => dispatch => {
  ReleaseAPIUtil.getResourceReleasesCount(resourceType, resourceId)
    .then(count => dispatch(receiveReleasesCount(count.data)))
    .catch(err => dispatch(receiveReleaseErrors(err.response.data)));
};

export const fetchResourceReleases = (
  pageNum,
  itemsPerPage,
  resourceType,
  resourceId
) => dispatch => {
  dispatch(releasesLoadingOn());
  ReleaseAPIUtil.getResourceReleases(
    pageNum,
    itemsPerPage,
    resourceType,
    resourceId
  )
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
  ReleaseAPIUtil.putRelease(id, releaseUpdateData)
    .then(release => {
      dispatch(receiveRelease(release.data));
    })
    .catch(err => {
      dispatch(receiveReleaseErrors(err.response.data));
    });
};

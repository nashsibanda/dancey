import * as PersonnelAPIUtil from "../util/personnel_api_util";
import {
  personnelLoadingOn,
  personnelLoadingOff,
  trackPersonnelLoadingOn,
  trackPersonnelLoadingOff,
} from "./loading_actions";

export const RECEIVE_PERSONNEL = "RECEIVE_PERSONNEL";
export const RECEIVE_ONE_PERSONNEL = "RECEIVE_ONE_PERSONNEL";
export const RECEIVE_PERSONNEL_ERRORS = "RECEIVE_PERSONNEL_ERRORS";

const receivePersonnel = personnel => ({
  type: RECEIVE_PERSONNEL,
  personnel,
});

const receiveOnePersonnel = personnel => ({
  type: RECEIVE_ONE_PERSONNEL,
  personnel,
});

const receivePersonnelErrors = errors => ({
  type: RECEIVE_PERSONNEL_ERRORS,
  errors,
});

export const fetchResourcePersonnel = (
  resourceType,
  resourceId
) => dispatch => {
  if (resourceType === "release") dispatch(personnelLoadingOn());
  if (resourceType === "track") dispatch(trackPersonnelLoadingOn());
  PersonnelAPIUtil.getResourcePersonnel(resourceType, resourceId)
    .then(personnel => {
      dispatch(receivePersonnel(personnel.data));
      if (resourceType === "release") dispatch(personnelLoadingOff());
      if (resourceType === "track") dispatch(trackPersonnelLoadingOff());
    })
    .catch(err => {
      dispatch(receivePersonnelErrors(err.response.data));
      if (resourceType === "release") dispatch(personnelLoadingOff());
      if (resourceType === "track") dispatch(trackPersonnelLoadingOff());
    });
};

export const fetchResourceTracksPersonnel = (
  resourceType,
  resourceId
) => dispatch => {
  dispatch(trackPersonnelLoadingOn());
  PersonnelAPIUtil.getResourceTracksPersonnel(resourceType, resourceId)
    .then(personnel => {
      dispatch(receivePersonnel(personnel.data));
      dispatch(trackPersonnelLoadingOff());
    })
    .catch(err => {
      dispatch(receivePersonnelErrors(err.response.data));
      dispatch(trackPersonnelLoadingOff());
    });
};

export const fetchOnePersonnel = id => dispatch => {
  dispatch(personnelLoadingOn());
  PersonnelAPIUtil.getPersonnel(id)
    .then(personnel => {
      dispatch(receiveOnePersonnel(personnel.data));
      dispatch(personnelLoadingOff());
    })
    .catch(err => {
      dispatch(receivePersonnelErrors(err.response.data));
      dispatch(personnelLoadingOff());
    });
};

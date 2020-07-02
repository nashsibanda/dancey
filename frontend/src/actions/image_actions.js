import axios from "axios";
import { receiveReleaseErrors, receiveRelease } from "./release_actions";
import {
  receivePersonnelErrors,
  receiveOnePersonnel,
} from "./personnel_actions";

const resourceSwitch = resourceType => {
  switch (resourceType) {
    case "release":
      return {
        errors: receiveReleaseErrors,
        receiveOne: receiveRelease,
      };
    case "personnel":
      return {
        errors: receivePersonnelErrors,
        receiveOne: receiveOnePersonnel,
      };
    default:
      break;
  }
};

export const addResourceImage = (
  resourceType,
  resourceId,
  formData
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .put(`/api/images/add/${resourceType}/${resourceId}`, formData, config)
    .then(resource =>
      dispatch(resourceSwitch(resourceType).receiveOne(resource.data))
    )
    .catch(err =>
      dispatch(resourceSwitch(resourceType).errors(err.response.data))
    );
};

export const editResourceImageInfo = (
  resourceType,
  resourceId,
  imageObjectId,
  imageData
) => dispatch => {
  axios
    .put(
      `/api/images/edit/${resourceType}/${resourceId}/${imageObjectId}`,
      imageData
    )
    .then(resource =>
      dispatch(resourceSwitch(resourceType).receiveOne(resource.data))
    )
    .catch(err =>
      dispatch(resourceSwitch(resourceType).errors(err.response.data))
    );
};

export const deleteResourceImage = (
  resourceType,
  resourceId,
  imageObjectId
) => dispatch => {
  axios
    .delete(`/api/images/delete/${resourceType}/${resourceId}/${imageObjectId}`)
    .then(resource =>
      dispatch(resourceSwitch(resourceType).receiveOne(resource.data))
    )
    .catch(err =>
      dispatch(resourceSwitch(resourceType).errors(err.response.data))
    );
};

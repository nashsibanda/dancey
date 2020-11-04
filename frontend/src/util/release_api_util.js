import axios from "axios";

export const getAllReleases = (pageNum, itemsPerPage) =>
  axios.get(`/api/releases?pageNum=${pageNum}&itemsPerPage=${itemsPerPage}`);

export const getAllReleasesCount = (pageNum, itemsPerPage) =>
  axios.get(`/api/releases?count=true`);

export const getRandomReleases = (withImage, numberOfRecords) =>
  axios.get(
    `/api/releases/random?${
      withImage ? `with_image=${withImage}&` : ""
    }number=${numberOfRecords}`
  );

export const getOneRelease = id => axios.get(`api/releases/${id}`);

export const getResourceReleases = (
  pageNum,
  itemsPerPage,
  resourceType,
  resourceId
) =>
  axios.get(
    `api/releases/${resourceType}/${resourceId}?pageNum=${pageNum}&itemsPerPage=${itemsPerPage}`
  );

export const getResourceReleasesCount = (resourceType, resourceId) =>
  axios.get(`api/releases/${resourceType}/${resourceId}?count=true`);

export const postRelease = releasePostData =>
  axios.post("/api/releases", releasePostData);

export const putRelease = (id, releaseUpdateData) =>
  axios.put(`/api/releases/${id}`, releaseUpdateData);

export const deleteRelease = id => axios.delete(`api/releases/${id}`);

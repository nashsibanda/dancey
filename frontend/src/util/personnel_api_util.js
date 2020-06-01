import axios from "axios";

export const getAllPersonnel = () => axios.get("/api/personnel/");

export const getPersonnel = id => axios.get(`/api/personnel/${id}`);

export const getResourcePersonnel = (resourceType, resourceId) =>
  axios.get(`/api/personnel/get/${resourceType}/${resourceId}`);

export const getResourceTracksPersonnel = (resourceType, resourceId) =>
  axios.get(`/api/personnel/get/${resourceType}/${resourceId}/tracks`);

export const postPersonnel = trackPostData =>
  axios.post("/api/personnel/", trackPostData);

export const putPersonnel = (id, trackUpdateData) =>
  axios.put(`/api/personnel/${id}`, trackUpdateData);

export const deletePersonnel = id => axios.delete(`/api/personnel/${id}`);
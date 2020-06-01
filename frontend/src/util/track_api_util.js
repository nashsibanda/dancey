import axios from "axios";

export const getAllTracks = () => axios.get("/api/tracks/");

export const getTrack = id => axios.get(`/api/tracks/${id}`);

export const getResourceTracks = (resourceType, resourceId) =>
  axios.get(`/api/tracks/get/${resourceType}/${resourceId}`);

export const postTrack = trackPostData =>
  axios.post("/api/tracks/", trackPostData);

export const putTrack = (id, trackUpdateData) =>
  axios.put(`/api/tracks/${id}`, trackUpdateData);

export const deleteTrack = id => axios.delete(`/api/tracks/${id}`);

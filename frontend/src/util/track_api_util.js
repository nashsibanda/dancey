import axios from "axios";

export const getAllTracks = () => axios.get("/api/tracks/");

export const getOneTrack = id => axios.get(`/api/tracks/${id}`);

export const getResourceTracks = (resourceType, resourceId) =>
  axios.get(`/api/tracks/get/${resourceType}/${resourceId}`);

// export const getPersonnelTracks = personnelId =>
//   axios.get(`/api/tracks/get/personnel/${personnelId}`);

// export const getReleaseTracks = releaseId =>
//   axios.get(`/api/tracks/get/release/${releaseId}`);

export const postTrack = trackPostData =>
  axios.post("/api/tracks/", trackPostData);

export const putTrack = (id, trackUpdateData) =>
  axios.put(`/api/tracks/${id}`, trackUpdateData);

export const deleteTrack = id => axios.delete(`/api/tracks/${id}`);

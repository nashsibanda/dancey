import axios from "axios";

export const getAllReleases = () => axios.get("/api/releases");

export const getOneRelease = id => axios.get(`api/releases/${id}`);

export const getPersonnelReleases = personnelId =>
  axios.get(`api/releases/personnel/${personnelId}`);

export const postRelease = postData => axios.post("/api/releases", postData);

export const putRelease = (id, updateData) =>
  axios.put(`/api/releases/${id}`, updateData);

export const deleteRelease = id => axios.delete(`api/releases/${id}`);

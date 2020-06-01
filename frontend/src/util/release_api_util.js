import axios from "axios";

export const getAllReleases = () => axios.get("/api/releases");

export const getOneRelease = id => axios.get(`api/releases/${id}`);

export const getPersonnelReleases = personnelId =>
  axios.get(`api/releases/personnel/${personnelId}`);

export const postRelease = releasePostData =>
  axios.post("/api/releases", releasePostData);

export const putRelease = (id, releaseUpdateData) =>
  axios.put(`/api/releases/${id}`, releaseUpdateData);

export const deleteRelease = id => axios.delete(`api/releases/${id}`);

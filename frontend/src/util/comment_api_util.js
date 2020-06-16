import axios from "axios";

export const getAllComments = () => axios.get("/api/comments/all");

export const getOneComment = id => axios.get(`api/comments/${id}`);

export const getResourceComments = (resourceType, resourceId) =>
  axios.get(`api/comments/get/${resourceType}/${resourceId}`);

export const postComment = commentPostData =>
  axios.post("/api/comments", commentPostData);

export const updateComment = (id, commentUpdateData) =>
  axios.post(`/api/comments/${id}`, commentUpdateData);

export const putCommentLike = id => axios.put(`/api/comments/${id}/like`);

export const deleteComment = id => axios.delete(`api/comments/${id}`);

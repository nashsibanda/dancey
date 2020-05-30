import axios from "axios";

export const getAllReviews = () => axios.get("/api/reviews");

export const getOneReview = id => axios.get(`api/reviews/${id}`);

export const getPersonnelReviews = (resourceType, resourceId) =>
  axios.get(`api/reviews/resource/${resourceId}`);

export const postReview = postData => axios.post("/api/reviews", postData);

export const updateReview = (id, updateData) =>
  axios.post(`/api/reviews/${id}`, updateData);

export const deleteReview = id => axios.delete(`api/reviews/${id}`);

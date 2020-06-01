import axios from "axios";

export const getAllReviews = () => axios.get("/api/reviews");

export const getOneReview = id => axios.get(`api/reviews/${id}`);

export const getResourceReviews = (resourceType, resourceId) =>
  axios.get(`api/reviews/get/${resourceType}/${resourceId}`);

export const postReview = reviewPostData =>
  axios.post("/api/reviews", reviewPostData);

export const updateReview = (id, reviewUpdateData) =>
  axios.post(`/api/reviews/${id}`, reviewUpdateData);

export const deleteReview = id => axios.delete(`api/reviews/${id}`);

import axios from "axios";

export const getSearchRecords = (recordType, query = "") =>
  axios.get(`api/search?keyword=${query}&type=${recordType}`);

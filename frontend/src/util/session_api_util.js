import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const postNewUser = newUserData => {
  return axios.post("/api/users/register", newUserData);
};

export const postNewSession = loginUserData => {
  return axios.post("/api/users/login", loginUserData);
};

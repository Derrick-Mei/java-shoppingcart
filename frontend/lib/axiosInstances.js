import axios from "axios";

const baseAxios = axios.create({
    baseURL: process.env.BACKEND_URL,
  });
function createBearerAxios() {
  return axios.create({
    baseURL: `${process.env.BACKEND_URL}`,
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      "Content-Type": "application/json"
    },
  });
}


export { baseAxios, createBearerAxios };
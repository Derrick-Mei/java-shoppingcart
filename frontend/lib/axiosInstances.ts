import axios from "axios";
const isDev = Boolean(process.env.IS_DEV);
function createBaseAxios() {
  return axios.create({
    baseURL: isDev
      ? process.env.BACKEND_URL
      : "https://meanbean2.herokuapp.com",
  });
}

function createBearerAxios() {
  return axios.create({
    baseURL: isDev
      ? process.env.BACKEND_URL
      : "https://meanbean2.herokuapp.com",
    headers: {
      Authorization:
        "Bearer " + window.localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
  });
}

export {createBaseAxios, createBearerAxios};

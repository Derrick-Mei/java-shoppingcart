import axios from "axios";

const baseAxios = axios.create({
    baseURL: "https://meanbeanmysql.herokuapp.com",
  });
function createBearerAxios() {
  return axios.create({
    baseURL: `https://meanbeanmysql.herokuapp.com`,
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      "Content-Type": "application/json"
    },
  });
}


export { baseAxios, createBearerAxios };
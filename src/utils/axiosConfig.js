import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //   timeout: 1000,
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + Cookies.get("token"),
  },
});

export const notAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

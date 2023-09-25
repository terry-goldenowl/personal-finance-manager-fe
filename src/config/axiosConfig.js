import axios from "axios";
import Cookies from "js-cookie";

export const controller = new AbortController();

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //   timeout: 1000,
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + Cookies.get("token"),
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const notAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

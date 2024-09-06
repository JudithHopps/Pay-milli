import axios from "axios";
const BASE_URL = "TEST";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  //baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default axiosInstance;

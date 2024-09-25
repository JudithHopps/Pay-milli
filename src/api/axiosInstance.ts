import axios from "axios";
const BASE_URL = "http://j11a702.p.ssafy.io/api/v1/paymilli";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  //baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default axiosInstance;

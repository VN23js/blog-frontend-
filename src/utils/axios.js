import axios from "axios";

const instance = axios.create({
  baseURL: "https://lwr1vjxm-3003.euw.devtunnels.ms/api",
  validateStatus: () => true
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;

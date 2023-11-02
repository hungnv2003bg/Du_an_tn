import axios from "axios";
import queryString from "query-string";

const prodConfig = "https://api.polyfood.store/api/";
const devConfig = "https://localhost:7064/api/";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
const axiosClient = axios.create({
  baseURL: config,
  // baseURL: "https://localhost:7064/api/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;

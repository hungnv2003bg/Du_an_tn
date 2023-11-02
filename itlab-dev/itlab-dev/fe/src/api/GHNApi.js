import axios from "axios";

const GHN_API_BASE_URL = "https://dev-online-gateway.ghn.vn/shiip/public-api/";
const GHNApi = axios.create({
  baseURL: GHN_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Token: "d69d5ac4-428d-11ee-a6e6-e60958111f48",
    ShopId: "125587",
  },
});
export default GHNApi;

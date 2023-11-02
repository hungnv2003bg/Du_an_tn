import GHNApi from "../GHNApi";

const GiaoHangNhanhApi = {
  CalculateShippingFeeApi: (data) => {
    const url = "v2/shipping-order/fee";
    return GHNApi.post(url, data);
  },

  IntendTime: (data) => {
    const url = "v2/shipping-order/leadtime";
    return GHNApi.post(url, data);
  },
  CreateOrder: (data) => {
    const url = "v2/shipping-order/create";
    return GHNApi.post(url, data);
  },
};
export default GiaoHangNhanhApi;

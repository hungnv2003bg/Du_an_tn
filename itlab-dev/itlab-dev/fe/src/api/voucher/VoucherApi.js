import axiosClient from "../AxiosClient";

const VoucherApi = {
  UseVoucher: (userId, VoucherCode) => {
    const url = `/voucher/${userId}/${VoucherCode}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  ApllyVoucher: (userId, VoucherCode) => {
    const url = `/voucher/${userId}/${VoucherCode}`;
    return axiosClient.post(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  getAllVouchers: (params = null) => {
    const url = "/Voucher";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
      params: {
        ...params,
      },
    });
  },
  removeVoucher: (id) => {
    const url = `/Voucher/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  CreateVoucher: (body) => {
    const url = "/Voucher";
    return axiosClient.post(url, body, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  GetUsersWithoutPromotionUsage: (voucherId) => {
    const url = `/Voucher/users-without-promotion-usage/${voucherId}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  SendMailPromotionUser: (data) => {
    const url = `/Voucher/send-promotion`;
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
};

export default VoucherApi;

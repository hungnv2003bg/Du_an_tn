import axiosClient from "../AxiosClient";

const CartApi = {
  GetCart: (userId) => {
    const url = `/Cart/${userId}`;
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
  ChangeCartItem: (param) => {
    const url = `Cart/update-cart-item/${param.productId}/${param.userId}/${param.quantity}/${param.IsAdd}`;
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
  RemoveAllCart: (userId) => {
    const url = `Cart/remove-cart/${userId}`;
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
  AddListCart: (data) => {
    const url = `Cart/add-cart-list`;
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

export default CartApi;

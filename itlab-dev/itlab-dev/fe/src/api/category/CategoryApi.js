import axiosClient from "../AxiosClient";

const categoryAPI = {
  getAllCategories: (params = null) => {
    const url = "/ProductType";
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
  CreateCategory: (body) => {
    const url = "/ProductType";
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
  getCategoryDetail: (id) => {
    const url = `/ProductType/${id}`;
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
  updateCategory: (id, body) => {
    const url = `/ProductType/update/${id}`;
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
  removeCategory: (id) => {
    const url = `/ProductType/delete/${id}`;
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
  GetCategoryFrontend: () => {
    const url = `/ProductType/GetCategoryFrontend`;
    return axiosClient.get(url);
  },
};
export default categoryAPI;

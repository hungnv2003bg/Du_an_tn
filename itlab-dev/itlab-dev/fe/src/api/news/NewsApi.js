import axiosClient from "../AxiosClient";

const NewsApi = {
  Create: (body) => {
    const url = "/News";
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
  GetNews: (params) => {
    const url = "/News";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
      params,
    });
  },
  GetNewsDetail: (id) => {
    const url = `/News/${id}`;
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
  removeNews: (id) => {
    const url = `/News/delete-news/${id}`;
    return axiosClient.post(url,{},{
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

export default NewsApi;

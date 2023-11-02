import axiosClient from "../AxiosClient";

const ContactApi = {
  postApiContact: (data, params = null) => {
    const url = "/Contact";
    return axiosClient.post(url, data, {
      params,
    });
  },
  getApiContact: (param) => {
    const url = "/Contact";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
      params: {
        ...param,
      },
    });
  },
  ReplyContact: (body) => {
    const url = "/Contact/reply-contact";
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
};

export default ContactApi;

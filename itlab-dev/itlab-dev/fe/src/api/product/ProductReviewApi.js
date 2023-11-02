import axiosClient from "../AxiosClient";

const ProductReviewApi = {
    getReviewForproduct: (params) => {
        const url = `/ProductReview/getforproduct`;
        return axiosClient.get(url, {
            params: {
                ...params,
            },
        });
    },
    SeenMess: (body) => {
        const url = `/ProductReview`;
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
    ReplyMess: (id, mess) => {
        const requestBody = JSON.stringify(mess);
        const url = `/ProductReview/phanhoi/${id}`;
        return axiosClient.post(url, requestBody, {
            headers: {
                Authorization: `Bearer ${
                    localStorage.getItem("token")
                        ? JSON.parse(localStorage.getItem("token"))
                        : ""
                }`,
            },
        });
    },
    removeProductReviews: (id) => {
        const url = `/ProductReview/delete/${id}`;
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
};

export default ProductReviewApi;

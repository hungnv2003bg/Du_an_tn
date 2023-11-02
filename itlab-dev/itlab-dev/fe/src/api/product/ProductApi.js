import axiosClient from "../AxiosClient";

const ProductApi = {
    getAllNoPagition: (params = null) => {
        const url = "/Product/getallproductfrontend";
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
    CreateProduct: (body) => {
        const url = "/Product";
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
    IncreaseViews: async (id) => {
        const url = `/Product/increaseviews/${id}`;
        return await axiosClient.get(url);
    },
    getAllProducts: (params = null) => {
        const url = "/Product";
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
    getProductDetail: (id) => {
        const url = `/Product/${id}`;
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
    removeProduct: (id) => {
        const url = `/Product/delete/${id}`;
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
    updateProduct: (id, body) => {
        const url = `/Product/update/${id}`;
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

export default ProductApi;

import axiosClient from "../AxiosClient";

const SlideApi = {
    getAllSlides: (params = null) => {
        const url = "/Silde";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token"))
                    : ""
                    }`,
            },
            params: {
                ...params,
            },
        });
    },
    getSlideFrontEnd: () => {
        const url = "/Silde/slide-frontend";
        return axiosClient.get(url);
    },
    createSlide: (body) => {
        const url = "/Silde";
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token"))
                    : ""
                    }`,
            },
        });
    },
    createItemSlide: (body) => {
        const url = "/Silde/add-item-slide";
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token"))
                    : ""
                    }`,
            },
        });
    },
    removeSlide: (id) => {
        const url = `/Silde/delete/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token"))
                    : ""
                    }`,
            },
        });
    },
    updateStatusSlide: (id) => {
        const url = `/Silde/active/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token"))
                    : ""
                    }`,
            },
        });
    },
}
export default SlideApi;
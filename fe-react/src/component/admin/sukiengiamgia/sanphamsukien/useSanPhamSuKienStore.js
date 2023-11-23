import axiosIns from "../../../../plugins/axios"

export const useSanPhamSuKienStore = {
    actions: {
        async fetchSanPhamSuKien() {
            return axiosIns.get('/api/sanphamsukien/get-page'
            )
        },
    },
}


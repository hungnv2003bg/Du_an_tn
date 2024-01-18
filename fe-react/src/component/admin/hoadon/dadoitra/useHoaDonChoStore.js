import axiosIns from "../../../../plugins/axios"

export const useHoaDonChoStore = {
    actions: {
        async fetchHoaDonDoiTra() {
            return axiosIns.get('/api/admin/layhoadondoitra')
        },

    },
}

import axiosIns from "../../../../plugins/axios"

export const useHoaDonChoGiaoStore = {
    actions: {
        async fetchHoaDonChoGiao() {
            return axiosIns.get('/api/admin/layhoadonchogiao')
        },
        async xacNhanHoaDon(payload) {
            return axiosIns.post('/api/admin/xacnhandanggiao',payload)
        },
    },
}

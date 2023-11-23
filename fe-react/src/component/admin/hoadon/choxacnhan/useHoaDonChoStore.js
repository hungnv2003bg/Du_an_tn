import axiosIns from "../../../../plugins/axios"

export const useHoaDonChoStore = {
    actions: {
        async fetchHoaDonCho() {
            return axiosIns.get('/api/admin/layhoadoncho')
        },
        async xacNhanHoaDon(payload) {
            return axiosIns.post('/api/admin/xacnhanhoadon', payload)
        },
        async huyHoaDon(payload) {
            return axiosIns.post('/api/admin/huyhoadon', payload)
        },
    },
}

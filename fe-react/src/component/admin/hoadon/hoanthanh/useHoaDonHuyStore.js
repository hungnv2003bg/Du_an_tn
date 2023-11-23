import axiosIns from "../../../../plugins/axios"

export const useHoaDonHuyStore = {
    actions: {
        async fetchHoaDonHuy() {
            return axiosIns.get('/api/admin/layhoadonhoanthanh')
        },
        async xacNhanHoaDon(payload) {
            return axiosIns.post('/api/admin/xacnhanhoadon', payload)
        },
    },
}

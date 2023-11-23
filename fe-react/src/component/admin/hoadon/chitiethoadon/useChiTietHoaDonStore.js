import axiosIns from "../../../../plugins/axios"

export const useChiTietHoaDonStore = {
    actions: {
        async layChiTiet(payload) {
            return axiosIns.get('/api/admin/layhoadonbyid?hoaDonId=' + payload)
        },

    },
}

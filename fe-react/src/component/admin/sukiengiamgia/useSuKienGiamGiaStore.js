import axiosIns from "../../../plugins/axios"

export const useSuKienGiamGiaStore = {
    actions: {
        async fetchSuKienGiamGia() {
            return axiosIns.get('/api/sukiengiamgia/laysukiengiamgia'
            )
        },
        async themSuKienGiamGia(payload) {
            return axiosIns.post('/api/sukiengiamgia/themsukiengiamgia', payload
            )
        },
        async suaSuKienGiamGia(payload) {
            return axiosIns.post('/api/sukiengiamgia/suasukiengiamgia', payload
            )
        },
        async laySuKienGiamGiaById(payload) {
            return axiosIns.get('/api/sukiengiamgia/laysukiengiamgiabyid?sukienGiamGiaId=' + payload
            )
        },
        async xoaSuKienGiamGiaId(payload) {
            return axiosIns.get('/api/sukiengiamgia/xoasukiengiamgia?suKienGiamGiaId=' + payload
            )
        },
    },
}


import axiosIns from "../../../../plugins/axios"

export const useNhomSanPhamStore = {
    actions: {
        async fetchChatLieu() {
            return axiosIns.get('/api/sanpham/laymausac'
            )
        },
        async themChatLieu(payload) {
            return axiosIns.post('/api/sanpham/themmausac', payload
            )
        },
        async suaChatLieu(payload) {
            return axiosIns.post('/api/sanpham/suamausac', payload
            )
        },
        async layChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/laymausacbyid?mauSacId=' + payload
            )
        },
        async xoaChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/xoamausac?mauSacId=' + payload
            )
        },
    },
}

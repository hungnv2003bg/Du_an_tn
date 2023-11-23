import axiosIns from "../../../../plugins/axios"

export const useNhomSanPhamStore = {
    actions: {
        async fetchChatLieu() {
            return axiosIns.get('/api/sanpham/laynhomsanpham'
            )
        },
        async themChatLieu(payload) {
            return axiosIns.post('/api/sanpham/themnhomsanpham', payload
            )
        },
        async suaChatLieu(payload) {
            return axiosIns.post('/api/sanpham/suanhomsanpham', payload
            )
        },
        async layChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/laynhomsanphambyid?nhomSanPhamId=' + payload
            )
        },
        async xoaChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/xoanhomsanpham?nhomSanPhamId=' + payload
            )
        },
    },
}

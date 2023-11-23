import axiosIns from "../../../../plugins/axios"

export const useNhomSanPhamStore = {
    actions: {
        async fetchChatLieu() {
            return axiosIns.get('/api/sanpham/laykichthuoc'
            )
        },
        async themChatLieu(payload) {
            return axiosIns.post('/api/sanpham/themkichthuoc', payload
            )
        },
        async suaChatLieu(payload) {
            return axiosIns.post('/api/sanpham/suakichthuoc', payload
            )
        },
        async layChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/laykichthuocbyid?kichThuocId=' + payload
            )
        },
        async xoaChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/xoakichthuoc?kichThuocId=' + payload
            )
        },
    },
}

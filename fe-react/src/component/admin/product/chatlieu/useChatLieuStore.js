import axiosIns from "../../../../plugins/axios"

export const useChatLieuStore = {
    actions: {
        async fetchChatLieu() {
            return axiosIns.get('/api/sanpham/laychatlieu'
            )
        },
        async themChatLieu(payload) {
            return axiosIns.post('/api/sanpham/themchatlieu', payload
            )
        },
        async suaChatLieu(payload) {
            return axiosIns.post('/api/sanpham/suachatlieu', payload
            )
        },
        async layChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/laychatlieubyid?chatLieuId=' + payload
            )
        },
        async xoaChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/xoachatlieu?chatLieuId=' + payload
            )
        },
    },
}

import axiosIns from "../../../../plugins/axios"

export const useNhomSanPhamStore = {
    actions: {
        async fetchChatLieu() {
            return axiosIns.get('/api/sanpham/laysanphamadmin'
            )
        },
        async fetchThuocTinh() {
            return axiosIns.get('/api/sanpham/laythuoctinh'
            )
        },
        async fetchSanPhamChiTietCuaSanPham(payload) {
            return axiosIns.get('/api/sanpham/laysanphamchitietcuasanpham?sanPhamId=' + payload)
        },
        async themChatLieu(payload) {
            return axiosIns.post('/api/sanpham/themsanphamchitiet', payload
            )
        },
        async suaChatLieu(payload) {
            return axiosIns.post('/api/sanpham/suasanphamchitiet', payload
            )
        },
        async layChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/laysanphamchitietbyid?sanPhamChiTietId=' + payload
            )
        },
        async xoaChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/xoasanphamchitiet?sanPhamChiTietId=' + payload
            )
        },
    },
}

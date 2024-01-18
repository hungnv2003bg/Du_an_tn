import axiosIns from "../../../plugins/axios";

export const useNguoiDungStore = {
    actions: {
        async fetchNguoiDung() {
            return axiosIns.get('/api/nguoi-dung/laynguoidung'
            )
        },
        async layRankKhachHang() {
            return axiosIns.get('/api/nguoi-dung/layrankkhachhang'
            )
        },
        async themNguoiDung(payload) {
            return axiosIns.post('/api/nguoi-dung/themnguoidung', payload
            )
        },
        async suaNguoiDung(payload) {
            return axiosIns.post('/api/nguoi-dung/capnhatnguoidung', payload
            )
        },
        async layNguoiDungId(payload) {
            return axiosIns.get('/api/nguoi-dung/laythongtinnguoidung?nguoiDungId=' + payload
            )
        },
        async xoaNguoiDungId(payload) {
            return axiosIns.get('/api/nguoi-dung/xoanguoidung?nguoiDungId=' + payload
            )
        },
    },
}
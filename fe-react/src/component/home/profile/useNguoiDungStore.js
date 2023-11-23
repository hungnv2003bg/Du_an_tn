import axiosIns from "../../../plugins/axios"

export const useNguoiDungStore = {
    actions: {
        async layThongTinNguoiDung(payload) {
            const response = await axiosIns.get(`/api/nguoidung/laythongtinnguoidung?nguoiDungId=${payload}`)
            return response
        },
        async capNhatThongTin(payload) {
            const response = await axiosIns.post(`/api/nguoidung/capnhatnguoidung`, payload)
            return response
        },
        async doiMatKhau(payload) {
            const response = await axiosIns.post(`/api/nguoidung/doimatkhau`, payload)
            return response
        },
    },
}

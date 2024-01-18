import axiosIns from "../../plugins/axios"

export const useLoginStore = {
    actions: {
        async dangNhap(payload) {
            const response = await axiosIns.post('api/auth/dangnhap', payload)
            return response
        },
        async dangKy(payload) {
            return await axiosIns.post(`api/auth/dangky`, payload)
        },
        async xacNhan(payload) {
            return await axiosIns.get(`api/auth/xacnhantaikhoan?code=` + payload)
        },
        async guiLaiMa(payload) {
            return await axiosIns.get(`api/auth/guilaima?id=` + payload)
        },
        async quenMatKhau(payload) {
            return await axiosIns.get(`api/auth/quenmatkhau?email=` + payload)
        },
        async doiMatKhau(payload) {
            return await axiosIns.get(`api/auth/doimatkhau?code=` + payload.code + "&matKhauMoi=" + payload.matKhauMoi)
        },
    },
}

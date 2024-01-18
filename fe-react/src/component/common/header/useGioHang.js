import axiosIns from "../../../plugins/axios"

export const useGioHang = {
    actions: {
        async layGioHang(payload) {
            return axiosIns.get('/api/giohang/laysanphamtugiohang?nguoiDungId=' + payload
            )
        },
        async layYeuThich(payload) {
            return axiosIns.get('/api/yeuthich/layhetyeuthich?nguoiDungId=' + payload
            )
        },
    },
}

import axiosIns from "../../../plugins/axios"

export const useGioHangStore = {
    actions: {
        async layGioHang(payload) {
            const response = await axiosIns.get(`/api/giohang/laysanphamtugiohang?nguoiDungId=${payload}`)
            return response
        },
        async layDuLieuThanhToan(payload) {
            const response = await axiosIns.get(`/api/thanhtoan/thanhtoan?nguoiDungId=${payload}`)
            return response
        },
        async capNhatSoLuongSanPhamGioHang(payload) {
            const response = await axiosIns.get(`/api/giohang/capnhatsoluonggiohang?nguoiDungId=${payload.nguoiDungId}&gioHangId=${payload.gioHangId}&soLuongMoi=${payload.soLuongMoi}`)
            return response
        },
        async taoHoaDonOnline(payload) {
            const response = await axiosIns.post(`/api/thanhtoan/taohoadononline`)
            return response
        },
        async vnPay(payload) {
            const response = await axiosIns.post(`/api/vnpay/thanhtoan`, payload)
            return response
        },
    },
}
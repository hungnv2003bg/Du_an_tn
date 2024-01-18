import axiosIns from "../../../plugins/axios"

export const useBanTaiQuayStore = {
    actions: {
        async layHoaDonTaiQuay() {
            return axiosIns.get('/api/admin/layhoadontaiquay')
        },
        async taoHoaDon(payload) {
            return axiosIns.get('/api/admin/taohoadontaiquay?nhanVienId=' + payload)
        },
        async fetSanPhamChiTiet() {
            return axiosIns.get('/api/admin/layhetchitiet')
        },
        async fetHoaDonChiTiet(payload) {
            return axiosIns.get('/api/admin/layhoadonchitietcuahoadon?hoaDonId=' + payload)
        },
        async themSanPhamVaoHoaDonQuay(payload) {
            return axiosIns.get('/api/admin/themsanphamvaohoadonquay?hoaDonId=' + payload.hoaDonId + '&sanPhamId=' + payload.sanPhamId)
        },
        async thayDoiSoLuong(payload) {
            return axiosIns.get('/api/admin/thaydoisoluongspchitiet?chiTietId=' + payload.chiTietId + '&soLuongMoi=' + payload.soLuongMoi)
        },
        async xoaHoaDonChiTiet(payload) {
            return axiosIns.get('/api/admin/xoaspchitiet?chiTietId=' + payload)
        },
        async layDanhSachKhachHang() {
            return axiosIns.get('/api/admin/laydanhsachkhachhangtaiquay')
        },
        async layDiaChiKhachHang(payload) {
            return axiosIns.get('/api/admin/laydanhsachdiachinhanhang?nguoiDungId=' + payload)
        },
        async taoHoaDonTaiQuay(payload) {
            return axiosIns.post('/api/admin/taohoadontaiquayrequest', payload
            )
        },
        async quetMa(payload) {
            return axiosIns.get('/api/admin/quetmasanpham?maSp=' + payload.maSp + "&hoaDonId=" + payload.hoaDonId
            )
        },
        async thanhToanTaiQuayVNPay(payload) {
            return axiosIns.post('/api/admin/thanhtoanvnpaytaiquay', payload
            )
        },
        async thanhToanTaiQuay(payload) {
            return axiosIns.post('/api/admin/muataiquay2', payload
            )
        },
        async checkThanhToan(payload) {
            return axiosIns.post('/api/admin/muataiquayvnpaycheck?maHd=' + payload.maHd + "&status=" + payload.status
            )
        },

    },
}

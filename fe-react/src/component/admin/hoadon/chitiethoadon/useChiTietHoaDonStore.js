import axiosIns from "../../../../plugins/axios"

export const useChiTietHoaDonStore = {
    actions: {
        async layChiTiet(payload) {
            return axiosIns.get('/api/admin/layhoadonbyid?hoaDonId=' + payload)
        },
        async thayDoiSoLuong(payload) {
            return axiosIns.get('/api/admin/thaydoisoluongspchitiet?chiTietId=' + payload.chiTietId + '&soLuongMoi=' + payload.soLuongMoi)
        },
        async xoaHoaDonChiTiet(payload) {
            return axiosIns.get('/api/admin/xoaspchitiet?chiTietId=' + payload)
        },
        async fetchSanPhamChiTietCuaSanPham(payload) {
            return axiosIns.get('/api/sanpham/laysanphamchitietcuasanpham?sanPhamId=' + payload)
        },
        async fetchChatLieu() {
            return axiosIns.get('/api/sanpham/laysanphamadmin'
            )
        },
        async themSpHoaDon(payload) {
            return axiosIns.get('/api/admin/themspchohoadon?'
                + 'hoaDonId=' + payload.hoaDonId + "&spChiTietId=" + payload.spChiTietId
                + '&soLuong=' + payload.soLuong
            )
        },
        async thayDoiPhiVanChuyen(payload) {
            return axiosIns.get('/api/admin/thaydoiphivanchuyen?'
                + 'hoaDonId=' + payload.hoaDonId + "&phiVanChuyenMoi=" + payload.phiVanChuyenMoi
            )
        },
        async doiDiaChi(payload) {
            return axiosIns.get('/api/admin/doidiachihoadon?'
                + 'hoaDonId=' + payload.hoaDonId + "&diaChiId=" + payload.diaChiId
            )
        },
        async taoDiaChi(payload) {
            return axiosIns.post('/api/admin/taodiachi', payload)
        },
        async doiVoucherHoaDon(payload) {
            return axiosIns.get('/api/voucher2/doivoucherhoadon?hoaDonId=' + payload.hoaDonId + "&voucherId=" + payload.voucherId)
        },
    },
}

import axiosIns from "../../../plugins/axios"

export const useSanPhamChiTiet = {
    actions: {
        async layThongTinSanPham(payload) {
            const response = await axiosIns.get(`/api/sanpham/sanphamchitiet?sanPhamId=${payload}`)
            return response
        },
        async themVaoGioHang(payload) {
            const response = await axiosIns.get(`/api/giohang/themvaogiohang?nguoiDungId=${payload.nguoiDungId}&sanPhamChiTietId=${payload.sanPhamChiTietId}&soLuong=${payload.soLuong}`)
            return response
        },
    },
}

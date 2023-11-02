import axiosIns from "../../../plugins/axios"

export const useSanPhamChiTiet = {
    actions: {
        async layThongTinSanPham(payload) {
            const response = await axiosIns.get(`/api/sanpham/sanphamchitiet?sanPhamId=${payload}`)
            return response
        },

    },
}

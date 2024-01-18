import { convertNgayThang } from "../../../extensions/fixNgayThang"
import axiosIns from "../../../plugins/axios"

export const useCrm = {
    actions: {
        async layDoanhThu12Thang(payload) {
            return axiosIns.get('/api/crm/laydoanhthu12thang?nam=' + payload)
        },
        async taoSuKien(payload) {
            payload = {
                ...payload,
                ngayBatDau: convertNgayThang(payload.ngayBatDau) + "T00:00:00",
                ngayKetThuc: convertNgayThang(payload.ngayKetThuc) + "T00:00:00"
            }
            return axiosIns.post('/api/crm/taosukiengoiy', payload)
        },
        async layTopDoanhSo12Thang(payload) {
            return axiosIns.get('/api/crm/laydoanhso10sanphamtop?nam=' + payload)
        },
        async layChiTiet(payload) {
            return axiosIns.get('/api/crm/laydoanhsochitiet?sanPhamId=' + payload.sanPhamId + "&truoc=" + payload.truoc + "&sau=" + payload.sau)
        },
    },
}

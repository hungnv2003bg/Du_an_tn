import axiosIns from "../../../../plugins/axios"

export const useHoaDonNguoiDung = {
    actions: {
        async layHoaDon(payload) {
            const response = await axiosIns.get(`/api/nguoidung/layhoadon?nguoiDungId=${payload.nguoiDungId}&type=${payload.type}`)
            return response
        },
    },
}

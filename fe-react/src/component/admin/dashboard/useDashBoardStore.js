import axiosIns from "../../../plugins/axios"

export const useDashBoardStore = {
    actions: {
        async taiBaoCao() {
            return axiosIns.get('/api/file/baocao')
        },
        async layDoanhSoNgay() {
            return axiosIns.get('/api/thong-ke/doanhsotrongngay')
        },
        async theoNgay(payload) {
            return axiosIns.post('/api/thong-ke/thongkengay', payload)
        },
    },
}

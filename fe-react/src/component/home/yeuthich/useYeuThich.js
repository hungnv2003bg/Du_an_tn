import axiosIns from "../../../plugins/axios"

export const useYeuThich = {
    actions: {
        async xoaYeuThich(payload) {
            const response = await axiosIns.get(`/api/yeuthich/xoayeuthich?yeuThichId=${payload}`)
            return response
        },
    },
}

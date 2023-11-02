import axiosIns from "../../../../plugins/axios"

export const useSanPhamStore = {
    actions: {
        async fetchSanPham1(payload) {
            const response = await axiosIns.get('/apps/email/emails', { params: payload })
            const { emails, emailsMeta } = response.data

            this.emails = emails
            this.emailsMeta = emailsMeta
        },
        async fetchSanPham(
            page,
            pageSize,
            chatLieuId,
            thietKeId,
            thuongHieuId,
            mauSacId,
            loaiSanPhamId,
            kichThuocId
        ) {
            var url = "/api/sanpham/phantrangsanpham?";
            if (chatLieuId) {
                url += 'loaiSanPhamId=' + loaiSanPhamId + "&"
            }
            if (thietKeId) {
                url += 'thietKeId=' + thietKeId + "&"
            }
            if (mauSacId) {
                url += 'mauSacId=' + mauSacId + "&"
            }
            if (thuongHieuId) {
                url += 'thuongHieuId=' + thuongHieuId + "&"
            }
            if (kichThuocId) {
                url += 'kichThuocId=' + thuongHieuId + "&"
            }
            if (page) {
                url += 'page=' + page + "&"
            }
            if (pageSize) {
                url += 'pageSize=' + pageSize + "&"
            }
            return await axiosIns.get(url)
        },
        async updateEmails(ids, data) {
            return axiosIns.post('/apps/email/update-emails/', {
                ids,
                data,
            })
        },
        async updateEmailLabels(ids, label) {
            return axiosIns.post('/apps/email/update-emails-label', {
                ids,
                label,
            })
        },
    },
}

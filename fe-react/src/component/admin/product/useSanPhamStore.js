import axiosIns from "../../../plugins/axios"

export const useSanPhamStore = {
    actions: {
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
            var url = "/api/nhanvien/phantrangsanpham?";
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
        async fetchThuocTinh() {
            return axiosIns.get('/api/sanpham/laythuoctinh')
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
        async themSanPham(payload) {
            return axiosIns.post('/api/sanpham/themsanpham', payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        },
        async laySanPhamById(payload) {
            return axiosIns.get('/api/sanpham/laysanphamId?sanPhamId=' + payload
            )
        },
        async suaSanPham(payload) {
            return axiosIns.post('/api/sanpham/suasanpham', payload
            )
        },
    },
}

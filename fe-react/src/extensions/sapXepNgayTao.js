function sapXepTheoNgayTao(mangDoiTuong) {
    mangDoiTuong.sort(function (a, b) {
        var ngayTaoA = new Date(a.ngayTao).toISOString();
        var ngayTaoB = new Date(b.ngayTao).toISOString();

        // Sử dụng hàm localeCompare để so sánh chuỗi ngày tháng
        return ngayTaoA.localeCompare(ngayTaoB);
    });


    return mangDoiTuong.reverse();
}

export default sapXepTheoNgayTao
function kiemTraNgayTrong30Ngay(ngayTao) {
    // Lấy ngày hiện tại
    var ngayHienTai = new Date();

    // Chuyển đổi ngàyTao từ chuỗi thành đối tượng Date
    var ngayTaoObj = new Date(ngayTao);

    // Tính toán sự chênh lệch giữa ngàyTao và ngày hiện tại
    var soNgayChenhLech = Math.floor((ngayHienTai - ngayTaoObj) / (1000 * 60 * 60 * 24));
    // Kiểm tra xem ngàyTao có nằm trong 30 ngày tính từ ngày hiện tại hay không
    return soNgayChenhLech >= 0 && soNgayChenhLech <= 30;
}


export default kiemTraNgayTrong30Ngay
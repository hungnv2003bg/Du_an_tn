function sapXepTheoGiaTien(mangSanPham, type) {
    if (type == 1) {
        return daoLunLinhTinh(mangSanPham);
    }
    mangSanPham.sort(function (a, b) {

        if (type == 2) {
            return b.giaBan - a.giaBan;
        }
        if (type == 3) {
            return a.giaBan - b.giaBan;
        }
    });

    return mangSanPham;
}
function daoLunLinhTinh(mang) {
    var currentIndex = mang.length, temporaryValue, randomIndex;

    // Trả về nếu mảng trống hoặc chỉ có một phần tử
    if (currentIndex <= 1) {
        return mang;
    }

    // Trộn ngẫu nhiên các phần tử sử dụng thuật toán Fisher-Yates
    while (0 !== currentIndex) {
        // Lấy một phần tử ngẫu nhiên từ phần còn lại của mảng
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap giá trị của currentIndex với giá trị của randomIndex
        temporaryValue = mang[currentIndex];
        mang[currentIndex] = mang[randomIndex];
        mang[randomIndex] = temporaryValue;
    }
    return mang;
}
export default sapXepTheoGiaTien
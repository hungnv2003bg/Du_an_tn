export const fixTrangThaiVoucher = (input) => {
    switch (input) {
        case "DIENRA":
            return "Đang áp dụng"
        case "KETHUC":
            return "Đã dừng"
        default:
            return "Đã dừng"
    }
}
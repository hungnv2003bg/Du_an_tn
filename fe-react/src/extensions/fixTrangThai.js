export const fixTrangThai = (input) => {
    switch (input) {
        case "DAGIAO":
            return "Đã giao"
        case "DADOITRA":
            return "Đã đổi trả"
        case "TUCHOIDOI":
            return "Từ chối đổi trả"
        default:
            return "Liên hệ"
    }
}
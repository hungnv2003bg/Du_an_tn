export const isValidDateFormat = (input) => {
    // Biểu thức chính quy kiểm tra định dạng DD/MM/YYYY
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;

    // Kiểm tra chuỗi có khớp với biểu thức chính quy không
    return regex.test(input);
}
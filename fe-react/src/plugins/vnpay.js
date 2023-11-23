const MA_WEBSITE = 'MXWCJ2KO' //vnp_TmnCode
const HASHSECRET = 'DODOGMIIPEUAOAJXVCNWGDXQEFEKPKGK'//vnp_HashSecret
const HASHSECRET_SHA256 = '8474d443b23a8bc1278567787dbe5f9a06cce5b468effe710ba05c35d27c829d'//vnp_HashSecret
const RETURN_BE_URL = process.env.REACT_APP_BACKEND_URL + 'api/vnpay/thanhtoan'
function formatTime() {
    const currentTime = new Date();
    const timeZoneOffset = 7 * 60; // Đổi 7 thành số phút của múi giờ cần thiết
    currentTime.setMinutes(currentTime.getMinutes() + timeZoneOffset);

    // Lấy các thành phần thời gian (năm, tháng, ngày, giờ, phút, giây)
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(currentTime.getDate()).padStart(2, '0');
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');

    // Tạo định dạng "yyyyMMddHHmmss"
    const formattedTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return formattedTime
}

export const redirect2VnPay = ({
    giaTien = 0
}) => {

    return `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${giaTien}&vnp_Command=pay&vnp_CreateDate=${formatTime()}&vnp_CurrCode=VND&vnp_IpAddr=13.160.92.202&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan&vnp_ReturnUrl=${RETURN_BE_URL}&vnp_TmnCode=${MA_WEBSITE}&vnp_TxnRef=VNPAY123&vnp_Version=2.1.0&vnp_SecureHash=${HASHSECRET_SHA256}`
}

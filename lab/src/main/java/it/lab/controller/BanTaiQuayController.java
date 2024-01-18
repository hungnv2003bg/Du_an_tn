package it.lab.controller;

import it.lab.config.Config;
import it.lab.iservice.IHoaDonService;
import it.lab.iservice.IMuaTaiQuayService;
import it.lab.modelcustom.request.MuaTaiQuay2;
import it.lab.modelcustom.request.MuaTaiQuayRequest;
import it.lab.modelcustom.request.TaoHoaDonOnline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class BanTaiQuayController {
    @Autowired
    private IMuaTaiQuayService _muaTaiQuay;

    @RequestMapping(value = "/layhoadontaiquay", method = RequestMethod.GET)
    public ResponseEntity<?> layHetHoaDonCho() {
        return ResponseEntity.ok(_muaTaiQuay.layDanhSachTaiCuaHang());
    }

    @RequestMapping(value = "/taohoadontaiquay", method = RequestMethod.GET)
    public ResponseEntity<?> taoHoaDon(@RequestParam Long nhanVienId) {
        return ResponseEntity.ok(_muaTaiQuay.taoMoiHoaDon(nhanVienId));
    }

    @RequestMapping(value = "/layhetchitiet", method = RequestMethod.GET)
    public ResponseEntity<?> taoHoaDon() {
        return ResponseEntity.ok(_muaTaiQuay.layHetChiTiet());
    }

    @RequestMapping(value = "/layhoadonchitietcuahoadon", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonChiTietCuaHoaDon(@RequestParam Long hoaDonId) {
        return ResponseEntity.ok(_muaTaiQuay.gioHangCuaHoaDon(hoaDonId));
    }

    @RequestMapping(value = "/themsanphamvaohoadonquay", method = RequestMethod.GET)
    public ResponseEntity<?> themSanPhamVaoHoaDonQuay(@RequestParam Long hoaDonId, @RequestParam Long sanPhamId) {
        return ResponseEntity.ok(_muaTaiQuay.themSanPhamVaoHoaDon(hoaDonId, sanPhamId));
    }

    @RequestMapping(value = "/laythongtinhoadontaiquay", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonTaiQuay(@RequestParam Long hoaDonId) {
        return ResponseEntity.ok(_muaTaiQuay.layHoaDon(hoaDonId));
    }

    @RequestMapping(value = "/laydanhsachkhachhangtaiquay", method = RequestMethod.GET)
    public ResponseEntity<?> layDanhSachKhachHangTaiQuay() {
        return ResponseEntity.ok(_muaTaiQuay.layDanhSachKhachHang());
    }

    @RequestMapping(value = "/laydanhsachdiachinhanhang", method = RequestMethod.GET)
    public ResponseEntity<?> layDanhSachDiaChiNhanHang(@RequestParam Long nguoiDungId) {
        return ResponseEntity.ok(_muaTaiQuay.layDiaChiNguoiDung(nguoiDungId));
    }

    @RequestMapping(value = "/taohoadontaiquayrequest", method = RequestMethod.POST)
    public ResponseEntity<?> layDanhSachDiaChiNhanHang(@RequestBody MuaTaiQuayRequest muaTaiQuayRequest) {
        return ResponseEntity.ok(_muaTaiQuay.taoHoaDonTaiQuay(muaTaiQuayRequest));
    }

    @RequestMapping(value = "/quetmasanpham", method = RequestMethod.GET)
    public ResponseEntity<?> quetMaSanPham(@RequestParam String maSp, @RequestParam Long hoaDonId) {
        return ResponseEntity.ok(_muaTaiQuay.quetMa(maSp, hoaDonId));
    }

    @RequestMapping(value = "/muataiquay2", method = RequestMethod.POST)
    public ResponseEntity<?> thanhToanTaiQuay2(@RequestBody MuaTaiQuay2 muaTaiQuay2) throws UnsupportedEncodingException {
        return ResponseEntity.ok(_muaTaiQuay.muaTaiQuay2(muaTaiQuay2));
    }

    @RequestMapping(value = "/muataiquayvnpaycheck", method = RequestMethod.POST)
    public ResponseEntity<?> muaTaiQuayVnPayCheck(@RequestParam String maHd, @RequestParam String status) {
        return ResponseEntity.ok(_muaTaiQuay.doiTrangThaiHoaDonTaiQuay(maHd, status));
    }

    @RequestMapping(value = "/thanhtoanvnpaytaiquay", method = RequestMethod.POST)
    public ResponseEntity<?> thanhToan(@RequestBody MuaTaiQuayRequest muaTaiQuayRequest) throws UnsupportedEncodingException {
        String[] res = _muaTaiQuay.taoHoaDonTaiQuayThanhToanVNPAY(muaTaiQuayRequest);
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_OrderInfo = "Mua " + LocalDateTime.now().getSecond();
        String orderType = "2000";
        String vnp_TxnRef = res[0];
        String vnp_IpAddr = "42.114.34.177";
        String vnp_TmnCode = "MXWCJ2KO";
        int amount = Integer.parseInt(res[1]) * 100;
        Map vnp_Params = new HashMap();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", "http://localhost:3000/vnpay/ketqua");
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
        vnp_Params.put("vnp_Bill_Mobile", "0968491797");
        vnp_Params.put("vnp_Bill_Email", "do.quanganh99zz@gmail.com");
        String fullName = "Đỗ Quang Anh";
        if (fullName != null && !fullName.isEmpty()) {
            int idx = fullName.indexOf(' ');
            String firstName = fullName.substring(0, idx);
            String lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
            vnp_Params.put("vnp_Bill_FirstName", firstName);
            vnp_Params.put("vnp_Bill_LastName", lastName);
        }
        vnp_Params.put("vnp_Bill_Address", "Thái bình");
        vnp_Params.put("vnp_Bill_City", "Thái bình");
        vnp_Params.put("vnp_Bill_Country", "Thái bình");
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;
        return ResponseEntity.ok(paymentUrl);
    }
}

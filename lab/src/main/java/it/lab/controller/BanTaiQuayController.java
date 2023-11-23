package it.lab.controller;

import it.lab.iservice.IHoaDonService;
import it.lab.iservice.IMuaTaiQuayService;
import it.lab.modelcustom.request.MuaTaiQuayRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}

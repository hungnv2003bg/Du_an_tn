package it.lab.controller;

import it.lab.iservice.IHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin")
public class HoaDonController {
    @Autowired
    private IHoaDonService _hoaDonService;

    @RequestMapping(value = "/layhoadoncho", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonCho() {
        return ResponseEntity.ok(_hoaDonService.layHetHoaDonCho());
    }

    @RequestMapping(value = "/xacnhanhoadon", method = RequestMethod.POST)
    public ResponseEntity<?> xacNhanHoaDon(@RequestBody Long[] hoaDonId) {
        return ResponseEntity.ok(_hoaDonService.xacNhanHoaDon(hoaDonId));
    }

    @RequestMapping(value = "/xacnhandanggiao", method = RequestMethod.POST)
    public ResponseEntity<?> xacNhanDangGiao(@RequestBody Long[] hoaDonId) {
        return ResponseEntity.ok(_hoaDonService.chuyenSangDangGiao(hoaDonId));
    }

    @RequestMapping(value = "/xacnhanhoanthanh", method = RequestMethod.POST)
    public ResponseEntity<?> xacNhanHoanThanh(@RequestBody Long[] hoaDonId) {
        return ResponseEntity.ok(_hoaDonService.chuyenSangHoanThanh(hoaDonId));
    }

    @RequestMapping(value = "/layhoadonchogiao", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonChoGiao() {
        return ResponseEntity.ok(_hoaDonService.layHetHoaDonChoGiao());
    }

    @RequestMapping(value = "/layhoadondanggiao", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonDangGiao() {
        return ResponseEntity.ok(_hoaDonService.layHetHoaDonDangGiao());
    }

    @RequestMapping(value = "/layhoadonhoanthanh", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonHoanThanh() {
        return ResponseEntity.ok(_hoaDonService.layHetHoaDonHoanThanh());
    }

    @RequestMapping(value = "/layhoadonhuy", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonHuy() {
        return ResponseEntity.ok(_hoaDonService.layHetHoaDonHuy());
    }

    @RequestMapping(value = "/huyhoadon", method = RequestMethod.POST)
    public ResponseEntity<?> huyHoaDon(@RequestBody Long[] hoaDonId) {
        return ResponseEntity.ok(_hoaDonService.huyHoaDon(hoaDonId));
    }

    @RequestMapping(value = "/layhoadonbyid", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDonById(@RequestParam Long hoaDonId) {
        return ResponseEntity.ok(_hoaDonService.layHoaDonById(hoaDonId));
    }

    @RequestMapping(value = "/thaydoisoluongspchitiet", method = RequestMethod.GET)
    public ResponseEntity<?> thayDoiSoLuongSpChiTiet(@RequestParam Long chiTietId, @RequestParam Integer soLuongMoi) {
        return ResponseEntity.ok(_hoaDonService.thayDoiSoLuongSPHoaDon(chiTietId, soLuongMoi));
    }

    @RequestMapping(value = "/xoaspchitiet", method = RequestMethod.GET)
    public ResponseEntity<?> xoaSpChiTiet(@RequestParam Long chiTietId) {
        return ResponseEntity.ok(_hoaDonService.xoaSanPhamHoaDon(chiTietId));
    }

    @RequestMapping(value = "/themspchohoadon", method = RequestMethod.GET)
    public ResponseEntity<?> xoaSpChiTiet(@RequestParam Long hoaDonId, @RequestParam Long spChiTietId, @RequestParam Integer soLuong) {
        return ResponseEntity.ok(_hoaDonService.themSPChoHoaDon(hoaDonId, spChiTietId, soLuong));
    }

    @RequestMapping(value = "/thaydoiphivanchuyen", method = RequestMethod.GET)
    public ResponseEntity<?> thayDoiPhiVanChuyen(@RequestParam Long hoaDonId, @RequestParam Double phiVanChuyenMoi) {
        return ResponseEntity.ok(_hoaDonService.thayDoiPhiVanChuyen(hoaDonId, phiVanChuyenMoi));
    }
}

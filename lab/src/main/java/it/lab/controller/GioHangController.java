package it.lab.controller;

import it.lab.iservice.IGioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/giohang")
public class GioHangController {
    @Autowired
    private IGioHangService _gioHangService;

    @RequestMapping(value = "/themvaogiohang", method = RequestMethod.GET)
    public ResponseEntity<?> themSanPhamChiTietVaoGioHang(
            @RequestParam Long nguoiDungId,
            @RequestParam Long sanPhamChiTietId,
            @RequestParam Integer soLuong
    ) {
        return ResponseEntity.ok(_gioHangService.themSanPhamChiTietVaoGioHang(nguoiDungId, sanPhamChiTietId, soLuong));
    }

    @RequestMapping(value = "/laysanphamtugiohang", method = RequestMethod.GET)
    public ResponseEntity<?> laySanPhamTuGioHang(
            @RequestParam Long nguoiDungId
    ) {
        return ResponseEntity.ok(_gioHangService.layGioHang(nguoiDungId));
    }

    @RequestMapping(value = "/capnhatsoluonggiohang", method = RequestMethod.GET)
    public ResponseEntity<?> capNhatSoLuongSanPhamGioHang(
            @RequestParam Long nguoiDungId,
            @RequestParam Long gioHangId,
            @RequestParam Integer soLuongMoi
    ) {
        return ResponseEntity.ok(_gioHangService.capNhatSoLuongGioHang(nguoiDungId, gioHangId, soLuongMoi));
    }

    @RequestMapping(value = "/xoagiohang", method = RequestMethod.GET)
    public ResponseEntity<?> xoaGioHang(@RequestParam Long gioHangId) {
        _gioHangService.xoaGioHang(gioHangId);
        return ResponseEntity.ok("");
    }
}

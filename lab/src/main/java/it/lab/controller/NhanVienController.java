package it.lab.controller;

import it.lab.iservice.ISanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/nhanvien")
public class NhanVienController {
    @Autowired
    private ISanPhamService _sanPhamService;

    @RequestMapping(value = "/phantrangsanpham", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieuSanPhamYeuThich(
            Integer page,
            Integer pageSize,
            Optional<Long> chatLieuId,
            Optional<Long> thietKeId,
            Optional<Long> thuongHieuId,
            Optional<Long> mauSacId,
            Optional<Long> loaiSanPhamId,
            Optional<Long> kichThuocId) {
        return ResponseEntity.ok(_sanPhamService.phanTrangSanPhamTrangChu(
                page,
                pageSize,
                chatLieuId.orElse(null),
                thietKeId.orElse(null),
                thuongHieuId.orElse(null),
                mauSacId.orElse(null),
                loaiSanPhamId.orElse(null),
                kichThuocId.orElse(null),
                null)
        );
    }
}

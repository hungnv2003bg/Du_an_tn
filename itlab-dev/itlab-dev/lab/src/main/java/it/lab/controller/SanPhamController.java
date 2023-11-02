package it.lab.controller;

import it.lab.entity.SanPham;
import it.lab.iservice.ISanPhamService;
import it.lab.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/sanpham")
public class SanPhamController {
    @Autowired
    private ISanPhamService _sanPhamService;
    @Autowired
    private SanPhamService sanPhamService;

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
                kichThuocId.orElse(null))
        );
    }

    @RequestMapping(value = "/sanphamchitiet", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieuSanPhamYeuThich(
            @RequestParam Long sanPhamId) {
        return ResponseEntity.ok(_sanPhamService.chiTietSanPham(sanPhamId));
    }
//Hưng Nguyễn
    @GetMapping("index")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(sanPhamService.getAll());
    }

    @PostMapping("add")
    public ResponseEntity<?> add( @RequestBody SanPham sp){
        return ResponseEntity.ok(sanPhamService.add(sp));
    }
}

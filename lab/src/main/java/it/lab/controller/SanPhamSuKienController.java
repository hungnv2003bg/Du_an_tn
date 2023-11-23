package it.lab.controller;

import it.lab.entity.HoaDon;
import it.lab.entity.SanPham;
import it.lab.entity.SanPhamSuKien;
import it.lab.entity.SuKienGiamGia;
import it.lab.iservice.ISanPhamService;
import it.lab.iservice.ISanPhamSuKienService;
import it.lab.iservice.ISuKienGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sanphamsukien")
public class SanPhamSuKienController {
    @Autowired
    ISanPhamSuKienService service;
    @Autowired
    ISanPhamService iSanPhamService;
    @Autowired
    ISuKienGiamGiaService suKienGiamGiaService;

    @GetMapping("/get-page")
    public ResponseEntity<?> getPage(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 20);
        return ResponseEntity.ok(service.getPage(pageable));
    }

    @GetMapping("/sanphame")
    public ResponseEntity<?> getSanPhamE() {
        return ResponseEntity.ok(service.getSanPhamE(11, 2023));
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody SanPhamSuKien sanPhamSuKien) {
        return ResponseEntity.ok(service.save(sanPhamSuKien));
    }

    @PostMapping("/add/{id}")
    public ResponseEntity<?> saveTheoSanPhamE(@PathVariable(name = "id") Long id,
                                              @RequestParam(name = "idSuKien") long idSK
    ) {
        SanPham sanPham = iSanPhamService.findById(id);
        SuKienGiamGia suKienGiamGia=suKienGiamGiaService.findById(idSK);
        SanPhamSuKien sanPhamSuKien = new SanPhamSuKien();
        sanPhamSuKien.setSanPham(sanPham);
        sanPhamSuKien.setSuKienGiamGia(suKienGiamGia);
        return ResponseEntity.ok(service.save(sanPhamSuKien));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody SanPhamSuKien sanPhamSuKien, @PathVariable(name = "id") Long id) {
        service.save(sanPhamSuKien);
        return ResponseEntity.ok(sanPhamSuKien);
    }
}

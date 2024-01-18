package it.lab.controller;


import it.lab.iservice.IYeuThich;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/yeuthich")
public class YeuThichController {
    @Autowired
    private IYeuThich _yeuThichService;

    @GetMapping(value = "layhetyeuthich")
    public ResponseEntity<?> layYeuThich(@RequestParam Long nguoiDungId) {
        return ResponseEntity.ok(_yeuThichService.layHetYeuThich(nguoiDungId));
    }

    @GetMapping(value = "taoyeuthich")
    public ResponseEntity<?> taoYeuThich(@RequestParam Long nguoiDungId, @RequestParam Long sanPhamChiTietId) {
        _yeuThichService.taoYeuThich(nguoiDungId, sanPhamChiTietId);
        return ResponseEntity.ok("");
    }

    @GetMapping(value = "xoayeuthich")
    public ResponseEntity<?> xoaYeuThich(@RequestParam Long yeuThichId) {
        _yeuThichService.xoaYeuThich(yeuThichId);
        return ResponseEntity.ok("");
    }
}

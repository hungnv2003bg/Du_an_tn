package it.lab.controller;

import it.lab.iservice.IThanhToan;
import it.lab.modelcustom.request.TaoHoaDonOnline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/thanhtoan")
public class ThanhToanController {
    @Autowired
    private IThanhToan _thanhToanService;

    @RequestMapping(value = "/thanhtoan", method = RequestMethod.GET)
    public ResponseEntity<?> thanhToan(
            @RequestParam Long nguoiDungId) {
        return ResponseEntity.ok(_thanhToanService.layDuLieuThanhToan(nguoiDungId));
    }

    @RequestMapping(value = "/taohoadononline", method = RequestMethod.POST)
    public ResponseEntity<?> taoHoaDonOnline(
            @RequestBody TaoHoaDonOnline yeuCau) {
        return ResponseEntity.ok(_thanhToanService.taoHoaDonOnline(yeuCau));
    }
}

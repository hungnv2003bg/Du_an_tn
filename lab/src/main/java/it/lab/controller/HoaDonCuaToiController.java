package it.lab.controller;

import it.lab.iservice.IHoaDonNguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nguoidung")
public class HoaDonCuaToiController {
    @Autowired
    private IHoaDonNguoiDungService _hoaDonNguoiDungService;

    @RequestMapping(value = "/layhoadon", method = RequestMethod.GET)
    public ResponseEntity<?> layHoaDon(
            @RequestParam Long nguoiDungId,
            @RequestParam Integer type
    ) {
        return ResponseEntity.ok(_hoaDonNguoiDungService.layHoaDonNguoiDung(
                nguoiDungId,
                type
        ));
    }
}

package it.lab.controller;

import it.lab.dto.NguoiDungDTO;
import it.lab.iservice.INguoiDungService;
import it.lab.modelcustom.request.DoiMatKhau;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nguoidung")
public class NguoiDungController {
    @Autowired
    private INguoiDungService _nguoiDungService;

    @RequestMapping(value = "/laythongtinnguoidung", method = RequestMethod.GET)
    public ResponseEntity<?> layThongTinNguoiDung(
            @RequestParam Long nguoiDungId
    ) {
        return ResponseEntity.ok(_nguoiDungService.layThongTinTaiKhoanById(nguoiDungId));
    }

    @RequestMapping(value = "/capnhatnguoidung", method = RequestMethod.POST)
    public ResponseEntity<?> capNhatNguoiDung(
            @RequestBody NguoiDungDTO nguoiDungDTO
    ) {
        return ResponseEntity.ok(_nguoiDungService.capNhatNguoiDung(nguoiDungDTO));
    }
    @RequestMapping(value = "/doimatkhau", method = RequestMethod.POST)
    public ResponseEntity<?> doiMatKhau(
            @RequestBody DoiMatKhau matKhau
    ) {
        return ResponseEntity.ok(_nguoiDungService.doiMatKhau(matKhau));
    }
}

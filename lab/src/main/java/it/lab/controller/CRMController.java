package it.lab.controller;

import it.lab.iservice.ICRMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/crm")
public class CRMController {
    @Autowired
    private ICRMService _crmService;
    @RequestMapping(value = "/laydulieusanphamyeuthich", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieuSanPhamYeuThich(Long userId) {
        return ResponseEntity.ok(_crmService.getSanPhamYeuThichUser(userId));
    }
}

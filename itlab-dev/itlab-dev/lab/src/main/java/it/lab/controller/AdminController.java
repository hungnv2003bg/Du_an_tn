package it.lab.controller;

import it.lab.iservice.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private TestService _nguoiDungService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieu() {
        return ResponseEntity.ok(_nguoiDungService.layNguoiDung());
    }
}

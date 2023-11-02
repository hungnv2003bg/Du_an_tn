package it.lab.controller;

import it.lab.common.CloudinaryUpload;
import it.lab.iservice.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api/home")
public class BaseTest {
    @Autowired
    private TestService _nguoiDungService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieu() throws IOException {
        return ResponseEntity.ok(_nguoiDungService.layNguoiDung());
    }

    @RequestMapping(value = "/test3", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieu3() {
        return ResponseEntity.ok("éc éc éc :3:3");
    }
}

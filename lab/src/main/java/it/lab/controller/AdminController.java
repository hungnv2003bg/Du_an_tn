package it.lab.controller;

import it.lab.iservice.IMauSacService;
import it.lab.iservice.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private IMauSacService _mauSacService;

    @RequestMapping(value = "/laymausac", method = RequestMethod.GET)
    public ResponseEntity<?> layMauSac(Integer page,
                                       Integer pageSize,
                                       Optional<String> keyWord) {
        return ResponseEntity.ok(_mauSacService.phanTrangMauSac(
                page,
                pageSize,
                keyWord.orElse(null))
        );
    }
}

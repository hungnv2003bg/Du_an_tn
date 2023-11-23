package it.lab.controller;

import it.lab.entity.ChatLieu;
import it.lab.entity.SuKienGiamGia;
import it.lab.service.SuKienGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sukiengiamgia")
public class SuKienGiamGiaController {
    @Autowired
    SuKienGiamGiaService suKienGiamGiaService;

    @RequestMapping(value = "/laysukiengiamgia", method = RequestMethod.GET)
    public ResponseEntity<?> laySuKiengiamGia() {
        return ResponseEntity.ok(suKienGiamGiaService.layHetSuKienGiamGia());
    }

    @RequestMapping(value = "/themsukiengiamgia", method = RequestMethod.POST)
    public ResponseEntity<?> themSuKienGiamGia(@RequestBody SuKienGiamGia suKienGiamGia) {
        return ResponseEntity.ok(suKienGiamGiaService.themSuKienGiamGia(suKienGiamGia));
    }

    @RequestMapping(value = "/xoasukiengiamgia", method = RequestMethod.GET)
    public ResponseEntity<?> xoaSuKienGiamGia(@RequestParam Long suKienGiamGiaId) {
        return ResponseEntity.ok(suKienGiamGiaService.xoaSuKienGiamGia(suKienGiamGiaId));
    }

    @RequestMapping(value = "/suasukiengiamgia", method = RequestMethod.POST)
    public ResponseEntity<?> suaSuKienGiamGia(@RequestBody SuKienGiamGia suKienGiamGia) {
        return ResponseEntity.ok(suKienGiamGiaService.suaSuKienGiamGia(suKienGiamGia));
    }

    @RequestMapping(value = "/laysukiengiamgiabyid", method = RequestMethod.GET)
    public ResponseEntity<?> laySuKienGiamGiaById(@RequestParam Long sukienGiamGiaId) {
        return ResponseEntity.ok(suKienGiamGiaService.laySuKienGiamGiaById(sukienGiamGiaId));
    }

}

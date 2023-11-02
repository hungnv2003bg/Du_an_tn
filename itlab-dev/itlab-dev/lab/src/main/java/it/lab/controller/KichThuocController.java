package it.lab.controller;

import it.lab.entity.Brand;
import it.lab.entity.KichThuoc;
import it.lab.service.BrandService;
import it.lab.service.KichThuocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kich-thuoc")
public class KichThuocController {
    @Autowired
    private KichThuocService kichThuocService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(kichThuocService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add( @RequestBody KichThuoc kichThuoc){
        return ResponseEntity.ok(kichThuocService.add(kichThuoc));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id , @RequestBody KichThuoc kichThuoc){
        return ResponseEntity.ok(kichThuocService.update(kichThuoc, id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.ok(kichThuocService.delete(id));
    }
}

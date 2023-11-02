package it.lab.controller;

import it.lab.entity.Brand;
import it.lab.entity.ChatLieu;
import it.lab.service.BrandService;
import it.lab.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/brand")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(brandService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add( @RequestBody Brand brand){
        return ResponseEntity.ok(brandService.add(brand));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id , @RequestBody Brand brand){
        return ResponseEntity.ok(brandService.update(brand, id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.ok(brandService.delete(id));
    }
}

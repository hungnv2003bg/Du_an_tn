package it.lab.controller;

import it.lab.entity.ChatLieu;
import it.lab.entity.MauSac;
import it.lab.iservice.IMauSacService;
import it.lab.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mau-sac")
public class MauSacController {
    @Autowired
    private MauSacService mauSacService;

    @GetMapping("/get-page/{page}")
    public ResponseEntity<?> getPage( @PathVariable int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ResponseEntity.ok(mauSacService.getPage(pageable));
    }


    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(mauSacService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add( @RequestBody MauSac ms){
        return ResponseEntity.ok(mauSacService.add(ms));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id , @RequestBody MauSac ms){
        return ResponseEntity.ok(mauSacService.update(ms, id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.ok(mauSacService.delete(id));
    }
}

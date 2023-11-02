package it.lab.controller;

import it.lab.entity.ChatLieu;
import it.lab.entity.MauSac;
import it.lab.iservice.IChatLieuService;
import it.lab.service.ChatLieuService;
import it.lab.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat-lieu")
public class ChatLieuController {
    @Autowired
    private ChatLieuService chatLieuService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(chatLieuService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add( @RequestBody ChatLieu cl){
        return ResponseEntity.ok(chatLieuService.add(cl));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id , @RequestBody ChatLieu chatLieu){
        return ResponseEntity.ok(chatLieuService.update(chatLieu, id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.ok(chatLieuService.delete(id));
    }
}

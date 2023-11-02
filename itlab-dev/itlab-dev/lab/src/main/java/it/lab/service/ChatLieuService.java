package it.lab.service;

import it.lab.entity.ChatLieu;

import it.lab.repository.ChatLieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatLieuService   {
    @Autowired
    ChatLieuRepository clRepo;

    public List<ChatLieu> getAll(){
        return clRepo.findAll();
    }

    public ChatLieu add(ChatLieu cl){
        return clRepo.save(cl);
    }

    public ChatLieu update(ChatLieu cl, Long id){
        Optional<ChatLieu> cl1 =clRepo.findById(id);
        if(cl1.isPresent()){
            ChatLieu chatLieu =cl1.get();
            chatLieu.setMaChatLieu(cl.getMaChatLieu());
            chatLieu.setTenChatLieu(cl.getTenChatLieu());
            chatLieu.setNgayTao(cl.getNgayTao());
            chatLieu.setNgayCapNhat(cl.getNgayCapNhat());
            return clRepo.save(chatLieu);
        }
        else {
            throw new RuntimeException("Không có chất liệu ");
        }
    }

    public Boolean delete(Long id){
        Optional<ChatLieu> ms1 =clRepo.findById(id);
        if(ms1.isPresent()){
            ChatLieu chatLieu = ms1.get();
            clRepo.delete(chatLieu);
            return true;
        }else {
            return false;
        }
    }
}

package it.lab.iservice;

import it.lab.entity.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IChatLieuService {
    Page<ChatLieu> getPage(Pageable pageable);
    List<ChatLieu> getAll();

    public ChatLieu save(ChatLieu cl);
    public void deleteById(long id);
    public ChatLieu update(ChatLieu cl,Long id);
    public ChatLieu findById(long id);
}

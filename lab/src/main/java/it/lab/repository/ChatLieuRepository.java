package it.lab.repository;

import it.lab.entity.ChatLieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatLieuRepository extends JpaRepository<ChatLieu,Long> {
    public boolean existsByTenChatLieuContains(String ten);
}

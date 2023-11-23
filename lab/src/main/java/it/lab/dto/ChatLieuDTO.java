package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.ChatLieu;
import it.lab.entity.MauSac;
import it.lab.entity.SanPham;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatLieuDTO {
    private Long id;
    private String maChatLieu;
    private String tenChatLieu;
    private List<SanPham> sanPhamList;
    private LocalDate ngayTao;
    private LocalDate ngayCapNhat;

    public static ChatLieuDTO fromEntity(ChatLieu entity) {
        return new ChatLieuDTO(
                entity.getId(),
                entity.getMaChatLieu(),
                entity.getTenChatLieu(),
                null,
                entity.getNgayTao(),
                entity.getNgayCapNhat()
        );
    }

    public static List<ChatLieuDTO> fromCollection(List<ChatLieu> collection) {
        List<ChatLieuDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

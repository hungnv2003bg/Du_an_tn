package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.ChatLieu;
import it.lab.entity.SanPham;
import it.lab.entity.ThietKe;
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
public class ThietKeDTO {
    private Long id;
    private String maThietKe;
    private String tenThietKe;
    private List<SanPham> sanPhamList;
    private LocalDate ngayTao;
    private LocalDate ngayCapNhat;

    public static ThietKeDTO fromEntity(ThietKe entity) {
        return new ThietKeDTO(
                entity.getId(),
                entity.getMaThietKe(),
                entity.getTenThietKe(),
                null,
                entity.getNgayTao(),
                entity.getNgayCapNhat()
        );
    }

    public static List<ThietKeDTO> fromCollection(List<ThietKe> collection) {
        List<ThietKeDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

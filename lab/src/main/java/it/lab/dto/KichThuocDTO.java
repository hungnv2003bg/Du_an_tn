package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.ChatLieu;
import it.lab.entity.KichThuoc;
import it.lab.entity.SanPhamChiTiet;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KichThuocDTO {
    private Long id;
    private String maKichThuoc;
    private String tenKichThuoc;
    private List<SanPhamChiTiet> sanPhamChiTietList;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;

    public static KichThuocDTO fromEntity(KichThuoc entity) {
        return new KichThuocDTO(
                entity.getId(),
                entity.getMaKichThuoc(),
                entity.getTenKichThuoc(),
                null,
                entity.getNgayTao(),
                entity.getNgayCapNhat()
        );
    }

    public static List<KichThuocDTO> fromCollection(List<KichThuoc> collection) {
        List<KichThuocDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

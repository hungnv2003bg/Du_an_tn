package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.GioHang;
import it.lab.entity.MauSac;
import it.lab.entity.NguoiDung;
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
public class MauSacDTO {
    private Long id;
    private String maMau;
    private String tenMau;
    private String maMauCss;
    private List<SanPhamChiTiet> sanPhamChiTietList;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;

    public static MauSacDTO fromEntity(MauSac entity) {
        return new MauSacDTO(
                entity.getId(),
                entity.getMaMau(),
                entity.getTenMau(),
                entity.getMaMauCss(),
                null,
                entity.getNgayTao(),
                entity.getNgayCapNhat()
        );
    }

    public static List<MauSacDTO> fromCollection(List<MauSac> collection) {
        List<MauSacDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

package it.lab.dto;


import it.lab.entity.SanPhamSuKien;
import it.lab.entity.SuKienGiamGia;
import it.lab.enums.TrangThaiSuKienGiamGia;
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
public class SuKienGiamGiaDTO {
    private Long id;
    private String tenSuKien;
    private LocalDate ngayBatDau;
    private LocalDate ngayKetThuc;
    private String moTa;
    private String logoSuKien;
    private TrangThaiSuKienGiamGia trangThai;
    private LocalDate ngayTao;
    private LocalDate ngayCapNhat;
    private List<SanPhamSuKien> sanPhamSuKienList;

    public static SuKienGiamGiaDTO fromEntity(SuKienGiamGia entity) {
        return new SuKienGiamGiaDTO(
                entity.getId(),
                entity.getTenSuKien(),
                entity.getNgayBatDau(),
                entity.getNgayKetThuc(),
                entity.getMoTa(),
                entity.getLogoSuKien(),
                entity.getTrangThai(),
                entity.getNgayTao(),
                entity.getNgayCapNhat(),
                null

        );
    }

    public static List<SuKienGiamGiaDTO> fromCollection(List<SuKienGiamGia> collection) {
        List<SuKienGiamGiaDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

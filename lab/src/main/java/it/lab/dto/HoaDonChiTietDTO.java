package it.lab.dto;

import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
import it.lab.entity.SanPhamChiTiet;
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
public class HoaDonChiTietDTO {
    private Long id;
    private HoaDon hoaDon;
    private SanPhamChiTiet sanPhamChiTiet;
    private Integer soLuong;
    private Double donGia;
    private LocalDate ngayTao;
    private LocalDate ngayCapNhat;

    public static HoaDonChiTietDTO fromEntity(HoaDonChiTiet entity) {
        return new HoaDonChiTietDTO(
                entity.getId(),
                entity.getHoaDon(),
                entity.getSanPhamChiTiet(),
                entity.getSoLuong(),
                entity.getDonGia(),
                entity.getNgayTao(),
                entity.getNgayCapNhat()
        );
    }

    public static List<HoaDonChiTietDTO> fromCollection(List<HoaDonChiTiet> collection) {
        List<HoaDonChiTietDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

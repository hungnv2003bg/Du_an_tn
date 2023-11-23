package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.GioHang;
import it.lab.entity.NguoiDung;
import it.lab.entity.SanPhamChiTiet;
import it.lab.entity.SanPhamYeuThich;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class GioHangDTO {
    private Long id;
    private NguoiDung nguoiMua;
    private SanPhamChiTiet sanPhamChiTiet;
    private Integer soLuong;
    private LocalDate ngayTao;
    private LocalDate ngayCapNhat;

    public static GioHangDTO fromEntity(GioHang entity) {
        NguoiDung ng = entity.getNguoiMua();
        ng.setMatKhau("");
        return new GioHangDTO(
                entity.getId(),
                ng,
                entity.getSanPhamChiTiet(),
                entity.getSoLuong(),
                entity.getNgayTao(),
                entity.getNgayCapNhat()
        );
    }

    public static List<GioHangDTO> fromCollection(List<GioHang> collection) {
        List<GioHangDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

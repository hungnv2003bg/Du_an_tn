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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class YeuThichDTO {
    private Long id;
    private NguoiDung nguoiMua;
    private SanPhamChiTiet sanPhamChiTiet;
    private LocalDateTime ngayCapNhat;

    public static YeuThichDTO fromEntity(SanPhamYeuThich entity) {
        NguoiDung ng = entity.getNguoiDung();
        ng.setMatKhau("");
        return new YeuThichDTO(
                entity.getId(),
                ng,
                entity.getSanPhamChiTiet(),
                entity.getNgayCapNhat()
        );
    }

    public static List<YeuThichDTO> fromCollection(List<SanPhamYeuThich> collection) {
        List<YeuThichDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

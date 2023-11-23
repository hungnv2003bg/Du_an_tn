package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.HoaDon;
import it.lab.entity.PhuongThucThanhToan;
import it.lab.entity.PhuongThucVanChuyen;
import it.lab.enums.TrangThaiPhuongThucThanhToan;
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
public class PhuongThucVanChuyenDTO {
    private Long id;
    private String maPhuongThuc;
    private String tenPhuongThuc;
    private TrangThaiPhuongThucThanhToan trangThai;
    private LocalDate ngayTao;
    private LocalDate ngayCapNhat;
    private List<HoaDon> hoaDonList;

    public static PhuongThucVanChuyenDTO fromEntity(PhuongThucVanChuyen entity) {
        return new PhuongThucVanChuyenDTO(
                entity.getId(),
                entity.getMaPhuongThuc(),
                entity.getTenPhuongThuc(),
                entity.getTrangThai(),
                entity.getNgayTao(),
                entity.getNgayCapNhat(),
                null
        );
    }

    public static List<PhuongThucVanChuyenDTO> fromCollection(List<PhuongThucVanChuyen> collection) {
        List<PhuongThucVanChuyenDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

package it.lab.modelcustom.respon;

import it.lab.entity.HoaDon;
import it.lab.enums.TrangThaiHoaDon;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonHoanThanh {
    private Long key;
    private String maHoaDon;
    private String tenKhachHang;
    private String soDienThoai;
    private Double giaTriHd;
    private LocalDateTime ngayTao;
    private String trangThai;

    public static HoaDonHoanThanh fromEntity(HoaDon entity) {
        return new HoaDonHoanThanh(
                entity.getId(),
                entity.getMaHoaDon(),
                entity.getNguoiMua().getHo() + entity.getNguoiMua().getTen(),
                entity.getNguoiMua().getSoDienThoai(),
                entity.getGiaTriHd(),
                entity.getNgayTao(),
                "Đã giao hàng"
        );
    }

    public static List<HoaDonHoanThanh> fromCollection(List<HoaDon> collection) {
        List<HoaDonHoanThanh> to = new ArrayList<>();
        collection.forEach(x -> {
            if (x.getTrangThai() == TrangThaiHoaDon.DAGIAO) {
                to.add(fromEntity(x));
            }
        });
        return to;
    }
}

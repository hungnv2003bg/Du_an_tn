package it.lab.modelcustom.respon;

import it.lab.dto.DiaChiDTO;
import it.lab.entity.DiaChi;
import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
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
public class HoaDonChoGiao {
    private Long key;
    private String maHoaDon;
    private String tenKhachHang;
    private String soDienThoai;
    private List<HoaDonChiTiet> hoaDonChiTietList;
    private LocalDateTime ngayTao;
    private String trangThai;

    public static HoaDonChoGiao fromEntity(HoaDon entity) {
        return new HoaDonChoGiao(
                entity.getId(),
                entity.getMaHoaDon(),
                entity.getNguoiMua().getHo() + entity.getNguoiMua().getTen(),
                entity.getNguoiMua().getSoDienThoai(),
                entity.getHoaDonChiTietList(),
                entity.getNgayTao(),
                "Chờ giao hàng"
        );
    }

    public static List<HoaDonChoGiao> fromCollection(List<HoaDon> collection) {
        List<HoaDonChoGiao> to = new ArrayList<>();
        collection.forEach(x -> {
            if (x.getTrangThai() == TrangThaiHoaDon.CHOGIAOHANG) {
                to.add(fromEntity(x));
            }
        });
        return to;
    }
}

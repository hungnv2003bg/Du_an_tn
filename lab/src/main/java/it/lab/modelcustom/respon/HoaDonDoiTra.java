package it.lab.modelcustom.respon;

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
public class HoaDonDoiTra {
    private Long key;
    private String maHoaDon;
    private String tenKhachHang;
    private String soDienThoai;
    private List<HoaDonChiTiet> hoaDonChiTietList;
    private LocalDateTime ngayCapNhat;
    private String trangThai;

    public static HoaDonDoiTra fromEntity(HoaDon entity) {
        return new HoaDonDoiTra(
                entity.getId(),
                entity.getMaHoaDon(),
                entity.getNguoiMua().getHo() + entity.getNguoiMua().getTen(),
                entity.getNguoiMua().getSoDienThoai(),
                entity.getHoaDonChiTietList(),
                entity.getNgayCapNhat(),
                "Đã đổi trả"
        );
    }

    public static List<HoaDonDoiTra> fromCollection(List<HoaDon> collection) {
        List<HoaDonDoiTra> to = new ArrayList<>();
        collection.forEach(x -> {
            if (x.getTrangThai() == TrangThaiHoaDon.DADOITRA) {
                to.add(fromEntity(x));
            }
        });
        return to;
    }
}

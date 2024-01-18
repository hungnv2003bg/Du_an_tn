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
public class HoaDonTuChoiDoi {
    private Long key;
    private String maHoaDon;
    private String tenKhachHang;
    private String soDienThoai;
    private List<HoaDonChiTiet> hoaDonChiTietList;
    private LocalDateTime ngayTao;
    private String trangThai;
    private String lyDoTuChoiTra;

    public static HoaDonTuChoiDoi fromEntity(HoaDon entity) {
        return new HoaDonTuChoiDoi(
                entity.getId(),
                entity.getMaHoaDon(),
                entity.getNguoiMua().getHo() + entity.getNguoiMua().getTen(),
                entity.getNguoiMua().getSoDienThoai(),
                entity.getHoaDonChiTietList(),
                entity.getNgayTao(),
                "Từ chối đổi trả",
                entity.getLyDoTuChoiTra()
        );
    }

    public static List<HoaDonTuChoiDoi> fromCollection(List<HoaDon> collection) {
        List<HoaDonTuChoiDoi> to = new ArrayList<>();
        collection.forEach(x -> {
            if (x.getTrangThai() == TrangThaiHoaDon.TUCHOIDOI) {
                to.add(fromEntity(x));
            }
        });
        return to;
    }
}

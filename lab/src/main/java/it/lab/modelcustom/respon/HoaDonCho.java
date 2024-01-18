package it.lab.modelcustom.respon;

import it.lab.dto.DiaChiDTO;
import it.lab.dto.HoaDonDTO;
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
public class HoaDonCho {
    private Long key;
    private String maHoaDon;
    private String tenKhachHang;
    private String soDienThoai;
    private List<HoaDonChiTiet> hoaDonChiTietList;
    private LocalDateTime ngayTao;
    private String trangThai;
    private HoaDonDTO hoaDon;

    public static HoaDonCho fromEntity(HoaDon entity) {
        return new HoaDonCho(
                entity.getId(),
                entity.getMaHoaDon(),
                entity.getNguoiMua().getHo() + entity.getNguoiMua().getTen(),
                entity.getNguoiMua().getSoDienThoai(),
                entity.getHoaDonChiTietList(),
                entity.getNgayTao(),
                "Chờ xác nhận",
                HoaDonDTO.fromEntity(entity)
        );
    }

    public static List<HoaDonCho> fromCollection(List<HoaDon> collection) {
        List<HoaDonCho> to = new ArrayList<>();
        collection.forEach(x -> {
            if (x.getTrangThai() == TrangThaiHoaDon.CHOXACNHAN) {
                to.add(fromEntity(x));
            }
        });
        return to;
    }
}

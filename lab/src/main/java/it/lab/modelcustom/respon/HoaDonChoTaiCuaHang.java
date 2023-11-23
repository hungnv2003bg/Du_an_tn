package it.lab.modelcustom.respon;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.*;
import it.lab.enums.TrangThaiHoaDon;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonChoTaiCuaHang {
    private Long id;
    private NguoiDung nguoiMua;
    private DiaChi diaChiGiao;
    private String key;
    private PhuongThucThanhToan phuongThucThanhToan;
    private PhuongThucVanChuyen phuongThucVanChuyen;
    private String ghiChu;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
    private LocalDate ngayGiao;
    private Double giaTriHd;
    private String trangThai;
    private NguoiDungVoucher voucherGiaoHang;
    private SanPhamSuKien sanPhamSuKien;
    private NguoiDungVoucher voucherGiam;
    private NguoiDung nhanVien;
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
    private List<HoaDonChiTiet> hoaDonChiTietList;
    private Double phiGiaoHang;
    private String label;

    public static HoaDonChoTaiCuaHang fromEntity(HoaDon entity) {
        String label = "Hóa đơn " + entity.getId();
        return new HoaDonChoTaiCuaHang(
                entity.getId(),
                entity.getNguoiMua(),
                entity.getDiaChiGiao(),
                entity.getMaHoaDon(),
                entity.getPhuongThucThanhToan(),
                entity.getPhuongThucVanChuyen(),
                entity.getGhiChu(),
                entity.getNgayTao(),
                entity.getNgayCapNhat(),
                entity.getNgayGiao(),
                entity.getGiaTriHd(),
                "Chờ",
                entity.getVoucherGiaoHang(),
                entity.getSanPhamSuKien(),
                entity.getVoucherGiam(),
                entity.getNhanVien(),
                null,
                entity.getHoaDonChiTietList(),
                entity.getPhiGiaoHang(),
                label
        );
    }

    public static List<HoaDonChoTaiCuaHang> fromCollection(List<HoaDon> collection) {
        List<HoaDonChoTaiCuaHang> to = new ArrayList<>();
        collection.forEach(x -> {
            if (x.getTrangThai() == TrangThaiHoaDon.HOADONCHO) {
                to.add(fromEntity(x));
            }
        });
        return to;
    }
}

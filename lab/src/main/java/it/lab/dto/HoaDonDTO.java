package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.*;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.modelcustom.respon.HoaDonHuy;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class HoaDonDTO {
    private Long id;
    private NguoiDung nguoiMua;
    private DiaChi diaChiGiao;
    private String maHoaDon;
    private PhuongThucThanhToan phuongThucThanhToan;
    private PhuongThucVanChuyen phuongThucVanChuyen;
    private String ghiChu;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
    private LocalDate ngayGiao;
    private Double giaTriHd;
    private Double phiVanChuyen;
    private TrangThaiHoaDon trangThai;
    private NguoiDungVoucher voucherGiaoHang;
    private SanPhamSuKien sanPhamSuKien;
    private NguoiDungVoucher voucherGiam;
    private NguoiDung nhanVien;
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
    private List<HoaDonChiTiet> hoaDonChiTietList;

    public static HoaDonDTO fromEntity(HoaDon entity) {
        return new HoaDonDTO(
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
                entity.getPhiGiaoHang(),
                entity.getTrangThai(),
                entity.getVoucherGiaoHang(),
                entity.getSanPhamSuKien(),
                entity.getVoucherGiam(),
                entity.getNhanVien(),
                entity.getBinhLuanDanhGiaList(),
                entity.getHoaDonChiTietList()
        );
    }

    public static List<HoaDonDTO> fromCollection(List<HoaDon> collection) {
        List<HoaDonDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

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
    private LocalDateTime ngayThanhToan;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
    private LocalDateTime ngayGiao;
    private Double giaTriHd;
    private Double phiVanChuyen;
    private TrangThaiHoaDon trangThai;
    private NguoiDungVoucherDTO voucherGiam;
    private NguoiDung nhanVien;
    private String lyDoTuChoiDoi;
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
    private List<HoaDonChiTiet> hoaDonChiTietList;
    private List<HoaDonChiTiet> truocDo;
    private List<HoaDonChiTiet> sauKhiDoi;

    public static HoaDonDTO fromEntity(HoaDon entity) {
        List<HoaDonChiTiet> truocDo = new ArrayList<>();
        List<HoaDonChiTiet> sauKhiDoi = new ArrayList<>();
        if (entity.getHoaDonChiTietList() != null) {
            truocDo = entity.getHoaDonChiTietList().stream().filter(x -> x.getTrangThai() == 1).toList();
            sauKhiDoi = entity.getHoaDonChiTietList().stream().filter(x -> x.getTrangThai() == 2).toList();
        }
        return new HoaDonDTO(
                entity.getId(),
                entity.getNguoiMua(),
                entity.getDiaChiGiao(),
                entity.getMaHoaDon(),
                entity.getPhuongThucThanhToan(),
                entity.getPhuongThucVanChuyen(),
                entity.getGhiChu(),
                entity.getNgayThanhToan(),
                entity.getNgayTao(),
                entity.getNgayCapNhat(),
                entity.getNgayGiao(),
                entity.getGiaTriHd(),
                entity.getPhiGiaoHang(),
                entity.getTrangThai(),
                entity.getVoucherGiam() != null ? NguoiDungVoucherDTO.fromEntity(entity.getVoucherGiam()) : null,
                entity.getNhanVien(),
                entity.getLyDoTuChoiTra(),
                entity.getBinhLuanDanhGiaList(),
                entity.getHoaDonChiTietList(),
                truocDo,
                sauKhiDoi
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

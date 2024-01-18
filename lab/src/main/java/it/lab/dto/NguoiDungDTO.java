package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.*;
import it.lab.enums.TrangThaiNguoiDung;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NguoiDungDTO {
    private Long id;
    private String maNguoiDung;
    private String email;
    private String matKhau;
    private String ten;
    private String ho;
    private String anhDaiDien;
    private String soDienThoai;
    private Boolean gioiTinh;
    private Integer diem;
    private TrangThaiNguoiDung trangThai;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
    private RankKhachHang rankKhachHang;
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
    private List<DiaChi> diaChiList;
    private List<GioHang> gioHangList;
    private List<HoaDon> danhSachMua;
    private List<HoaDon> danhSachHoaDonXacNhan;
    private List<NguoiDungVoucher> nguoiDungVoucherList;
    private List<QuyenNguoiDung> quyenNguoiDungList;
    private List<SanPhamYeuThich> sanPhamYeuThichList;
    List<Quyen> quyens;

    public static NguoiDungDTO fromEntity(NguoiDung ng) {
        if (ng == null) {
            return null;
        }
        return new NguoiDungDTO(ng.getId(), ng.getMaNguoiDung(), ng.getEmail(), null, ng.getTen(), ng.getHo(), ng.getAnhDaiDien(), ng.getSoDienThoai(), ng.getGioiTinh(), ng.getDiem(), ng.getTrangThai(), ng.getNgayTao(), ng.getNgayCapNhat(), ng.getRankKhachHang(), null, ng.getDiaChiList(), null, null, null, null, ng.getQuyenNguoiDungList(), null
        ,ng.getQuyenNguoiDungList().stream().map(x->{
            return x.getQuyen();
        }).collect(Collectors.toList())
        );
    }

    public static List<NguoiDungDTO> fromCollection(List<NguoiDung> collection) {
        List<NguoiDungDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

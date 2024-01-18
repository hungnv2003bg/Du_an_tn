package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.enums.TrangThaiSanPhamChiTiet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "sanphamchitiet")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "tensanpham",columnDefinition = "nvarchar(max)")
    private String tenSanPham;
    @Column(name = "masanpham")
    private String maSanPham;
    @Column(name = "gianhap")
    private Double giaNhap;
    @Column(name = "giaban")
    private Double giaBan;
    @Column(name = "soluongton")
    private Integer soLuongTon;
    @Column(name = "soluongdaban")
    private Integer soLuongDaBan;
    @Column(name = "soluongloi")
    private Integer soLuongLoi;
    @Column(name = "soluongtrahang")
    private Integer soLuongTraHang;
    @Column(name = "trangthai")
    private TrangThaiSanPhamChiTiet trangThai;
    @Column(name = "hinhanh")
    private String hinhAnh;
    @Column(name = "ngaytao")
    private LocalDateTime ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDateTime ngayCapNhat;
    @JoinColumn(name = "mausacid")
    @ManyToOne
    private MauSac mauSac;
    @JoinColumn(name = "kichthuocid")
    @ManyToOne
    private KichThuoc kichThuoc;
    @JoinColumn(name = "sanphamid")
    @ManyToOne
    private SanPham sanPham;
    @OneToMany(mappedBy = "sanPhamChiTiet")
    @JsonIgnore
    private List<HoaDonChiTiet> hoaDonChiTietList;
    @OneToMany(mappedBy = "sanPhamChiTiet")
    @JsonIgnore
    private List<GioHang> gioHangList;
    @JsonIgnore
    @OneToMany(mappedBy = "sanPhamChiTiet")
    private List<SanPhamYeuThich> sanPhamYeuThichList;
    @JsonIgnore
    @OneToMany(mappedBy = "sanPhamChiTiet")
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
}

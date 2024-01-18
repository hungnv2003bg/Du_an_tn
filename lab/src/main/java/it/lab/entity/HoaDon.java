package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.enums.TrangThaiHoaDon;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "hoadon")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoimuaid")
    @ManyToOne
    @JsonIgnore
    private NguoiDung nguoiMua;
    @JoinColumn(name = "diachigiaoid")
    @ManyToOne
    @JsonIgnore
    private DiaChi diaChiGiao;
    @Column(name = "mahoadon", unique = true)
    private String maHoaDon;
    @JoinColumn(name = "phuongthucthanhtoan")
    @ManyToOne
    @JsonIgnore
    private PhuongThucThanhToan phuongThucThanhToan;
    @JoinColumn(name = "phuongthucvanchuyen")
    @ManyToOne
    @JsonIgnore
    private PhuongThucVanChuyen phuongThucVanChuyen;
    @Column(name = "ghichu", columnDefinition = "nvarchar(max)")
    private String ghiChu;
    @Column(name = "ngaytao")
    private LocalDateTime ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDateTime ngayCapNhat;
    @Column(name = "ngaygiao")
    private LocalDateTime ngayGiao;
    @Column(name = "ngaythanhtoan")
    private LocalDateTime ngayThanhToan;
    @Column(name = "giatrihd")
    private Double giaTriHd;
    @Column(name = "trangthai")
    private TrangThaiHoaDon trangThai;
    @Column(name = "lydotuchoitra",columnDefinition = "nvarchar(max)")
    private String lyDoTuChoiTra;
    @JoinColumn(name = "vouchergiamid")
    @ManyToOne
    @JsonIgnore
    private NguoiDungVoucher voucherGiam;
    @JoinColumn(name = "nhanvienid")
    @ManyToOne
    @JsonIgnore
    private NguoiDung nhanVien;
    @OneToMany(mappedBy = "hoaDon")
    @JsonIgnore
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
    @OneToMany(mappedBy = "hoaDon")
    @JsonIgnore
    private List<HoaDonChiTiet> hoaDonChiTietList;
    @Column(name = "phigiaohang")
    private Double phiGiaoHang;
}

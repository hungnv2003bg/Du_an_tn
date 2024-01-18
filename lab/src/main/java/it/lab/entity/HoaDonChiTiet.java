package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "hoadonchitiet")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "hoadonid")
    @ManyToOne
    @JsonIgnore
    private HoaDon hoaDon;
    @JoinColumn(name = "sanphamchitietid")
    @ManyToOne
    private SanPhamChiTiet sanPhamChiTiet;
    @Column(name = "soluong")
    private Integer soLuong;
    @Column(name = "dongia")
    private Double donGia;
    @Column(name = "ngaytao")
    private LocalDateTime ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDateTime ngayCapNhat;
    @Column(name = "ghichu", columnDefinition = "nvarchar(max)")
    private String ghiChu;
    @Column(name = "soluongdoitra")
    private Integer soLuongDoiTra;
    @Column(name = "soluongloi")
    private Integer soLuongLoi;
    @Column(name = "soluongdoi")
    private Integer soLuongDoi;
    @Column(name = "trangthai")
    //1 là đã qua đổi tra 2 là chưa
    private Integer trangThai = 2;
}

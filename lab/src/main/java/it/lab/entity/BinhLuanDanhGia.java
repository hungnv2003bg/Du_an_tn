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
@Table(name = "binhluandanhgia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BinhLuanDanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoidungid")
    @ManyToOne
    @JsonIgnore
    private NguoiDung nguoiDung;
    @JoinColumn(name = "sanphamchitietid")
    @ManyToOne
    @JsonIgnore
    private SanPhamChiTiet sanPhamChiTiet;
    @JoinColumn(name = "hoadonid")
    @ManyToOne
    @JsonIgnore
    private HoaDon hoaDon;
    @Column(name = "hinhanh")
    private String hinhAnh;
    @Column(name = "binhluan", columnDefinition = "nvarchar(max)")
    private String binhLuan;
    @Column(name = "soSao")
    private Integer soSao;
    @Column(name = "ngaytao")
    private LocalDateTime ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDateTime ngayCapNhat;
}

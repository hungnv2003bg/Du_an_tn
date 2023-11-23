package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.enums.TrangThaiSuKienGiamGia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "sukiengiamgia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SuKienGiamGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "tensukien",columnDefinition = "nvarchar(max)")
    private String tenSuKien;
    @Column(name = "ngaybatdau")
    private LocalDate ngayBatDau;
    @Column(name = "ngayketthuc")
    private LocalDate ngayKetThuc;
    @Column(name = "mota",columnDefinition = "nvarchar(max)")
    private String moTa;
    @Column(name = "logosukien")
    private String logoSuKien;
    @Column(name = "trangthai")
    @JsonIgnore
    private TrangThaiSuKienGiamGia trangThai;
    @OneToMany(mappedBy = "suKienGiamGia")
    @JsonIgnore
    private List<SanPhamSuKien> sanPhamSuKienList;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}

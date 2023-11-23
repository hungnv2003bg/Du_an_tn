package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "giohang")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoimuaid")
    @ManyToOne
    @JsonIgnore
    private NguoiDung nguoiMua;
    @JoinColumn(name = "sanphamchitietid")
    @ManyToOne
    @JsonIgnore
    private SanPhamChiTiet sanPhamChiTiet;
    @Column(name = "soluong")
    private Integer soLuong;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}

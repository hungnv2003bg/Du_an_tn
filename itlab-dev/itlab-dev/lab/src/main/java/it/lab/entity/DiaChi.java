package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.enums.TrangThaiDiaChi;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "diachi")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoidungid")
    @ManyToOne
    @JsonIgnore
    private NguoiDung nguoiDung;
    @Column(name = "xaid")
    private String xaId;
    @Column(name = "huyenid")
    private String huyenId;
    @Column(name = "tinhid")
    private String tinhId;
    @Column(name = "chitietdiachi",columnDefinition = "nvarchar(max)")
    private String chiTietDiaChi;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
    @Column(name = "sodienthoai")
    private String soDienThoai;
    @Column(name = "ladiachichinh")
    private Boolean laDiaChiChinh;
    @Column(name = "trangthai")
    private TrangThaiDiaChi trangThai;
    @OneToMany(mappedBy = "diaChiGiao")
    @JsonIgnore
    private List<HoaDon> hoaDonList;
}

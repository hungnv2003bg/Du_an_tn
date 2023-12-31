package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "kichthuoc")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KichThuoc {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "makichthuoc",unique = true)
    private String maKichThuoc;
    @Column(name = "tenkichthuoc",columnDefinition = "nvarchar(max)")
    private String tenKichThuoc;
    @OneToMany(mappedBy = "kichThuoc")
    @JsonIgnore
    private List<SanPhamChiTiet> sanPhamChiTietList;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}

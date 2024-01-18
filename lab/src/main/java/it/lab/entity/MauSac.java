package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "mausac")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MauSac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "mamau",unique = true)
    private String maMau;
    @Column(name = "tenmau",columnDefinition = "nvarchar(max)")
    private String tenMau;
    @Column(name = "mamaucss",columnDefinition = "nvarchar(max)")
    private String maMauCss;
    @OneToMany(mappedBy = "mauSac")
    @JsonIgnore
    private List<SanPhamChiTiet> sanPhamChiTietList;
    @Column(name = "ngaytao")
    private LocalDateTime ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDateTime ngayCapNhat;
}

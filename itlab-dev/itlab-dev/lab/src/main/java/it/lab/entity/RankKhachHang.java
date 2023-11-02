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
@Table(name = "rankkhachhang")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RankKhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "marank",unique = true)
    private String maRank;
    @Column(name = "tenrank",columnDefinition = "nvarchar(max)")
    private String tenRank;
    @Column(name = "phantramgiam")
    private Double phanTramGiam;
    @OneToMany(mappedBy = "rankKhachHang")
    @JsonIgnore
    private List<NguoiDung> nguoiDungList;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}

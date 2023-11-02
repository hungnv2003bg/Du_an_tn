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
@Table(name = "thietke")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ThietKe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "mathietke")
    private String maThietKe;
    @Column(name = "tenthietke")
    private String tenThietKe;
    @OneToMany(mappedBy = "thietKe")
    @JsonIgnore
    private List<SanPham> sanPhamList;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}

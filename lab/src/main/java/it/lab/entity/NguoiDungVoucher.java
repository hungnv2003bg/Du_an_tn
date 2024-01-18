package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.enums.LoaiGiam;
import it.lab.enums.TrangThaiNguoiDungVoucher;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "nguoidungvoucher")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NguoiDungVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoidungid")
    @ManyToOne
    @JsonIgnore
    private NguoiDung nguoiDung;
    @JoinColumn(name = "voucherid")
    @ManyToOne
    @JsonIgnore
    private Voucher voucher;
    @Column(name = "hansudung")
    private LocalDateTime hanSuDung;
    @Column(name = "giatrigiam")
    private Double giaTriGiam;
    @Column(name = "trangthai")
    private TrangThaiNguoiDungVoucher trangThai;
    @JsonIgnore
    @OneToMany(mappedBy = "voucherGiam")
    private List<HoaDon> giamList;
}

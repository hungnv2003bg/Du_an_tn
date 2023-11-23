package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.enums.LoaiGiam;
import it.lab.enums.TrangThaiVoucher;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "voucher")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "mavoucher", unique = true)
    private String maVoucher;
    @Column(name = "tenvoucher", columnDefinition = "nvarchar(max)")
    private String tenVoucher;
    @Column(name = "giatrigiam")
    private Double giaTriGiam;
    @Column(name = "loaigiam")
    private LoaiGiam loaiGiam;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
    @Column(name = "trangthai")
    private TrangThaiVoucher trangThai;
    @OneToMany(mappedBy = "voucher")
    @JsonIgnore
    private List<NguoiDungVoucher> nguoiDungVoucherList;
}

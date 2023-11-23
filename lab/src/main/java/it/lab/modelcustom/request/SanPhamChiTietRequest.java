package it.lab.modelcustom.request;

import it.lab.entity.KichThuoc;
import it.lab.entity.MauSac;
import it.lab.entity.SanPham;
import it.lab.enums.TrangThaiSanPhamChiTiet;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamChiTietRequest {
    private Long id;
    private Double giaNhap;
    private Double giaBan;
    private Integer soLuongTon;
    private Integer soLuongDaBan;
    private Integer soLuongLoi;
    private Integer soLuongTraHang;
    private TrangThaiSanPhamChiTiet trangThai;
    private String hinhAnh;
    private Long mauSacId;
    private Long kichThuocId;
    private Long sanPhamId;
}

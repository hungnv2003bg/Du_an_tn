package it.lab.dto;

import it.lab.entity.*;
import it.lab.enums.TrangThaiSanPhamChiTiet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamChiTietDTO {
    private Long id;
    private String tenSanPham;
    private Double giaNhap;
    private Double giaBan;
    private Integer soLuongTon;
    private Integer soLuongDaBan;
    private Integer soLuongLoi;
    private Integer soLuongTraHang;
    private TrangThaiSanPhamChiTiet trangThai;
    private LocalDate ngayTao;
    private LocalDate ngayCapNhat;
    private MauSac mauSac;
    private KichThuoc kichThuoc;
    private SanPham sanPham;
    private String hinhAnh;
    private List<HoaDonChiTiet> hoaDonChiTietList;
    private List<GioHang> gioHangList;
    private List<SanPhamYeuThich> sanPhamYeuThichList;
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;

    public static SanPhamChiTietDTO fromEntity(SanPhamChiTiet entity) {
        return new SanPhamChiTietDTO(
                entity.getId(),
                entity.getTenSanPham(),
                entity.getGiaNhap(),
                entity.getGiaBan(),
                entity.getSoLuongTon(),
                entity.getSoLuongDaBan(),
                entity.getSoLuongLoi(),
                entity.getSoLuongTraHang(),
                entity.getTrangThai(),
                entity.getNgayTao(),
                entity.getNgayCapNhat(),
                entity.getMauSac(),
                entity.getKichThuoc(),
                entity.getSanPham(),
                entity.getHinhAnh(),
                null,
                null,
                null,
                null
        );
    }

    public static List<SanPhamChiTietDTO> fromCollection(List<SanPhamChiTiet> collection) {
        List<SanPhamChiTietDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

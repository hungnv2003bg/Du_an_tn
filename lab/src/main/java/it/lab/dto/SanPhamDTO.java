package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.*;
import it.lab.enums.TrangThaiSanPham;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamDTO {
    private Long id;
    private String maSanPham;
    private String tenSanPham;
    private String hinhAnh1;
    private String hinhAnh2;
    private Double giaNhap;
    private Double giaBan;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
    private String moTa;
    private TrangThaiSanPham trangThai;
    private Integer soLuongTon;
    private Integer soLuongDaBan;
    private Integer soLuongTraHang;
    private Integer soLuongLoi;
    private ThietKe thietKe;
    private NhomSanPham nhomSanPham;
    private ChatLieu chatLieu;
    private List<HinhAnhSanPham> hinhAnhSanPhamList;
    private List<SanPhamChiTiet> sanPhamChiTietList;

    public static SanPhamDTO fromEntity(SanPham entity) {
        return new SanPhamDTO(
                entity.getId(),
                entity.getMaSanPham(),
                entity.getTenSanPham(),
                entity.getHinhAnh1(),
                entity.getHinhAnh2(),
                entity.getGiaNhap(),
                entity.getGiaBan(),
                entity.getNgayTao(),
                entity.getNgayCapNhat(),
                entity.getMoTa(),
                entity.getTrangThai(),
                entity.getSoLuongTon(),
                entity.getSoLuongDaBan(),
                entity.getSoLuongTraHang(),
                entity.getSoLuongLoi(),
                entity.getThietKe(),
                entity.getNhomSanPham(),
                entity.getChatLieu(),
                entity.getHinhAnhSanPhamList(),
                entity.getSanPhamChiTietList()
        );
    }

    public static List<SanPhamDTO> fromCollection(List<SanPham> collection) {
        List<SanPhamDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}

package it.lab.modelcustom.request;

import it.lab.enums.TrangThaiSanPham;
import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamRequest {
    private Long id;
    private String maSanPham;
    private String tenSanPham;
    private Double giaNhap;
    private Double giaBan;
    private String moTa;
    private Long nhomSanPhamId;
    private Long thietKeId;
    private Long chatLieuId;
    private Integer soLuongTon;
    private Integer soLuongDaBan;
    private Integer soLuongTraHang;
    private Integer soLuongLoi;
}

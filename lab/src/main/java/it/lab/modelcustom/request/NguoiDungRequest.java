package it.lab.modelcustom.request;

import it.lab.entity.RankKhachHang;
import it.lab.enums.TrangThaiNguoiDung;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NguoiDungRequest {
    private Long id;
    private String maNguoiDung;
    private String email;
    private String matKhau;
    private String ten;
    private String ho;
    private String soDienThoai;
    private Boolean gioiTinh;
    private Integer diem;
    private TrangThaiNguoiDung trangThai;
    private List<Integer> quyen;
}

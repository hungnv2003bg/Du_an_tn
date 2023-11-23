package it.lab.modelcustom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MuaTaiQuayRequest {
    private Boolean isCoDiaChiMoi;
    private Boolean koDungDiaChi;
    private String tinhId;
    private String huyenId;
    private String xaId;
    private String tinh;
    private String huyen;
    private String xa;
    private String chiTietDiaChi;
    private Long hoaDonId;
    private Long diaChiId;
    private Long phuongThucThanhToan;
    private Long phuongThucVanChuyen;
    private String ghiChu;
    private Long khachHangId;
    private String soDienThoai;
    private String email;
    private String nguoiNhan;
    private String hoNguoiNhan;
}

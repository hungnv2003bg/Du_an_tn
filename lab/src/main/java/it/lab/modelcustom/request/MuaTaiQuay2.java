package it.lab.modelcustom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MuaTaiQuay2 {
    /// 0 là chưa chọn
    /// 1 là VN Pay
    /// 2 là tiền mặt
    private Integer thanhToanBang;
    /// 0 là không dùng
    /// 1 là tạo mới
    /// 2 là sử dụng địa chỉ có sẵn
    private Integer taoDiaChi;
    private Long hoaDonId;
    private Long khachHangId;
    private Long diaChiId;
    private DiaChiMoi diaChiMoi;
    private String ghiChu;
    private Double phiGiaoHang;
    private Long voucherId;
}

package it.lab.modelcustom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TaoHoaDonOnline {
    private String ghiChu;
    private Long diaChiId;
    private Long phuongThucThanhToanId;
    private Long phuongThucVanChuyenId;
    private Integer gia;
    private Double phiVanChuyen;
}

package it.lab.modelcustom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DiaChiMoi {
    private String tinhId;
    private String huyenId;
    private String xaId;
    private String tinh;
    private String huyen;
    private String xa;
    private String soDienThoai;
    private String ten;
    private String ho;
    private String chiTietDiaChi;
}

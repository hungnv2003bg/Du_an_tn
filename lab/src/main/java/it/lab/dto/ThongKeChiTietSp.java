package it.lab.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ThongKeChiTietSp {
    private List<ChiTietDoanhSoTheo12Thang> thongKeChiTiet12;
    private List<SoSanhDoanhSo> soSanhDoanhSo;
    private List<SoSanhDoanhThu> soSanhDoanhThu;
}

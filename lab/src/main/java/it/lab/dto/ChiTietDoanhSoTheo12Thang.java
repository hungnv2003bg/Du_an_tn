package it.lab.dto;

import it.lab.entity.SanPhamChiTiet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChiTietDoanhSoTheo12Thang {
    private SanPhamChiTiet sanPhamChiTiet;
    private Integer soLuong;
}

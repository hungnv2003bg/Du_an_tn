package it.lab.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamEDTO {
    private Long id;
    private String maSanPham;
    private String tenSanPham;
    private String hinhAnh1;
    private int soLuongBan;
}

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
public class DoanhSoSanPham12Thang {
    private SanPhamDTO sanPham;
    private List<Integer> doanhSo;
}

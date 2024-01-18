package it.lab.modelcustom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FilterSanPham {
    private Long[] mauSac = {};
    private Long[] kichThuoc = {};
    private Long[] chatLieu = {};
    private Long[] nhomSanPham = {};
    private Long min;
    private Long max;
    private String keyWord;
}

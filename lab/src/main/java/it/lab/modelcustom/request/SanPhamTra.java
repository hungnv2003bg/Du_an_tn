package it.lab.modelcustom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamTra {
    private Integer soLuong;
    private Integer soLuongLoi;
    private Integer soLuongDoiTra;
    private Long chiTietId;
    private String ghiChu;
}

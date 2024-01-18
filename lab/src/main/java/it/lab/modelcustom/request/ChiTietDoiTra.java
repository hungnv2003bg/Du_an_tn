package it.lab.modelcustom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChiTietDoiTra {
    private List<SanPhamDoi>  duLieuMoi;
    private Integer soLuongDoiTra;
    private Integer soLuongLoi;
    private Integer soLuong;
    private String ghiChu;
    private Long chiTietId;
}

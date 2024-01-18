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
public class DoiTra2 {
    private List<SanPhamDoi2> sanPhamDoi;
    private List<SanPhamTra> sanPhamTra;
    private Long hoaDonId;
}

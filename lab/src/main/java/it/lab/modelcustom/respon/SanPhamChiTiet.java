package it.lab.modelcustom.respon;

import it.lab.dto.SanPhamChiTietDTO;
import it.lab.dto.SanPhamDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamChiTiet {
    private SanPhamDTO sanPhamDTO;
    private List<SanPhamChiTietDTO> sanPhamChiTietDTOList;
}

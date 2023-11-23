package it.lab.modelcustom.respon;

import it.lab.dto.DiaChiDTO;
import it.lab.dto.GioHangDTO;
import it.lab.dto.PhuongThucThanhToanDTO;
import it.lab.dto.PhuongThucVanChuyenDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CheckOut {
    private List<GioHangDTO> sanPhamList;
    private List<DiaChiDTO> diaChiDTOList;
    private List<PhuongThucThanhToanDTO> phuongThucThanhToanDTOList;
    private List<PhuongThucVanChuyenDTO> phuongThucVanChuyenDTOList;
}

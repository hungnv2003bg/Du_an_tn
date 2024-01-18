package it.lab.modelcustom.respon;

import it.lab.dto.NguoiDungDTO;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NguoiDungVoucherSoLuong {
    private NguoiDungDTO nguoiDungDTO;
    private Integer daDung;
    private Integer chuaDung;
    private Integer hetHan;
}

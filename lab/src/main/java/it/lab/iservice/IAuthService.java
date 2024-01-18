package it.lab.iservice;

import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.enums.APIStatus;

public interface IAuthService {
    public Long dangKyTaiKhoan(NguoiDung nguoiDung);

    public Integer xacNhanTaiKhoan(String code);

    public Integer guiLaiMa(Long id);

    public Integer quenMatKhau(String email);

    public Integer doiMatKhau(String code,String matKhauMoi);
}

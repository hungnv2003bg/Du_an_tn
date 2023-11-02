package it.lab.iservice;

import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;

public interface IAuthService {
    public ResponObject<NguoiDungDTO> dangKyTaiKhoan(NguoiDung nguoiDung);
}

package it.lab.iservice;

import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.enums.APIStatus;

public interface IAuthService {
    public ResponObject<NguoiDungDTO, APIStatus> dangKyTaiKhoan(NguoiDung nguoiDung);
}

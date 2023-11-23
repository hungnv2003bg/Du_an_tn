package it.lab.iservice;

import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.enums.CapNhat;
import it.lab.modelcustom.request.DoiMatKhau;

public interface INguoiDungService {
    public NguoiDungDTO layThongTinTaiKhoanById(Long id);
    public ResponObject<NguoiDungDTO, CapNhat> capNhatNguoiDung(NguoiDungDTO nguoiDung);
    public ResponObject<NguoiDungDTO, CapNhat> doiMatKhau(DoiMatKhau matKhau);
}

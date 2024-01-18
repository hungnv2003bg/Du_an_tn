package it.lab.iservice;

import it.lab.common.ResponObject;
import it.lab.dto.GioHangDTO;
import it.lab.enums.APIStatus;
import it.lab.modelcustom.respon.CheckOut;

import java.util.List;

public interface IGioHangService {
    public ResponObject<String, APIStatus> themSanPhamChiTietVaoGioHang(Long nguoiDungId, Long sanPhamChiTietId, Integer soLuong);

    public ResponObject<List<GioHangDTO>, APIStatus> layGioHang(Long nguoiDungId);

    public ResponObject<CheckOut, APIStatus> capNhatSoLuongGioHang(Long nguoiDungId, Long gioHangId, Integer soLuongMoi);

    public void xoaGioHang(Long gioHangId);
}

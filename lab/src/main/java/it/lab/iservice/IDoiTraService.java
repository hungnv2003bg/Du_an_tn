package it.lab.iservice;

import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
import it.lab.modelcustom.request.ChiTietDoiTra;
import it.lab.modelcustom.request.DoiTra2;

import java.util.List;

public interface IDoiTraService {
    public List<HoaDonChiTiet> layHoaDonChiTietCuaHoaDon(Long hoaDonId);

    public Boolean doiTra(List<ChiTietDoiTra> data);

    /// 1 là thành công, 2 là ko đồng ý do giá trị hóa đơn nhỏ hơn trước
    public Integer doiTra2(DoiTra2 doiTra);

    public Boolean huyDoiTra(Long hoaDonId);
}

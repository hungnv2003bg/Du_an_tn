package it.lab.iservice;

import it.lab.dto.DoanhSoSanPham12Thang;
import it.lab.dto.SanPhamYeuThichDTO;
import it.lab.dto.ThongKeChiTietSp;
import it.lab.enums.APIStatus;
import it.lab.modelcustom.respon.DoanhThu;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ICRMService {
    public List<SanPhamYeuThichDTO> getSanPhamYeuThichUser(Long userId);

    public List<DoanhThu> doanhThuTheo12Thang(Integer nam);

    public List<DoanhSoSanPham12Thang> thongKeBan12Thang(Integer nam);

    public ThongKeChiTietSp thongKeChiTietCuaSanPham(long spId, long truoc, long sau);
}

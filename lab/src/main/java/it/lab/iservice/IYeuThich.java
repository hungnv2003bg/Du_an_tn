package it.lab.iservice;

import it.lab.dto.YeuThichDTO;
import it.lab.entity.SanPhamYeuThich;

import java.util.List;

public interface IYeuThich {
    public List<YeuThichDTO> layHetYeuThich(Long nguoiDungId);

    public void taoYeuThich(Long nguoiDungId, Long sanPhamChiTietId);

    public void xoaYeuThich(Long yeuThichId);

}

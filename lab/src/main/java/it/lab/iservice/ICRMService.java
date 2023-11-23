package it.lab.iservice;

import it.lab.dto.SanPhamYeuThichDTO;
import it.lab.entity.SanPhamYeuThich;

import java.util.List;

public interface ICRMService {
    public List<SanPhamYeuThichDTO> getSanPhamYeuThichUser(Long userId);
}

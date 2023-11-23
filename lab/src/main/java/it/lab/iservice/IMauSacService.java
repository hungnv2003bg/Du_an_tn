package it.lab.iservice;

import it.lab.common.Page;
import it.lab.dto.MauSacDTO;
import it.lab.dto.SanPhamDTO;

public interface IMauSacService {
    public Page<MauSacDTO> phanTrangMauSac(Integer page, Integer pageSize, String keyWord);
}

package it.lab.iservice;

import it.lab.dto.HoaDonDTO;

import java.util.List;

public interface IHoaDonNguoiDungService {
    public List<HoaDonDTO> layHoaDonNguoiDung(Long nguoiDungId, Integer type);
}

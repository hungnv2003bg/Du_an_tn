package it.lab.service;

import it.lab.dto.HoaDonDTO;
import it.lab.entity.HoaDon;
import it.lab.entity.NguoiDung;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.iservice.IHoaDonNguoiDungService;
import it.lab.repository.HoaDonRepo;
import it.lab.repository.NguoiDungRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HoaDonNguoiDungService implements IHoaDonNguoiDungService {
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;

    @Override
    public List<HoaDonDTO> layHoaDonNguoiDung(Long nguoiDungId, Integer type) {
        NguoiDung ng = _nguoiDungRepo.findById(nguoiDungId).get();
        List<HoaDon> data = _hoaDonRepo.findHoaDonsByNguoiMua(ng);
        switch (type) {
            case 1:
                return HoaDonDTO.fromCollection(data
                        .stream()
                        .filter(x -> x.getTrangThai() == TrangThaiHoaDon.CHOXACNHAN)
                        .collect(Collectors.toList()));
            case 2:
                return HoaDonDTO.fromCollection(data
                        .stream()
                        .filter(x -> x.getTrangThai() == TrangThaiHoaDon.CHOGIAOHANG)
                        .collect(Collectors.toList()));
            case 3:
                return HoaDonDTO.fromCollection(data
                        .stream()
                        .filter(x -> x.getTrangThai() == TrangThaiHoaDon.DANGGIAO)
                        .collect(Collectors.toList()));
            case 4:
                return HoaDonDTO.fromCollection(data
                        .stream()
                        .filter(x -> x.getTrangThai() == TrangThaiHoaDon.DAGIAO)
                        .collect(Collectors.toList()));
            case 5:
                return HoaDonDTO.fromCollection(data
                        .stream()
                        .filter(x -> x.getTrangThai() == TrangThaiHoaDon.CUAHANGHUY)
                        .collect(Collectors.toList()));
            case 6:
                return HoaDonDTO.fromCollection(data
                        .stream()
                        .filter(x -> x.getTrangThai() == TrangThaiHoaDon.DADOITRA)
                        .collect(Collectors.toList()));
            case 7:
                return HoaDonDTO.fromCollection(data
                        .stream()
                        .filter(x -> x.getTrangThai() == TrangThaiHoaDon.TUCHOIDOI)
                        .collect(Collectors.toList()));
            default:
                return HoaDonDTO.fromCollection(data);
        }
    }

}

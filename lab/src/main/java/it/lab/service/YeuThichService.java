package it.lab.service;

import it.lab.dto.YeuThichDTO;
import it.lab.entity.NguoiDung;
import it.lab.entity.SanPhamChiTiet;
import it.lab.entity.SanPhamYeuThich;
import it.lab.iservice.IYeuThich;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.SanPhamChiTietRepo;
import it.lab.repository.SanPhamYeuThichRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class YeuThichService implements IYeuThich {
    @Autowired
    private SanPhamYeuThichRepo _yeuThichRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;

    @Override
    public List<YeuThichDTO> layHetYeuThich(Long nguoiDungId) {
        NguoiDung ng = _nguoiDungRepo.findById(nguoiDungId).get();
        return YeuThichDTO.fromCollection(_yeuThichRepo.findSanPhamYeuThichesByNguoiDung(ng));
    }

    @Override
    public void taoYeuThich(Long nguoiDungId, Long sanPhamChiTietId) {
        SanPhamYeuThich sp = new SanPhamYeuThich();
        SanPhamChiTiet spct = _sanPhamChiTietRepo.findById(sanPhamChiTietId).get();
        NguoiDung ng = _nguoiDungRepo.findById(nguoiDungId).get();
        List<SanPhamYeuThich> spyt = _yeuThichRepo.findSanPhamYeuThichesByNguoiDungAndSanPhamChiTiet(ng,spct);
        if(spyt.size()>0){
            return;
        }
        sp.setNgayTao(LocalDateTime.now());
        sp.setSanPhamChiTiet(spct);
        sp.setNguoiDung(ng);
        _yeuThichRepo.save(sp);
    }

    @Override
    public void xoaYeuThich(Long yeuThichId) {
        _yeuThichRepo.deleteById(yeuThichId);
    }
}

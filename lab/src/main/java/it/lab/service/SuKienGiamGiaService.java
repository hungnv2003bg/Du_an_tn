package it.lab.service;

import it.lab.common.Page;
import it.lab.dto.ChatLieuDTO;
import it.lab.dto.SuKienGiamGiaDTO;
import it.lab.entity.SuKienGiamGia;
import it.lab.iservice.ISuKienGiamGiaService;
import it.lab.repository.SuKienGiamGiaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
public class SuKienGiamGiaService implements ISuKienGiamGiaService {
    @Autowired
    private SuKienGiamGiaRepo suKienGiamGiaRepo;

    @Override
    public Page<SuKienGiamGiaDTO> layHetSuKienGiamGia() {
        return new Page<SuKienGiamGiaDTO>(SuKienGiamGiaDTO.fromCollection(suKienGiamGiaRepo.findAll()), 0, 10000);
    }

    @Override
    public Page<SuKienGiamGiaDTO> xoaSuKienGiamGia(Long suKienGiamGiaId) {
        suKienGiamGiaRepo.deleteById(suKienGiamGiaId);
        return layHetSuKienGiamGia();
    }

    @Override
    public Page<SuKienGiamGiaDTO> suaSuKienGiamGia(SuKienGiamGia suKienGiamGia) {
        SuKienGiamGia suKienGiamGiaGoc = suKienGiamGiaRepo.findById(suKienGiamGia.getId()).get();
        suKienGiamGiaGoc.setTenSuKien(suKienGiamGia.getTenSuKien());
        suKienGiamGiaGoc.setNgayBatDau(suKienGiamGia.getNgayBatDau());
        suKienGiamGiaGoc.setNgayKetThuc(suKienGiamGia.getNgayKetThuc());
        suKienGiamGiaGoc.setMoTa(suKienGiamGia.getMoTa());
        suKienGiamGiaGoc.setLogoSuKien(suKienGiamGia.getLogoSuKien());
        suKienGiamGiaGoc.setTrangThai(suKienGiamGia.getTrangThai());
        suKienGiamGiaGoc.setNgayTao(suKienGiamGia.getNgayTao());
        suKienGiamGiaGoc.setNgayCapNhat(LocalDate.now());
        suKienGiamGiaRepo.save(suKienGiamGiaGoc);
        return layHetSuKienGiamGia();
    }

    @Override
    public Page<SuKienGiamGiaDTO> themSuKienGiamGia(SuKienGiamGia suKienGiamGia) {
        suKienGiamGia.setNgayTao(LocalDate.now());
        suKienGiamGiaRepo.save(suKienGiamGia);
        suKienGiamGiaRepo.save(suKienGiamGia);
        return layHetSuKienGiamGia();
    }

    @Override
    public SuKienGiamGiaDTO laySuKienGiamGiaById(Long sukienGiamGiaId) {
        return SuKienGiamGiaDTO.fromEntity(suKienGiamGiaRepo.findById(sukienGiamGiaId).get());
    }

    @Override
    public SuKienGiamGia findById(Long suKienGiamGiaId) {
        return suKienGiamGiaRepo.findById(suKienGiamGiaId).orElse(null);
    }
}

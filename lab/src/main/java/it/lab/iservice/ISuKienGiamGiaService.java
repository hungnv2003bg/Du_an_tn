package it.lab.iservice;

import it.lab.common.Page;
import it.lab.dto.NhomSanPhamDTO;
import it.lab.dto.SuKienGiamGiaDTO;
import it.lab.entity.ChatLieu;
import it.lab.entity.SuKienGiamGia;

public interface ISuKienGiamGiaService {
    public Page<SuKienGiamGiaDTO> layHetSuKienGiamGia();

    public Page<SuKienGiamGiaDTO> xoaSuKienGiamGia(Long suKienGiamGiaId);

    public Page<SuKienGiamGiaDTO> suaSuKienGiamGia(SuKienGiamGia suKienGiamGia);

    public Page<SuKienGiamGiaDTO> themSuKienGiamGia(SuKienGiamGia suKienGiamGia);

    public SuKienGiamGiaDTO laySuKienGiamGiaById(Long suKienGiamGiaId);
    public SuKienGiamGia findById(Long suKienGiamGiaId);
}

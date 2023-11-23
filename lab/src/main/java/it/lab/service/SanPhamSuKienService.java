package it.lab.service;

import it.lab.entity.SanPhamSuKien;
import it.lab.iservice.ISanPhamSuKienService;
import it.lab.repository.SanPhamRepo;
import it.lab.repository.SanPhamSuKienRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamSuKienService implements ISanPhamSuKienService {
    @Autowired
    SanPhamSuKienRepo repo;
    @Autowired
    SanPhamRepo sanPhamRepo;


    @Override
    public Page<SanPhamSuKien> getPage(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public SanPhamSuKien save(SanPhamSuKien sanPhamSuKien) {
        return repo.save(sanPhamSuKien);
    }

    @Override
    public SanPhamSuKien findById(long id) {
        return repo.findById(id).orElse(null);
    }



    @Override
    public List<Object[]> getSanPhamE(int thang,int nam) {
        return sanPhamRepo.getSanPhamE(thang,nam);
    }
}

package it.lab.iservice;

import it.lab.entity.SanPhamSuKien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ISanPhamSuKienService {
    Page<SanPhamSuKien> getPage(Pageable pageable);

    SanPhamSuKien save(SanPhamSuKien sanPhamSuKien);
    SanPhamSuKien findById(long id);
    List<Object[]> getSanPhamE(int thang,int nam);



}

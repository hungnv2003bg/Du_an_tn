package it.lab.service;

import it.lab.entity.Brand;
import it.lab.entity.KichThuoc;
import it.lab.repository.BrandRepo;
import it.lab.repository.KichThuocRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KichThuocService {
    @Autowired
    KichThuocRepo kichThuocRepo;

    public List<KichThuoc> getAll(){
        return kichThuocRepo.findAll();
    }

    public KichThuoc add(KichThuoc kichThuoc){
        return kichThuocRepo.save(kichThuoc);
    }

    public KichThuoc update(KichThuoc kt, Long id){
        Optional<KichThuoc> kt1 =kichThuocRepo.findById(id);
        if(kt1.isPresent()){
            KichThuoc kichThuoc =kt1.get();
            kichThuoc.setMaKichThuoc(kt.getMaKichThuoc());
            kichThuoc.setTenKichThuoc(kt.getTenKichThuoc());
            kichThuoc.setNgayTao(kt.getNgayTao());
            kichThuoc.setNgayCapNhat(kt.getNgayCapNhat());
            return kichThuocRepo.save(kichThuoc);
        }
        else {
            throw new RuntimeException("Không có kt");
        }
    }

    public Boolean delete(Long id){
        Optional<KichThuoc> ms1 =kichThuocRepo.findById(id);
        if(ms1.isPresent()){
            KichThuoc kichThuoc = ms1.get();
            kichThuocRepo.delete(kichThuoc);
            return true;
        }else {
            return false;
        }
    }
}

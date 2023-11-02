package it.lab.service;

import it.lab.entity.MauSac;
import it.lab.repository.MauSacRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MauSacService {
    @Autowired
    MauSacRepo msRepo;

    public Page<MauSac> getPage(Pageable pageable) {
        return msRepo.findAll(pageable);
    }

    public List<MauSac> getAll(){
        return msRepo.findAll();
    }

    public MauSac add(MauSac mauSac){
        return msRepo.save(mauSac);
    }

    public MauSac update(MauSac ms, Long id){
        Optional<MauSac> ms1 =msRepo.findById(id);
        if(ms1.isPresent()){
            MauSac mauSac =ms1.get();
            mauSac.setMaMau(ms.getMaMau());
            mauSac.setTenMau(ms.getTenMau());
            mauSac.setNgayTao(ms.getNgayTao());
            mauSac.setNgayCapNhat(ms.getNgayCapNhat());
            return msRepo.save(mauSac);
        }
        else {
            throw new RuntimeException("Không có màu sắc");
        }
    }

    public Boolean delete(Long id){
        Optional<MauSac> ms1 =msRepo.findById(id);
        if(ms1.isPresent()){
            MauSac mauSac = ms1.get();
            msRepo.delete(mauSac);
            return true;
        }else {
            return false;
        }
    }
}

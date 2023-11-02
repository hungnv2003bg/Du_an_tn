package it.lab.service;

import it.lab.entity.Brand;
import it.lab.entity.MauSac;
import it.lab.repository.BrandRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {
    @Autowired
    BrandRepo brandRepo;

    public List<Brand> getAll(){
        return brandRepo.findAll();
    }

    public Brand add(Brand brand){
        return brandRepo.save(brand);
    }

    public Brand update(Brand br, Long id){
        Optional<Brand> ms1 =brandRepo.findById(id);
        if(ms1.isPresent()){
            Brand brand =ms1.get();
            brand.setMaBrand(br.getMaBrand());
            brand.setTenBrand(br.getTenBrand());
            brand.setNgayTao(br.getNgayTao());
            brand.setNgayCapNhat(br.getNgayCapNhat());
            return brandRepo.save(brand);
        }
        else {
            throw new RuntimeException("Không có brand");
        }
    }

    public Boolean delete(Long id){
        Optional<Brand> ms1 =brandRepo.findById(id);
        if(ms1.isPresent()){
            Brand brand = ms1.get();
            brandRepo.delete(brand);
            return true;
        }else {
            return false;
        }
    }
}

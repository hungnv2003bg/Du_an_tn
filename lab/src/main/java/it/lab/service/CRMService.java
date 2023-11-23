package it.lab.service;

import it.lab.dto.SanPhamYeuThichDTO;
import it.lab.entity.NguoiDung;
import it.lab.entity.SanPhamYeuThich;
import it.lab.iservice.ICRMService;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.SanPhamYeuThichRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CRMService implements ICRMService {
    @Autowired
    private NguoiDungRepo _nguoidungRepo;
    @Autowired
    private SanPhamYeuThichRepo _sanPhamYeuThichRepo;
    @Override
    public List<SanPhamYeuThichDTO> getSanPhamYeuThichUser(Long userId) {
        Optional<NguoiDung> ng = _nguoidungRepo.findById(userId);
        if(ng.isEmpty()){
            return null;
        }
        return SanPhamYeuThichDTO.fromCollection(_sanPhamYeuThichRepo.findAllByNguoiDungEquals(ng.get()));
    }
}

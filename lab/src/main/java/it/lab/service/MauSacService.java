package it.lab.service;

import it.lab.common.Page;
import it.lab.dto.MauSacDTO;
import it.lab.dto.SanPhamDTO;
import it.lab.entity.MauSac;
import it.lab.iservice.IMauSacService;
import it.lab.repository.MauSacRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MauSacService implements IMauSacService {
    @Autowired
    private MauSacRepo _mauSacRepo;

    @Override
    public Page<MauSacDTO> phanTrangMauSac(Integer page, Integer pageSize, String keyWord) {
        List<MauSac> list = _mauSacRepo.findAll();
        if (list.size() > 0) {
            list.sort(Comparator.comparing(MauSac::getNgayTao));
        }
        if (keyWord != null) {
            list = list.stream().filter(x -> x.getTenMau().toLowerCase().toLowerCase().contains(keyWord.toLowerCase())).collect(Collectors.toList());
        }
        return new Page<MauSacDTO>(MauSacDTO.fromCollection(list), page, pageSize);
    }
}

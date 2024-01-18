package it.lab.service;

import it.lab.common.Page;
import it.lab.dto.ChatLieuDTO;
import it.lab.dto.RankKhachHangDTO;
import it.lab.entity.RankKhachHang;
import it.lab.iservice.IRankKhachHang;
import it.lab.repository.RankKhachHangRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RankKhachHangService implements IRankKhachHang {
    @Autowired
    RankKhachHangRepo repo;

    @Override
    public Page<RankKhachHangDTO> layHetRankKhachHang() {
        return new Page<RankKhachHangDTO>(RankKhachHangDTO.fromCollection(repo.findAll()), 0, 10000);
    }
}

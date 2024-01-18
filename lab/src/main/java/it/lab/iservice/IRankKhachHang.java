package it.lab.iservice;

import it.lab.common.Page;
import it.lab.dto.ChatLieuDTO;
import it.lab.dto.KichThuocDTO;
import it.lab.dto.RankKhachHangDTO;
import it.lab.entity.RankKhachHang;

public interface IRankKhachHang {
    public Page<RankKhachHangDTO> layHetRankKhachHang();
}

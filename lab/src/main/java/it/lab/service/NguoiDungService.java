package it.lab.service;

import it.lab.common.CloudinaryUpload;
import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.DiaChiDTO;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.entity.QuyenNguoiDung;
import it.lab.enums.APIStatus;
import it.lab.enums.CapNhat;
import it.lab.enums.TrangThaiNguoiDung;
import it.lab.iservice.INguoiDungService;
import it.lab.modelcustom.request.DoiMatKhau;
import it.lab.modelcustom.request.NguoiDungRequest;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NguoiDungService implements INguoiDungService {
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private PasswordEncoder _bcrypt;
    @Autowired
    private RankKhachHangRepo _rankKhachHangRepo;
    @Autowired
    private DiaChiRepo _diaChiRepo;
    @Autowired
    private QuyenNguoiDungRepo _quyenNguoiDungRepo;
    @Autowired
    private QuyenRepo _quyenRepo;

    @Override
    public Page<NguoiDungDTO> layHetNguoiDung() {
        return new Page<NguoiDungDTO>(NguoiDungDTO.fromCollection(_nguoiDungRepo.findAll()), 0, 10000);
    }

    @Override
    public NguoiDungDTO layThongTinTaiKhoanById(Long id) {
        return NguoiDungDTO.fromEntity(_nguoiDungRepo.findById(id).orElse(null));
    }

    @Override
    public ResponObject<String, APIStatus> capNhatNguoiDung(NguoiDungRequest nguoiDungRequest, MultipartFile anhdaidien) throws IOException {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(nguoiDungRequest.getId());
        if (ng.isEmpty()) {
            return new ResponObject<String, APIStatus>(null, APIStatus.THATBAI, "Thất bại");
        }
        NguoiDung nguoiDung = ng.get();
        nguoiDung.setTen(nguoiDungRequest.getTen());
        nguoiDung.setHo(nguoiDungRequest.getHo());
        if (nguoiDungRequest.getMatKhau() != null) {
            nguoiDung.setMatKhau(_bcrypt.encode(nguoiDungRequest.getMatKhau()));
        }
        nguoiDung.setEmail(nguoiDungRequest.getEmail());
        nguoiDung.setSoDienThoai(nguoiDungRequest.getSoDienThoai());
        nguoiDung.setGioiTinh(nguoiDungRequest.getGioiTinh());
        if (!(anhdaidien == null)) {
            nguoiDung.setAnhDaiDien(CloudinaryUpload.uploadFile(anhdaidien));
        }
        nguoiDung.setTrangThai(nguoiDungRequest.getTrangThai());
        nguoiDung.setNgayCapNhat(LocalDateTime.now());
        _nguoiDungRepo.save(nguoiDung);
        if(nguoiDungRequest.getQuyen()!=null){
        themQuyenNguoiDung(nguoiDungRequest,nguoiDung);
        }
        return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Thành công");
    }

    @Override
    public ResponObject<NguoiDungDTO, CapNhat> doiMatKhau(DoiMatKhau matKhau) {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(matKhau.getNguoiDungId());
        if (ng.isEmpty()) {
            return new ResponObject<>(null, CapNhat.THATBAI, "Thất bại");
        }
        NguoiDung nguoiDungRepo = ng.get();
        if (!_bcrypt.matches(matKhau.getMatKhauCu(), ng.get().getMatKhau())) {
            return new ResponObject<>(null, CapNhat.MATKHAUCUSAI, "Thất bại");
        }
        nguoiDungRepo.setMatKhau(_bcrypt.encode(matKhau.getMatKhauMoi()));
        nguoiDungRepo.setNgayCapNhat(LocalDateTime.now());
        _nguoiDungRepo.save(nguoiDungRepo);
        return new ResponObject<>(NguoiDungDTO.fromEntity(nguoiDungRepo), CapNhat.THANHCONG, "Thành công");
    }

    @Override
    public Page<NguoiDungDTO> xoaNguoiDung(Long nguoiDungId) {
        try {
            _nguoiDungRepo.deleteById(nguoiDungId);
            return layHetNguoiDung();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<DiaChiDTO> layDiaChiNguoiDung(Long nguoiDungId) {
        NguoiDung ng = _nguoiDungRepo.findById(nguoiDungId).get();
        return DiaChiDTO.fromCollection(_diaChiRepo.findDiaChisByNguoiDung(ng));
    }

    @Override
    public ResponObject<String, APIStatus> themNguoiDung(NguoiDungRequest nguoiDungRequest, MultipartFile anhdaidien) throws IOException {
        if (_nguoiDungRepo.existsByEmailContains(nguoiDungRequest.getEmail())) {
            return new ResponObject<String, APIStatus>("Thành công", APIStatus.THATBAI, "Đã tồn tại email");
        }
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setNgayTao(LocalDateTime.now());
        nguoiDung.setTen(nguoiDungRequest.getTen());
        nguoiDung.setHo(nguoiDungRequest.getHo());
        nguoiDung.setEmail(nguoiDungRequest.getEmail());
        nguoiDung.setMatKhau(nguoiDungRequest.getMatKhau());
        nguoiDung.setSoDienThoai(nguoiDungRequest.getSoDienThoai());
        nguoiDung.setTrangThai(TrangThaiNguoiDung.HOATDONG);
        nguoiDung.setGioiTinh(nguoiDungRequest.getGioiTinh());
        nguoiDung.setAnhDaiDien(CloudinaryUpload.uploadFile(anhdaidien));

        _nguoiDungRepo.save(nguoiDung);
        nguoiDung.setMaNguoiDung("MEM" + nguoiDung.getId());
        _nguoiDungRepo.save(nguoiDung);
        themQuyenNguoiDung(nguoiDungRequest, nguoiDung);
        return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Thành công");
    }

    private void themQuyenNguoiDung(NguoiDungRequest nguoiDungRequest, NguoiDung nguoiDung) {
        var lst = _quyenNguoiDungRepo.findQuyenNguoiDungsByNguoiDung(nguoiDung);
        _quyenNguoiDungRepo.deleteAll(lst);
        QuyenNguoiDung khachHang = new QuyenNguoiDung();
        khachHang.setNguoiDung(nguoiDung);
        khachHang.setNgayTao(LocalDateTime.now());
        khachHang.setQuyen(_quyenRepo.findById(1l).get());
        _quyenNguoiDungRepo.save(khachHang);
        for (var item : nguoiDungRequest.getQuyen()) {
            if (item == 1) {
                continue;
            }
            if (item == 2) {
                QuyenNguoiDung qnd = new QuyenNguoiDung();
                qnd.setNguoiDung(nguoiDung);
                qnd.setNgayTao(LocalDateTime.now());
                qnd.setQuyen(_quyenRepo.findById(2l).get());
                _quyenNguoiDungRepo.save(qnd);
            }
            if (item == 3) {
                QuyenNguoiDung qnd = new QuyenNguoiDung();
                qnd.setNguoiDung(nguoiDung);
                qnd.setNgayTao(LocalDateTime.now());
                qnd.setQuyen(_quyenRepo.findById(3l).get());
                _quyenNguoiDungRepo.save(qnd);
            }
        }
    }

    @Override
    public void capNhatDiaChi(DiaChiDTO diaChi) {
        diaChi.setNgayCapNhat(LocalDateTime.now());
        _diaChiRepo.save(diaChi.toEntity());
    }
}

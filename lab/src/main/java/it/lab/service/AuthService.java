package it.lab.service;

import it.lab.common.Email;
import it.lab.common.QuenMatKhau;
import it.lab.common.ResponObject;
import it.lab.common.TaoTaiKhoan;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.entity.QuyenNguoiDung;
import it.lab.entity.XacNhan;
import it.lab.enums.APIStatus;
import it.lab.enums.TrangThaiNguoiDung;
import it.lab.iservice.IAuthService;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.QuyenNguoiDungRepo;
import it.lab.repository.QuyenRepo;
import it.lab.repository.XacNhanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService implements IAuthService {
    @Autowired
    private NguoiDungRepo _nguNguoiDungRepo;
    @Autowired
    private QuyenRepo _quyenRepo;
    @Autowired
    private QuyenNguoiDungRepo _quyenNguoiDung;
    @Autowired
    private XacNhanRepository _xacNhanRepo;

    @Override
    public Long dangKyTaiKhoan(NguoiDung nguoiDung) {
        if (_nguNguoiDungRepo.existsByEmailEquals(nguoiDung.getEmail())) {
            return null;
        }
        NguoiDung ng = new NguoiDung();
        ng.setMatKhau(new BCryptPasswordEncoder().encode(nguoiDung.getMatKhau()));
        ng.setEmail(nguoiDung.getEmail().toLowerCase());
        ng.setNgayTao(LocalDateTime.now());
        ng.setHo(nguoiDung.getHo());
        ng.setTen(nguoiDung.getTen());
        ng.setTrangThai(TrangThaiNguoiDung.CHOXACNHAN);
        _nguNguoiDungRepo.save(ng);
        ng.setMaNguoiDung("MEM" + ng.getId());
        _nguNguoiDungRepo.save(ng);
        QuyenNguoiDung qnd = new QuyenNguoiDung();
        qnd.setNgayTao(LocalDateTime.now());
        qnd.setNguoiDung(ng);
        qnd.setQuyen(_quyenRepo.findById(1l).get());
        _quyenNguoiDung.save(qnd);
        XacNhan xacNhan = new XacNhan();
        xacNhan.setCode(UUID.randomUUID().toString());
        xacNhan.setNgayTao(LocalDateTime.now());
        xacNhan.setNguoiDungId(ng.getId());
        xacNhan.setType(2);
        xacNhan.setNgayHetHan(LocalDateTime.now().plusDays(1));
        _xacNhanRepo.save(xacNhan);
        guiEmailXacNhan(ng.getEmail(), xacNhan.getCode());
        return xacNhan.getId();
    }

    @Override
    // 1 là không tồn tại 2 là thành công
    public Integer xacNhanTaiKhoan(String code) {
        var xacNhan = _xacNhanRepo.findXacNhanByCodeEquals(code);
        if (xacNhan.isEmpty()) {
            return 1;
        }
        NguoiDung ng = _nguNguoiDungRepo.findById(xacNhan.get().getNguoiDungId()).get();
        ng.setTrangThai(TrangThaiNguoiDung.HOATDONG);
        _nguNguoiDungRepo.save(ng);
        _xacNhanRepo.delete(xacNhan.get());
        return 2;
    }

    @Override
    public Integer guiLaiMa(Long id) {
        XacNhan xacNhan = _xacNhanRepo.findById(id).get();
        NguoiDung ng = _nguNguoiDungRepo.findById(xacNhan.getNguoiDungId()).get();
        xacNhan.setNgayHetHan(LocalDateTime.now());
        guiEmailXacNhan(ng.getEmail(), xacNhan.getCode());
        return 1;
    }

    @Override
    //1 là ko tìm thấy email 2 là gửi mã thành công
    public Integer quenMatKhau(String email) {
        Optional<NguoiDung> ng = _nguNguoiDungRepo.findNguoiDungByEmailEquals(email);
        if (ng.isEmpty()) {
            return 1;
        }
        XacNhan xn = new XacNhan();
        xn.setCode(UUID.randomUUID().toString());
        xn.setNgayTao(LocalDateTime.now());
        xn.setNgayHetHan(LocalDateTime.now().plusDays(1));
        xn.setNguoiDungId(ng.get().getId());
        guiEmailQuenMatKhau(ng.get().getEmail(), xn.getCode());
        _xacNhanRepo.save(xn);
        return 2;
    }

    @Override
    //1 là ko tìm thấy
    //2 là thành công
    public Integer doiMatKhau(String code, String matKhauMoi) {
        var xacNhan = _xacNhanRepo.findXacNhanByCodeEquals(code);
        if (xacNhan.isEmpty()) {
            return 1;
        }
        Optional<NguoiDung> ng = _nguNguoiDungRepo.findById(xacNhan.get().getNguoiDungId());
        ng.get().setMatKhau(new BCryptPasswordEncoder().encode(matKhauMoi));
        _nguNguoiDungRepo.save(ng.get());
        _xacNhanRepo.delete(xacNhan.get());
        return 2;
    }

    private void guiEmailQuenMatKhau(String email, String code) {
        Email emailServer = new Email();
        emailServer.sendContentHTML(email, "Yêu cầu đổi mật khẩu", QuenMatKhau.taoTaiKhoan(code));
    }

    private void guiEmailXacNhan(String email, String code) {
        Email emailServer = new Email();
        emailServer.sendContentHTML(email, "Xác nhận tài khoản routine", TaoTaiKhoan.taoTaiKhoan(code));
    }
}

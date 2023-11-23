package it.lab.service;

import it.lab.common.ResponObject;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.enums.CapNhat;
import it.lab.iservice.INguoiDungService;
import it.lab.iservice.TestService;
import it.lab.modelcustom.NguoiDungCustom;
import it.lab.modelcustom.request.DoiMatKhau;
import it.lab.repository.NguoiDungRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class NguoiDungService implements INguoiDungService {
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
private PasswordEncoder _bcrypt;

    @Override
    public NguoiDungDTO layThongTinTaiKhoanById(Long id) {
        return NguoiDungDTO.fromEntity(_nguoiDungRepo.findById(id).orElse(null));
    }

    @Override
    public ResponObject<NguoiDungDTO, CapNhat> capNhatNguoiDung(NguoiDungDTO nguoiDung) {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(nguoiDung.getId());
        if (ng.isEmpty()) {
            return new ResponObject<>(null, CapNhat.THATBAI, "Thất bại");
        }
        NguoiDung nguoiDungRepo = ng.get();
        nguoiDungRepo.setGioiTinh(nguoiDung.getGioiTinh());
        nguoiDungRepo.setHo(nguoiDung.getHo());
        nguoiDungRepo.setTen(nguoiDung.getTen());
        nguoiDungRepo.setNgayCapNhat(LocalDate.now());
        _nguoiDungRepo.save(nguoiDungRepo);
        return new ResponObject<>(NguoiDungDTO.fromEntity(nguoiDungRepo), CapNhat.THANHCONG, "Thành công");
    }

    @Override
    public ResponObject<NguoiDungDTO, CapNhat> doiMatKhau(DoiMatKhau matKhau) {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(matKhau.getNguoiDungId());
        if (ng.isEmpty()) {
            return new ResponObject<>(null, CapNhat.THATBAI, "Thất bại");
        }
        NguoiDung nguoiDungRepo = ng.get();
        String matKhauMaHoa=_bcrypt.encode(matKhau.getMatKhauCu());
        if(!matKhauMaHoa.equals(nguoiDungRepo.getMatKhau())){
            return new ResponObject<>(null, CapNhat.MATKHAUCUSAI, "Thất bại");
        }
        nguoiDungRepo.setMatKhau(_bcrypt.encode(matKhau.getMatKhauMoi()));
        nguoiDungRepo.setNgayCapNhat(LocalDate.now());
        _nguoiDungRepo.save(nguoiDungRepo);
        return new ResponObject<>(NguoiDungDTO.fromEntity(nguoiDungRepo), CapNhat.THANHCONG, "Thành công");
    }
}

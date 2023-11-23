package it.lab.iservice;

import it.lab.entity.NguoiDung;
import it.lab.modelcustom.NguoiDungCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TestService {
    List<NguoiDungCustom> layNguoiDung();
    Page<NguoiDung> getPage(Pageable pageable);
    List<NguoiDung> getAll();

    public NguoiDung save(NguoiDung nguoiDung);
    public NguoiDung update(NguoiDung nguoiDung);
    public NguoiDung findById(long id);
}

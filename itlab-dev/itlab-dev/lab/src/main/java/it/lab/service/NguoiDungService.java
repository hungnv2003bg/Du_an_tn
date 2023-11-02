package it.lab.service;

import it.lab.iservice.TestService;
import it.lab.modelcustom.NguoiDungCustom;
import it.lab.repository.NguoiDungRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NguoiDungService implements TestService {
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;

    @Override
    public List<NguoiDungCustom> layNguoiDung() {
        return _nguoiDungRepo.layDuLieu();
    }
}

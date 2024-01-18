package it.lab;

import it.lab.entity.NguoiDung;
import it.lab.enums.TrangThaiNguoiDung;
import it.lab.iservice.ISanPhamService;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.SanPhamChiTietRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@SpringBootApplication
@EnableScheduling
public class LabApplication  {


    public static void main(String[] args) {

        SpringApplication.run(LabApplication.class, args);
    }


}

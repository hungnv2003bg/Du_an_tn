package it.lab.controller;

import it.lab.config.JwtTokenProvider;
import it.lab.config.LoginRequest;
import it.lab.config.NguoiDungData;
import it.lab.config.NguoiDungUserDetails;
import it.lab.dto.NguoiDungDTO;
import it.lab.entity.NguoiDung;
import it.lab.enums.TrangThaiNguoiDung;
import it.lab.iservice.IAuthService;
import it.lab.repository.NguoiDungRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private IAuthService _authService;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private JwtTokenProvider _provider;
    @Autowired
    private AuthenticationManager authenticationManager;

    @RequestMapping(value = "/dangky", method = RequestMethod.POST)
    public ResponseEntity<?> themNguoiDung(@RequestBody NguoiDung nguoiDung) {
        return ResponseEntity.ok(_authService.dangKyTaiKhoan(nguoiDung));
    }

    @RequestMapping(value = "/xacnhantaikhoan", method = RequestMethod.GET)
    public ResponseEntity<?> xacNhanTaiKhoan(@RequestParam String code) {
        return ResponseEntity.ok(_authService.xacNhanTaiKhoan(code));
    }

    @RequestMapping(value = "/guilaima", method = RequestMethod.GET)
    public ResponseEntity<?> guiLaiMa(@RequestParam Long id) {
        return ResponseEntity.ok(_authService.guiLaiMa(id));
    }

    @RequestMapping(value = "/doimatkhau", method = RequestMethod.GET)
    public ResponseEntity<?> doiMatKhau(@RequestParam String code, @RequestParam String matKhauMoi) {
        return ResponseEntity.ok(_authService.doiMatKhau(code, matKhauMoi));
    }

    @RequestMapping(value = "/quenmatkhau", method = RequestMethod.GET)
    public ResponseEntity<?> quenMatKhau(@RequestParam String email) {
        return ResponseEntity.ok(_authService.quenMatKhau(email));
    }

    @RequestMapping(value = "/dangnhap", method = RequestMethod.POST)
    public ResponseEntity<?> dangNhap(@RequestBody LoginRequest login) throws Exception {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUserName(), login.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        NguoiDungUserDetails nd = (NguoiDungUserDetails) auth.getPrincipal();
        String jwt = _provider.taoToken(nd);
        List<String> roles = nd.getAuthorities().stream().map(x -> x.getAuthority()).collect(Collectors.toList());
        Optional<NguoiDung> ng = _nguoiDungRepo.findNguoiDungByEmailEquals(login.getUserName());
        if (ng.isEmpty()) {
            ResponseEntity.ok(1);
        }
        if (ng.get().getTrangThai() == TrangThaiNguoiDung.CHOXACNHAN) {
            return ResponseEntity.ok(1);
        }
        if (ng.get().getTrangThai() == TrangThaiNguoiDung.BIKHOA) {
            return ResponseEntity.ok(1);
        }
        NguoiDungData re = new NguoiDungData(NguoiDungDTO.fromEntity(ng.get()), jwt, roles);
        return ResponseEntity.ok(re);
    }

}

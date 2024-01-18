package it.lab.service;

import it.lab.dto.NguoiDungDTO;
import it.lab.dto.NguoiDungVoucherDTO;
import it.lab.dto.VoucherDTO;
import it.lab.entity.HoaDon;
import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import it.lab.entity.Voucher;
import it.lab.enums.TrangThaiNguoiDung;
import it.lab.enums.TrangThaiNguoiDungVoucher;
import it.lab.enums.TrangThaiVoucher;
import it.lab.iservice.IVoucherService;
import it.lab.modelcustom.respon.NguoiDungVoucherSoLuong;
import it.lab.repository.HoaDonRepo;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.NguoiDungVoucherRepo;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class VoucherService2 implements IVoucherService {
    @Autowired
    private VoucherRepo _voucherRepo;
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private NguoiDungVoucherRepo _nguoiDungVoucher;
    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    @Override
    public void themVoucher(VoucherDTO voucher) {
        voucher.setMaVoucher(generateRandomString());
        voucher.setNgayTao(LocalDateTime.now());
        voucher.setTrangThai(TrangThaiVoucher.DIENRA);
        _voucherRepo.save(voucher.toEntity());
    }


    public static String generateRandomString() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(10);

        for (int i = 0; i < 10; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString().toUpperCase();
    }

    @Override
    //1 là thành công. 2 là số lượng đổi phải lớn hơn hoặc bằng số lượng đang phát hành
    public int suaVoucher(VoucherDTO voucher) {
        Voucher v = _voucherRepo.findById(voucher.getId()).get();
        if (voucher.getSoLuong() < _nguoiDungVoucher.findNguoiDungVouchersByVoucher(v).size()) {
            return 2;
        }
        voucher.setNgayCapNhat(LocalDateTime.now());
        _voucherRepo.save(voucher.toEntity());
        capNhatVoucherChuaSuDung(v);
        return 1;
    }

    private void capNhatVoucherChuaSuDung(Voucher voucher) {
        List<NguoiDungVoucher> ndv = _nguoiDungVoucher.findNguoiDungVouchersByVoucher(voucher)
                .stream().filter(x -> x.getTrangThai() == TrangThaiNguoiDungVoucher.SUDUNG).collect(Collectors.toList());
        for (var item : ndv) {
            item.setGiaTriGiam(voucher.getGiaTriGiam());
        }
        _nguoiDungVoucher.saveAll(ndv);
    }

    @Override
    public void xoaVoucher(Long voucherId) {
        Voucher voucher = _voucherRepo.findById(voucherId).get();
        voucher.setTrangThai(TrangThaiVoucher.NGUNG);
        _voucherRepo.save(voucher);
    }

    @Override
    public List<VoucherDTO> layVoucher() {
        return _voucherRepo
                .findAll().stream()
                .map(x -> {
                    return VoucherDTO.fromEntity(x);
                }).collect(Collectors.toList());
    }

    @Override
    public List<NguoiDungVoucherSoLuong> layHetVoucherNguoiDung(Long voucherId) {
        List<NguoiDungVoucherSoLuong> result = new ArrayList<>();
        Voucher voucher = _voucherRepo.findById(voucherId).get();
        List<Long> list = _nguoiDungVoucher.layNguoiDungCuaVoucher(voucherId);
        for (var id : list) {
            NguoiDung ng = _nguoiDungRepo.findById(id).get();
            List<NguoiDungVoucher> listVoucherNg = _nguoiDungVoucher.findNguoiDungVouchersByNguoiDungAndVoucher(ng, voucher);
            int dadung = 0;
            int chuaDung = 0;
            int hetHan = 0;
            for (var item : listVoucherNg) {
                if (item.getTrangThai() == TrangThaiNguoiDungVoucher.DASUDUNG) {
                    dadung++;
                }
                if (item.getTrangThai() == TrangThaiNguoiDungVoucher.HETHAN) {
                    hetHan++;
                }
                if (item.getTrangThai() == TrangThaiNguoiDungVoucher.SUDUNG) {
                    chuaDung++;
                }
            }
            result.add(new NguoiDungVoucherSoLuong(
                    NguoiDungDTO.fromEntity(ng),
                    dadung,
                    chuaDung,
                    hetHan
            ));
        }
        return result;
    }

    @Override
    // 1 là ko thành công. 2 là voucher ko đủ số lượng
    public int themVoucherChoNguoiDung(Long nguoiDungId, Long voucherId, Integer soLuong) {
        Voucher voucher = _voucherRepo.findById(voucherId).get();
        if ((voucher.getSoLuong() - _nguoiDungVoucher.findNguoiDungVouchersByVoucher(voucher).size()) < soLuong) {
            return 2;
        }
        NguoiDung nd = _nguoiDungRepo.findById(nguoiDungId).get();
        List<NguoiDungVoucher> lst = new ArrayList<>();
        for (int i = 0; i < soLuong; i++) {
            lst.add(new NguoiDungVoucher(
                    null,
                    nd,
                    voucher,
                    voucher.getNgayKetThuc(),
                    voucher.getGiaTriGiam(),
                    TrangThaiNguoiDungVoucher.SUDUNG,
                    null
            ));
        }
        _nguoiDungVoucher.saveAll(lst);
        return 1;
    }

    @Override
    //1 là thành công. 2 là ko đủ số lượng
    public int phatChoToanHeThong(Long voucherId, Integer soLuong) {
        List<NguoiDung> lstNd = _nguoiDungRepo.findAll().stream().filter(x -> x.getTrangThai() != TrangThaiNguoiDung.BIKHOA).collect(Collectors.toList());
        Voucher voucher = _voucherRepo.findById(voucherId).get();
        if (voucher.getSoLuong() < lstNd.size() * soLuong) {
            return 2;
        }
        List<NguoiDungVoucher> lst = new ArrayList<>();
        for (var item : lstNd) {
            for (int i = 0; i < soLuong; i++) {
                lst.add(new NguoiDungVoucher(
                        null,
                        item,
                        voucher,
                        voucher.getNgayKetThuc(),
                        voucher.getGiaTriGiam(),
                        TrangThaiNguoiDungVoucher.SUDUNG,
                        null
                ));
            }
        }
        _nguoiDungVoucher.saveAll(lst);
        return 1;
    }



    @Override
    public List<VoucherDTO> layHetVoucherSuDungCuaNguoiDung(Long nguoiDungId) {
        NguoiDung ng = _nguoiDungRepo.findById(nguoiDungId).get();
        List<NguoiDungVoucher> lst = _nguoiDungVoucher.findNguoiDungVouchersByNguoiDung(ng)
                .stream().filter(x -> x.getTrangThai() == TrangThaiNguoiDungVoucher.SUDUNG).collect(Collectors.toList());
        Set<Voucher> voucherRe = lst.stream()
                .filter(x -> x.getVoucher().getTrangThai() == TrangThaiVoucher.DIENRA)
                .map(x -> {
                    return x.getVoucher();
                }).collect(Collectors.toList()).stream().collect(Collectors.toSet());
        return VoucherDTO.fromCollection(voucherRe.stream().toList());
    }

    @Override
    public void doiVoucherHoaDon(Long hoaDonId, Long voucherId) {
        HoaDon hd = _hoaDonRepo.findById(hoaDonId).get();
        Voucher voucher = _voucherRepo.findById(voucherId).get();
        NguoiDung nd = hd.getNguoiMua();
        if(hd.getVoucherGiam()!=null){
            NguoiDungVoucher ndv = hd.getVoucherGiam();
            ndv.setTrangThai(TrangThaiNguoiDungVoucher.SUDUNG);
            _nguoiDungVoucher.save(ndv);
        }
        var lstVoucher = _nguoiDungVoucher.findNguoiDungVouchersByNguoiDungAndVoucher(nd, voucher)
                .stream().filter(x -> x.getTrangThai() == TrangThaiNguoiDungVoucher.SUDUNG)
                .collect(Collectors.toList());
        NguoiDungVoucher ndv2 = lstVoucher.get(0);
        ndv2.setTrangThai(TrangThaiNguoiDungVoucher.DASUDUNG);
        hd.setVoucherGiam(ndv2);
        _hoaDonRepo.save(hd);
        _nguoiDungVoucher.save(ndv2);
    }
}

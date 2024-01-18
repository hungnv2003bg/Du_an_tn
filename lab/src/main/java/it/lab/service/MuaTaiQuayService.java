package it.lab.service;

import it.lab.common.Template;
import it.lab.config.Config;
import it.lab.dto.*;
import it.lab.entity.*;
import it.lab.enums.*;
import it.lab.iservice.IMuaTaiQuayService;
import it.lab.modelcustom.request.DiaChiMoi;
import it.lab.modelcustom.request.MuaTaiQuay2;
import it.lab.modelcustom.request.MuaTaiQuayRequest;
import it.lab.modelcustom.respon.HoaDonChoTaiCuaHang;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MuaTaiQuayService implements IMuaTaiQuayService {
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTietRepo;
    @Autowired
    private DiaChiRepo _diaChiRepo;
    @Autowired
    private PhuongThucThanhToanRepo _phuongThucThanhToanRepo;
    @Autowired
    private PhuongThucVanChuyenRepo _phuongThucVanChuyenRepo;
    @Autowired
    private RankKhachHangRepo _rankKhachRepo;
    @Autowired
    private SanPhamRepo _sanPhamRepo;
    @Autowired
    private VoucherRepo _voucherRepo;
    @Autowired
    private NguoiDungVoucherRepo _nguoiDungVoucherRepo;

    @Override
    public List<HoaDonChoTaiCuaHang> layDanhSachTaiCuaHang() {
        return HoaDonChoTaiCuaHang.fromCollection(_hoaDonRepo.findAll());
    }

    @Override
    public String taoMoiHoaDon(Long nhanVienId) {
        HoaDon hoaDon = new HoaDon();
        hoaDon.setNgayTao(LocalDateTime.now());
        hoaDon.setNhanVien(_nguoiDungRepo.findById(nhanVienId).get());
        hoaDon.setGiaTriHd(0d);
        hoaDon.setPhiGiaoHang(0d);
        hoaDon.setTrangThai(TrangThaiHoaDon.HOADONCHO);
        _hoaDonRepo.save(hoaDon);
        hoaDon.setMaHoaDon("HD" + hoaDon.getId());
        _hoaDonRepo.save(hoaDon);
        return hoaDon.getMaHoaDon();
    }

    @Override
    public List<SanPhamChiTietDTO> layHetChiTiet() {
        return SanPhamChiTietDTO.fromCollection(_sanPhamChiTietRepo.findAll());
    }

    @Override
    public List<HoaDonChiTietDTO> gioHangCuaHoaDon(Long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        return HoaDonChiTietDTO.fromCollection(_hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hoaDon));
    }

    @Override
    public List<HoaDonChiTietDTO> themSanPhamVaoHoaDon(Long hoaDonId, Long sanPhamId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        SanPhamChiTiet sanPhamChiTiet = _sanPhamChiTietRepo.findById(sanPhamId).get();
        var hoaDonChiTiet = _hoaDonChiTietRepo.findHoaDonChiTietByHoaDonAndSanPhamChiTiet(hoaDon,sanPhamChiTiet);
        if(hoaDonChiTiet.isPresent()){
            return gioHangCuaHoaDon(hoaDonId);
        }
        HoaDonChiTiet hoaDonNew = new HoaDonChiTiet();
        hoaDonNew.setHoaDon(hoaDon);
        hoaDonNew.setSoLuong(0);
        hoaDonNew.setSanPhamChiTiet(sanPhamChiTiet);
        hoaDonNew.setNgayTao(LocalDateTime.now());
        hoaDonNew.setDonGia(sanPhamChiTiet.getGiaBan());
        _hoaDonChiTietRepo.save(hoaDonNew);
        _hoaDonRepo.save(hoaDon);
        return gioHangCuaHoaDon(hoaDonId);
    }

    @Override
    public HoaDonDTO layHoaDon(Long hoaDonId) {
        return HoaDonDTO.fromEntity(_hoaDonRepo.findById(hoaDonId).get());
    }

    @Override
    public List<NguoiDungDTO> layDanhSachKhachHang() {
        return NguoiDungDTO.fromCollection(_nguoiDungRepo.findAll());
    }

    @Override
    public List<DiaChiDTO> layDiaChiNguoiDung(Long nguoiDungId) {
        return DiaChiDTO.fromCollection(_diaChiRepo.findDiaChisByNguoiDung(_nguoiDungRepo.findById(nguoiDungId).get()));
    }

    private void thayDoiSoLuongKhiConfirmHoaDon(long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        var chiTiet = _hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hoaDon);
        for (var item : chiTiet) {
            SanPhamChiTiet sp = item.getSanPhamChiTiet();
            SanPham sanPham = sp.getSanPham();
            sanPham.setSoLuongTon(sanPham.getSoLuongTon() - item.getSoLuong());
            sanPham.setSoLuongDaBan(sanPham.getSoLuongDaBan() + item.getSoLuong());
            sp.setSoLuongDaBan(sp.getSoLuongDaBan() + item.getSoLuong());
            sp.setSoLuongTon(sp.getSoLuongTon() - item.getSoLuong());
            _sanPhamChiTietRepo.save(sp);
            _sanPhamRepo.save(sanPham);
        }
    }

    @Override
    public Boolean taoHoaDonTaiQuay(MuaTaiQuayRequest muaTaiQuayRequest) {
        HoaDon hoaDon = _hoaDonRepo.findById(muaTaiQuayRequest.getHoaDonId()).get();
        NguoiDung nguoiDung = _nguoiDungRepo.findById(muaTaiQuayRequest.getKhachHangId()).get();
        PhuongThucThanhToan phuongThucThanhToan = _phuongThucThanhToanRepo.findById(muaTaiQuayRequest.getPhuongThucThanhToan()).get();
        hoaDon.setPhuongThucThanhToan(phuongThucThanhToan);
        PhuongThucVanChuyen phuongThucVanChuyen = _phuongThucVanChuyenRepo.findById(muaTaiQuayRequest.getPhuongThucVanChuyen()).get();
        hoaDon.setPhuongThucVanChuyen(phuongThucVanChuyen);
        if (muaTaiQuayRequest.getIsCoDiaChiMoi()) {
            DiaChi diaChi = new DiaChi();
            diaChi.setChiTietDiaChi(muaTaiQuayRequest.getChiTietDiaChi());
            diaChi.setNgayTao(LocalDateTime.now());
            diaChi.setHuyenId(muaTaiQuayRequest.getHuyenId());
            diaChi.setHuyen(muaTaiQuayRequest.getHuyen());
            diaChi.setTinh(muaTaiQuayRequest.getTinhId());
            diaChi.setTinh(muaTaiQuayRequest.getTinh());
            diaChi.setXaId(muaTaiQuayRequest.getXaId());
            diaChi.setXa(muaTaiQuayRequest.getXa());
            diaChi.setNguoiDung(nguoiDung);
            diaChi.setLaDiaChiChinh(false);
            diaChi.setTrangThai(TrangThaiDiaChi.HOATDONG);
            diaChi.setSoDienThoai(muaTaiQuayRequest.getSoDienThoai());
            _diaChiRepo.save(diaChi);
            hoaDon.setTrangThai(TrangThaiHoaDon.CHOGIAOHANG);
            hoaDon.setDiaChiGiao(diaChi);
        } else {
            hoaDon.setTrangThai(TrangThaiHoaDon.DAGIAO);
        }

        hoaDon.setNguoiMua(nguoiDung);
        if (muaTaiQuayRequest.getPhuongThucVanChuyen() == 1) {
            hoaDon.setPhiGiaoHang(muaTaiQuayRequest.getPhiVanChuyen());
            hoaDon.setGiaTriHd(hoaDon.getGiaTriHd() + muaTaiQuayRequest.getPhiVanChuyen());
        }
        if (muaTaiQuayRequest.getPhuongThucVanChuyen() == 3) {
            hoaDon.setNgayGiao(LocalDateTime.now());
        }
        _hoaDonRepo.save(hoaDon);
        thayDoiSoLuongKhiConfirmHoaDon(hoaDon.getId());
        String thongbao = Template.hoaDonMoi(hoaDon);
        guiThongBaoChoNhanVien(thongbao);
        return true;
    }

    private void guiThongBaoChoNhanVien(String thongBao) {
//        List<NguoiDung> lst = _nguoiDungRepo.findAll().stream().filter(x -> {
//            for (var item : x.getQuyenNguoiDungList()) {
//                if (item.getQuyen().getId() == 3 || item.getQuyen().getId() == 2) {
//                    return true;
//                }
//            }
//            return false;
//        }).toList();
//        for (var item : lst) {
//            if (item.getEmail() != null) {
//                Email email = new Email();
//                email.sendContentHTML(item.getEmail(), "Hóa đơn mới", thongBao);
//            }
//        }
    }

    @Override
    public String[] taoHoaDonTaiQuayThanhToanVNPAY(MuaTaiQuayRequest muaTaiQuayRequest) {
        String[] res = new String[2];
        HoaDon hoaDon = _hoaDonRepo.findById(muaTaiQuayRequest.getHoaDonId()).get();
        NguoiDung nguoiDung = _nguoiDungRepo.findById(muaTaiQuayRequest.getKhachHangId()).get();
        PhuongThucThanhToan phuongThucThanhToan = _phuongThucThanhToanRepo.findById(muaTaiQuayRequest.getPhuongThucThanhToan()).get();
        hoaDon.setPhuongThucThanhToan(phuongThucThanhToan);
        PhuongThucVanChuyen phuongThucVanChuyen = _phuongThucVanChuyenRepo.findById(muaTaiQuayRequest.getPhuongThucVanChuyen()).get();
        hoaDon.setPhuongThucVanChuyen(phuongThucVanChuyen);
        if (!muaTaiQuayRequest.getKoDungDiaChi()) {
            if (muaTaiQuayRequest.getIsCoDiaChiMoi()) {
                DiaChi diaChi = new DiaChi();
                diaChi.setChiTietDiaChi(muaTaiQuayRequest.getChiTietDiaChi());
                diaChi.setNgayTao(LocalDateTime.now());
                diaChi.setHuyenId(muaTaiQuayRequest.getHuyenId());
                diaChi.setHuyen(muaTaiQuayRequest.getHuyen());
                diaChi.setTinh(muaTaiQuayRequest.getTinhId());
                diaChi.setTinh(muaTaiQuayRequest.getTinh());
                diaChi.setXaId(muaTaiQuayRequest.getXaId());
                diaChi.setXa(muaTaiQuayRequest.getXa());
                diaChi.setNguoiDung(nguoiDung);
                diaChi.setLaDiaChiChinh(false);
                diaChi.setTrangThai(TrangThaiDiaChi.HOATDONG);
                diaChi.setSoDienThoai(muaTaiQuayRequest.getSoDienThoai());
                _diaChiRepo.save(diaChi);
                hoaDon.setDiaChiGiao(diaChi);
            } else {
                DiaChi diaChi = _diaChiRepo.findById(muaTaiQuayRequest.getDiaChiId()).get();
                hoaDon.setDiaChiGiao(diaChi);

            }
        }
        hoaDon.setNguoiMua(nguoiDung);
        if (muaTaiQuayRequest.getPhuongThucVanChuyen() == 1) {
            hoaDon.setPhiGiaoHang(muaTaiQuayRequest.getPhiVanChuyen());
            hoaDon.setGiaTriHd(hoaDon.getGiaTriHd() + muaTaiQuayRequest.getPhiVanChuyen());
            hoaDon.setTrangThai(TrangThaiHoaDon.CHOGIAOHANG);
        }
        if (muaTaiQuayRequest.getPhuongThucVanChuyen() == 3) {
            hoaDon.setNgayGiao(LocalDateTime.now());
            hoaDon.setTrangThai(TrangThaiHoaDon.DAGIAO);
        }
        _hoaDonRepo.save(hoaDon);
        thayDoiSoLuongKhiConfirmHoaDon(hoaDon.getId());
        res[0] = hoaDon.getMaHoaDon();
        res[1] = String.valueOf(hoaDon.getGiaTriHd().intValue());
        return res;
    }

    private Long taoMoiNguoiDung(MuaTaiQuayRequest mua) {
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setEmail(mua.getEmail());
        nguoiDung.setTen(mua.getNguoiNhan());
        nguoiDung.setHo(mua.getHoNguoiNhan());
        nguoiDung.setDiem(0);
        nguoiDung.setGioiTinh(false);
        nguoiDung.setMatKhau(UUID.randomUUID().toString());
        nguoiDung.setNgayTao(LocalDateTime.now());
        nguoiDung.setTrangThai(TrangThaiNguoiDung.HOATDONG);
        nguoiDung.setRankKhachHang(_rankKhachRepo.findById(1l).get());
        _nguoiDungRepo.save(nguoiDung);
        nguoiDung.setMaNguoiDung("MEM" + nguoiDung.getId());
        _nguoiDungRepo.save(nguoiDung);
        return nguoiDung.getId();
    }

    @Override
    public TrangThaiQuetMa quetMa(String maSp, Long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        Optional<SanPhamChiTiet> sanPhamChiTiet = _sanPhamChiTietRepo.findSanPhamChiTietByMaSanPham(maSp);
        if (sanPhamChiTiet.isEmpty()) {
            return TrangThaiQuetMa.KHONGTONTAI;
        }
        if (sanPhamChiTiet.get().getSoLuongTon() == 0) {
            return TrangThaiQuetMa.HETHANG;
        }
        Optional<HoaDonChiTiet> a = _hoaDonChiTietRepo.findHoaDonChiTietByHoaDonAndSanPhamChiTiet(hoaDon, sanPhamChiTiet.get());
        if (!a.isEmpty()) {
            return TrangThaiQuetMa.DACO;
        }
        HoaDonChiTiet hoaDonNew = new HoaDonChiTiet();
        hoaDonNew.setHoaDon(hoaDon);
        hoaDonNew.setSoLuong(0);
        hoaDonNew.setSanPhamChiTiet(sanPhamChiTiet.get());
        hoaDonNew.setNgayTao(LocalDateTime.now());
        hoaDonNew.setDonGia(sanPhamChiTiet.get().getGiaBan());
        _hoaDonChiTietRepo.save(hoaDonNew);
        _hoaDonRepo.save(hoaDon);
        return TrangThaiQuetMa.THANHCONG;
    }

    @Override
    public String muaTaiQuay2(MuaTaiQuay2 muaTaiQuay2) throws UnsupportedEncodingException {
        HoaDon hoaDon = _hoaDonRepo.findById(muaTaiQuay2.getHoaDonId()).get();// nếu ko chọn địa chỉ thì cột địa chỉ trên HD là null
        hoaDon = setDiaChiChoHoaDon(hoaDon, muaTaiQuay2);
        hoaDon = setKhachHang(hoaDon, muaTaiQuay2.getKhachHangId());
        _hoaDonRepo.save(hoaDon);
        //Lấy tại cửa hàng
        if (muaTaiQuay2.getThanhToanBang() == 1) {
            if (muaTaiQuay2.getVoucherId() != null) {
                NguoiDung ng = _nguoiDungRepo.findById(muaTaiQuay2.getKhachHangId()).get();
                Voucher v = _voucherRepo.findById(muaTaiQuay2.getVoucherId()).get();
                List<NguoiDungVoucher> lst = _nguoiDungVoucherRepo.findNguoiDungVouchersByNguoiDungAndVoucher(ng, v)
                        .stream().filter(x -> x.getTrangThai() == TrangThaiNguoiDungVoucher.SUDUNG).collect(Collectors.toList());
                NguoiDungVoucher ndv = lst.get(0);
                hoaDon.setVoucherGiam(ndv);
                _nguoiDungVoucherRepo.save(ndv);
            }
            return vnpay(hoaDon, muaTaiQuay2);
        } else {
            if (muaTaiQuay2.getVoucherId() != null) {
                NguoiDung ng = _nguoiDungRepo.findById(muaTaiQuay2.getKhachHangId()).get();
                Voucher v = _voucherRepo.findById(muaTaiQuay2.getVoucherId()).get();
                List<NguoiDungVoucher> lst = _nguoiDungVoucherRepo.findNguoiDungVouchersByNguoiDungAndVoucher(ng, v)
                        .stream().filter(x -> x.getTrangThai() == TrangThaiNguoiDungVoucher.SUDUNG).collect(Collectors.toList());
                NguoiDungVoucher ndv = lst.get(0);
                ndv.setTrangThai(TrangThaiNguoiDungVoucher.DASUDUNG);
                hoaDon.setVoucherGiam(ndv);
                _nguoiDungVoucherRepo.save(ndv);
            }
            return tienMat(hoaDon, muaTaiQuay2);
        }
    }

    @Override
    public int doiTrangThaiHoaDonTaiQuay(String maHd, String trangThai) {
        var hoaDon = _hoaDonRepo.findHoaDonByMaHoaDon(maHd);
        if (!hoaDon.isPresent()) {
            return 0;
        }
        if (trangThai.equals("00")) {
            if (hoaDon.get().getVoucherGiam() != null) {
               NguoiDungVoucher ndv = hoaDon.get().getVoucherGiam();
               ndv.setTrangThai(TrangThaiNguoiDungVoucher.DASUDUNG);
                _nguoiDungVoucherRepo.save(ndv);
            }
            thayDoiSoLuongKhiConfirmHoaDon(hoaDon.get().getId());
            hoaDon.get().setNgayThanhToan(LocalDateTime.now());
            if (hoaDon.get().getPhuongThucVanChuyen().getId() == 1) {
                hoaDon.get().setTrangThai(TrangThaiHoaDon.CHOGIAOHANG);
            } else {
                hoaDon.get().setTrangThai(TrangThaiHoaDon.DAGIAO);
            }
            _hoaDonRepo.save(hoaDon.get());
            return 1;
        } else {
            hoaDon.get().setGhiChu("");
            _hoaDonRepo.save(hoaDon.get());
            return 0;
        }

    }


    private String tienMat(HoaDon hoaDon, MuaTaiQuay2 muaTaiQuay2) {
        hoaDon.setGhiChu(muaTaiQuay2.getGhiChu());
        hoaDon.setNgayCapNhat(LocalDateTime.now());
        hoaDon.setNgayThanhToan(LocalDateTime.now());
        PhuongThucThanhToan pttt = _phuongThucThanhToanRepo.findById(2l).get();
        hoaDon.setPhuongThucThanhToan(pttt);
        thayDoiSoLuongKhiConfirmHoaDon(hoaDon.getId());
        hoaDon.setNgayThanhToan(LocalDateTime.now());
        if (muaTaiQuay2.getTaoDiaChi() == 0) {
            hoaDon.setTrangThai(TrangThaiHoaDon.DAGIAO);
            hoaDon.setNgayGiao(LocalDateTime.now());
            _hoaDonRepo.save(hoaDon);
        } else {
            hoaDon.setTrangThai(TrangThaiHoaDon.CHOGIAOHANG);
            _hoaDonRepo.save(hoaDon);
        }
        return "OK";
    }

    private String vnpay(HoaDon hoaDon, MuaTaiQuay2 muaTaiQuay2) throws UnsupportedEncodingException {
        hoaDon.setPhuongThucThanhToan(_phuongThucThanhToanRepo.findById(1l).get());
        hoaDon.setGhiChu(muaTaiQuay2.getGhiChu());
        hoaDon.setNgayCapNhat(LocalDateTime.now());
        _hoaDonRepo.save(hoaDon);
        Long giaTri = (long) (hoaDon.getGiaTriHd() + (hoaDon.getPhiGiaoHang() == null ? 0 : hoaDon.getPhiGiaoHang()));
        if (hoaDon.getVoucherGiam() != null) {
            giaTri = giaTri - hoaDon.getVoucherGiam().getGiaTriGiam().longValue();
        }
        return taoLinkVnPay(hoaDon.getMaHoaDon(), giaTri);
    }


    //hàm này phụ trách set khách hàng
    private HoaDon setKhachHang(HoaDon hoaDon, Long khachHangId) {
        NguoiDung ng = _nguoiDungRepo.findById(khachHangId).get();
        hoaDon.setNguoiMua(ng);
        return hoaDon;
    }

    // hàm này phụ trách set địa chỉ cho hóa đơn
    private HoaDon setDiaChiChoHoaDon(HoaDon hoaDon, MuaTaiQuay2 muaTaiQuay2) {
        // nếu ko chọn địa chỉ thì cột địa chỉ trên HD là null
        Long diaChiId = null;
        if (muaTaiQuay2.getTaoDiaChi() == 1) {
            hoaDon.setPhuongThucVanChuyen(_phuongThucVanChuyenRepo.findById(1l).get());
            hoaDon.setDiaChiGiao(taoDiaChi(muaTaiQuay2));
            hoaDon.setPhiGiaoHang(muaTaiQuay2.getPhiGiaoHang());
            diaChiId = 0l;
        }
        if (muaTaiQuay2.getTaoDiaChi() == 2) {
            DiaChi diaChi = _diaChiRepo.findById(muaTaiQuay2.getDiaChiId()).get();
            hoaDon.setDiaChiGiao(diaChi);
            hoaDon.setPhiGiaoHang(muaTaiQuay2.getPhiGiaoHang());
            hoaDon.setPhuongThucVanChuyen(_phuongThucVanChuyenRepo.findById(1l).get());
            diaChiId = muaTaiQuay2.getDiaChiId();
        }
        if (diaChiId == null) {
            hoaDon.setPhuongThucVanChuyen(_phuongThucVanChuyenRepo.findById(3l).get());
            hoaDon.setPhiGiaoHang(0d);
            hoaDon.setNgayThanhToan(LocalDateTime.now());
            hoaDon.setNgayGiao(LocalDateTime.now());
        }
        return hoaDon;
    }

    private DiaChi taoDiaChi(MuaTaiQuay2 muaTaiQuay2) {
        NguoiDung ng = _nguoiDungRepo.findById(muaTaiQuay2.getKhachHangId()).get();
        DiaChiMoi diaChiMoi = muaTaiQuay2.getDiaChiMoi();
        DiaChi diaChi = new DiaChi(
                null,
                ng,
                diaChiMoi.getTen(),
                diaChiMoi.getHo(),
                diaChiMoi.getXaId(),
                diaChiMoi.getHuyenId(),
                diaChiMoi.getTinhId(),
                diaChiMoi.getXa(),
                diaChiMoi.getHuyen(),
                diaChiMoi.getTinh(),
                diaChiMoi.getChiTietDiaChi(),
                LocalDateTime.now(),
                null,
                diaChiMoi.getSoDienThoai(),
                false,
                TrangThaiDiaChi.HOATDONG,
                null
        );
        _diaChiRepo.save(diaChi);
        return diaChi;
    }

    private String taoLinkVnPay(String maHd, Long soTien) throws UnsupportedEncodingException {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_OrderInfo = "Mua " + LocalDateTime.now().getSecond();
        String orderType = "2000";
        String vnp_TxnRef = maHd;
        String vnp_IpAddr = "42.114.34.177";
        String vnp_TmnCode = "MXWCJ2KO";
        Long amount = soTien * 100;
        Map vnp_Params = new HashMap();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", "http://localhost:3000/admin/vnpaytrangthai");
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
        vnp_Params.put("vnp_Bill_Mobile", "0968491797");
        vnp_Params.put("vnp_Bill_Email", "do.quanganh99zz@gmail.com");
        String fullName = "Đỗ Quang Anh";
        if (fullName != null && !fullName.isEmpty()) {
            int idx = fullName.indexOf(' ');
            String firstName = fullName.substring(0, idx);
            String lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
            vnp_Params.put("vnp_Bill_FirstName", firstName);
            vnp_Params.put("vnp_Bill_LastName", lastName);
        }
        vnp_Params.put("vnp_Bill_Address", "Thái bình");
        vnp_Params.put("vnp_Bill_City", "Thái bình");
        vnp_Params.put("vnp_Bill_Country", "Thái bình");
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }
}

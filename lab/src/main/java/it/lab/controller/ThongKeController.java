package it.lab.controller;

import java.text.DateFormatSymbols;
import java.text.DecimalFormat;
import java.sql.Date;

import it.lab.iservice.IThongKeService;
import it.lab.modelcustom.request.NgayThang;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/thong-ke")
public class ThongKeController {

    @Autowired
    private ThongKeRankRepository repositoryRank;

    @Autowired
    private ThongKeRepository repositoryThongKe;

    @Autowired
    private ThongKeNguoiDungRepository repositoryNguoiDung;

    @Autowired
    private ThongKeHDCTRepository repositoryHDCT;

    @Autowired
    private QuyenNguoiDungRepo quyenNguoiDungRepo;

    @Autowired
    private SanPhamRepo sanPhamRepo;

    @Autowired
    private NhomSanPhamRepository nhomSanPhamRepository;
    @Autowired
    private IThongKeService _thongKeService;

    //thong ke tai khoan c rank
    @GetMapping("/rank")
    public List<Object[]> getTotalRevenueByUser() {
        return repositoryRank.findTotalRevenueByUser();
    }

    @RequestMapping(value = "/doanhsotrongngay", method = RequestMethod.GET)
    public ResponseEntity<?> layDoanhSoNgay() {
        return ResponseEntity.ok(_thongKeService.doanhThuTrongNgay());
    }

    @RequestMapping(value = "/thongkengay", method = RequestMethod.POST)
    public ResponseEntity<?> thongKeNgay(
            @RequestBody NgayThang ngayThang
    ) {
        System.out.println(ngayThang.getBatDau());
        System.out.println(ngayThang.getKetThuc());
        return ResponseEntity.ok("_thongKeService.doanhThuTrongNgay()");
    }

    @GetMapping("/thong-ke-thuoc-tinh")
    public Map<String, Object> layDuLieuDoanhThuThangVaNamHienTai() {
        Map<String, Object> result = new HashMap<>();

        // Lấy thời điểm hiện tại
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1); // Lấy thời điểm hiện tại và trừ đi 1 tháng

        Long tongSoLuongNhanVien = quyenNguoiDungRepo.tongSoNhanVien();
        result.put("tongSoLuongNhanVien", tongSoLuongNhanVien);

        Long tongSoLuongKhachHang = quyenNguoiDungRepo.tongSoKhachHang();
        result.put("tongSoLuongKhachHang", tongSoLuongKhachHang);

        Long tongSoLuongAdmin = quyenNguoiDungRepo.tongSoAdmin();
        result.put("tongSoLuongAdmin", tongSoLuongAdmin);

        Long tongSoLuongCRM = quyenNguoiDungRepo.tongSoCRM();
        result.put("tongSoLuongCRM", tongSoLuongCRM);

        // Thống kê tài khoản mới trong 1 tháng
        Long taiKhoanMoiThang = quyenNguoiDungRepo.countTaiKhoanMoiTrongThang123(oneMonthAgo);
        result.put("taiKhoanMoiThang", taiKhoanMoiThang);

        return result;
    }

    @GetMapping("/tai-khoan-doanh-thu-cao")
    public List<Object[]> getTop5DoanhThuCao() {
        PageRequest pageRequest = PageRequest.of(0, 5); // Get the first 5 results
        return repositoryThongKe.taiKhoanDoanhThuCaoNhat(pageRequest);
    }

    @GetMapping("/tai-khoan-doanh-thu-thap")
    public List<Object[]> getTop5DoanhThuThap() {
        PageRequest pageRequest = PageRequest.of(0, 5); // Get the first 5 results
        return repositoryThongKe.taiKhoanDoanhThuThap(pageRequest);
    }


    //Thong ke thanh pho mua nhieu
    @GetMapping("/thanh-pho-mua-nhieu-nhat")
    public List<Object[]> getTopThanhPhoMuaNhieu() {
        return repositoryThongKe.ThongKeThanhPhoMuaNhieu();
    }


    //Thông kê tổng tien trong ngay
    @GetMapping("/doanh-thu-ngay")
    public BigDecimal tinhTongDoanhThuTrongNgay(@RequestParam("selectedDate")
                                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate selectedDate) {
        return repositoryThongKe.tinhTongDoanhThuTrongNgay(selectedDate);
    }


    //Thong ke doanh thu thang
    @GetMapping("/tong-doanh-thu-trong-thang")
    public BigDecimal tinhTongDoanhThuTrongThang(@RequestParam("selectedDate") Date selectedDate) {
        return repositoryThongKe.tinhTongDoanhThuTrongThang(selectedDate);
    }

    //Thong ke doanh thu 1 nam
    @GetMapping("/tong-doanh-thu-trong-nam")
    public BigDecimal tinhTongDoanhThuTrongNam(@RequestParam("selectedDate") Date selectedDate) {
        return repositoryThongKe.tinhTongDoanhThuTrongNam(selectedDate);
    }

    //thong ke doanh thu theo khoang ngay

    @GetMapping("/tong-khoang-ngay")
    public BigDecimal tinhTongDoanhThuTrongKhoangNgay(
            @RequestParam(value = "selectedDateStart", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String selectedDateStart,
            @RequestParam(value = "selectedDateEnd", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String selectedDateEnd) {

        // Trim whitespace from date strings
        selectedDateStart = selectedDateStart.trim();
        selectedDateEnd = selectedDateEnd.trim();

        LocalDate startDate = LocalDate.parse(selectedDateStart, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate endDate = LocalDate.parse(selectedDateEnd, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

        return repositoryThongKe.tinhTongDoanhThuTrongKhoangNgay(startDateTime, endDateTime);
    }


    // thong ke 12 thang bang bieu do doanh thu tung thang-yyyy
    @GetMapping("/bieu-do")
    public List<BigDecimal> getBieuDoData() {
        int currentYear = YearMonth.now().getYear();
        List<BigDecimal> doanhThuTheoThang = new ArrayList<>();


        for (int month = 1; month <= 12; month++) {
            BigDecimal doanhThuThang = repositoryThongKe.tinhTongDoanhThuTrongThangChar(currentYear, month);
            doanhThuTheoThang.add(doanhThuThang);

        }
        return doanhThuTheoThang;
    }


    private static final String[] MONTH_NAMES = {
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    };

    @GetMapping("/bieu-do-tong-hop")
    public ResponseEntity<Map<Integer, Map<String, Map<String, BigDecimal>>>> calculateTotalProfitByYearAndMonth(
            @RequestParam(name = "startYear", required = false, defaultValue = "0") int startYear,
            @RequestParam(name = "endYear", required = false, defaultValue = "0") int endYear) {

        Map<Integer, Map<String, Map<String, BigDecimal>>> yearlyProfits = new HashMap<>();

        for (int year = startYear; year <= endYear; year++) {
            Map<String, Map<String, BigDecimal>> monthlyProfits = new LinkedHashMap<>();

            for (int month = 1; month <= 12; month++) {
                BigDecimal tongDoanhThu = repositoryThongKe.tinhTongDoanhThuTrongThang1(year, year, month);
                BigDecimal loiNhuanSauKhiTruChiPhi = repositoryHDCT.tinhTongDoanhThuNamSauKhiTruChiPhi(year, year, month);

                Map<String, BigDecimal> monthlyDetails = new HashMap<>();
                monthlyDetails.put("tongDoanhThu", tongDoanhThu);
                monthlyDetails.put("loiNhuanSauKhiTruChiPhi", loiNhuanSauKhiTruChiPhi);

                monthlyProfits.put(getMonthName(month), monthlyDetails);
            }

            yearlyProfits.put(year, monthlyProfits);
        }

        return ResponseEntity.ok(yearlyProfits);
    }

    // Sử dụng mảng trên trong phương thức getMonthName
    private String getMonthName(int month) {
        return MONTH_NAMES[month - 1];
    }


    //top san pham ban chay thang
    @GetMapping("/san-pham-ban-chay")
    public ResponseEntity<?> getSanPhamBanChayTrongThang(
            @RequestParam("selectedMonth") int selectedMonth,
            @RequestParam("selectedYear") int selectedYear) {
//    return repositoryHDCT.SanPhamBanChayTrongThang(selectedMonth, selectedYear);
        List<Object[]> topSellingProducts = repositoryHDCT.SanPhamBanChayTrongThang(selectedMonth, selectedYear);
        return new ResponseEntity<>(topSellingProducts, HttpStatus.OK);

    }

    @GetMapping("/san-pham-ban-chay1")
    public ResponseEntity<?> getSanPhamBanChayTrongThang(
            @RequestParam(name = "selectedMonth", required = false) Integer selectedMonth,
            @RequestParam(name = "selectedYear", required = false) Integer selectedYear) {

        // If selectedMonth or selectedYear is not provided, use the current month and year
        if (selectedMonth == null) {
            selectedMonth = LocalDate.now().getMonthValue();
        }

        if (selectedYear == null) {
            selectedYear = LocalDate.now().getYear();
        }

        List<Object[]> topSellingProducts = repositoryHDCT.SanPhamBanChayTrongThang(selectedMonth, selectedYear);
        return new ResponseEntity<>(topSellingProducts, HttpStatus.OK);
    }


    @GetMapping("/thong-ke-san-pham-tron")
    public Map<String, Object> layDuLieuBanDoTron() {
        Map<String, Object> result = new HashMap<>();

        //thong ke tong so luong bị lỗi
        Long TongSoLuongLoi = sanPhamRepo.sumSoluongloi();
        result.put("TongSoLuongLoi", TongSoLuongLoi);

        Long TongSoLuongTraHang = sanPhamRepo.sumSoTraHang();
        result.put("TongSoLuongTraHang", TongSoLuongTraHang);

        //thống kê sản phẩm bán được
        Integer soLuongBanDuoc = repositoryHDCT.getTongSoLuongBanDuoc();
        result.put("soLuongBanDuoc", soLuongBanDuoc);

        //thống kê cửa hàng có bao nhiêu nhân viên
        return result;
    }


    @GetMapping("/doanh-thu-ngay1")
    public BigDecimal tinhTongDoanhThuTrongNgay1(
            @RequestParam(value = "selectedDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate selectedDate) {

        // Nếu ngày không được truyền, sử dụng ngày hôm nay
        if (selectedDate == null) {
            selectedDate = LocalDate.now();
        }

        // Gọi phương thức xử lý doanh thu với ngày đã chọn hoặc ngày hôm nay
        return repositoryThongKe.tinhTongDoanhThuTrongNgay(selectedDate);
    }
//
//    @GetMapping("/tong-doanh-thu-trong-thang1")
//    public String tinhTongDoanhThuTrongThang1(
//            @RequestParam(value = "selectedDate", required = false)
//            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) YearMonth selectedYearMonth) {
//
//        // Nếu tháng không được truyền, sử dụng tháng hiện tại
//        if (selectedYearMonth == null) {
//            selectedYearMonth = YearMonth.now();
//        }
//
//        // Chuyển đổi YearMonth sang Date (chọn ngày đầu tháng)
//        LocalDate firstDayOfMonth = selectedYearMonth.atDay(1);
//        Date selectedDate = java.sql.Date.valueOf(firstDayOfMonth);
//
//        // Gọi phương thức xử lý doanh thu với tháng đã chọn hoặc tháng hiện tại
//        BigDecimal totalRevenue = repositoryThongKe.tinhTongDoanhThuTrongThang(selectedDate);
//
//        // Sử dụng DecimalFormat để định dạng số
//        DecimalFormat decimalFormat = new DecimalFormat("#,###");
//        String formattedValue = decimalFormat.format(totalRevenue);
//
//        return formattedValue;
//    }


    @GetMapping("/tong-doanh-thu-trong-thang1")
    public BigDecimal tinhTongDoanhThuTrongThang1(
            @RequestParam(value = "selectedDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) YearMonth selectedYearMonth) {

        // Nếu tháng không được truyền, sử dụng tháng hiện tại
        if (selectedYearMonth == null) {
            selectedYearMonth = YearMonth.now();
        }

        // Chuyển đổi YearMonth sang Date (chọn ngày đầu tháng)
        LocalDate firstDayOfMonth = selectedYearMonth.atDay(1);
        Date selectedDate = Date.valueOf(firstDayOfMonth);

        // Gọi phương thức xử lý doanh thu với tháng đã chọn hoặc tháng hiện tại
        return repositoryThongKe.tinhTongDoanhThuTrongThang(selectedDate);
    }

    @GetMapping("/soluongao")
    public List<Object[]> getThongKeAo() {
        return nhomSanPhamRepository.thongKeSoLuongAo();
    }


    @GetMapping("/khoang-ban-chay-nhat")
    public List<Object[]> TrongKhoangBanChay(
            @RequestParam(value = "selectedDateStart", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String selectedDateStart,
            @RequestParam(value = "selectedDateEnd", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String selectedDateEnd) {

        // Trim whitespace from date strings
        selectedDateStart = selectedDateStart.trim();
        selectedDateEnd = selectedDateEnd.trim();

        LocalDate startDate = LocalDate.parse(selectedDateStart, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate endDate = LocalDate.parse(selectedDateEnd, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

        return repositoryHDCT.SanPhamBanChayTrongThangTrongKhoang(startDateTime, endDateTime);
    }


}
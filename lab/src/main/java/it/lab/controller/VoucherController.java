package it.lab.controller;
//import java.util.UUID;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import it.lab.entity.Voucher;
import it.lab.enums.LoaiGiam;
import it.lab.enums.TrangThaiNguoiDungVoucher;
import it.lab.enums.TrangThaiVoucher;

import it.lab.repository.NguoiDungRepo;
import it.lab.repository.NguoiDungVoucherRepo;
import it.lab.repository.VoucherRepo;
import it.lab.service.VoucherNguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/voucher")
public class VoucherController {
    @Autowired
    VoucherRepo voucherRepo;

    @Autowired
    NguoiDungRepo nguoiDungRepo;

    @Autowired
    NguoiDungVoucherRepo nguoiDungVoucherRepo;


    @Autowired
    VoucherNguoiDungService voucherNguoiDungService;

//    @Scheduled(fixedRate = 600000) // 10 minutes = 10 * 60 * 1000 milliseconds
//    public void checkExpirationStatus() {
//        List<Voucher> vouchers = voucherRepo.findAll();
//        LocalDateTime currentDateTime = LocalDateTime.now(); // Change to LocalDateTime
//
//        for (Voucher voucher : vouchers) {
//            if (voucher.getNgayKetThuc().isBefore(currentDateTime)) {
//                // Set the status to NGUNG if ngayKetThuc is after or equal to currentDate
//                voucher.setTrangThai(TrangThaiVoucher.NGUNG);
//            }
//        }
//        // Save the updated vouchers
//        voucherRepo.saveAll(vouchers);
//    }

    // Endpoint to retrieve vouchers
//    @RequestMapping("/test")
//    public ResponseEntity<List<Voucher>> layDuLieu() throws IOException {
//        // Trigger the scheduled expiration check task
//        checkExpirationStatus();
//
//        // Return the vouchers
//        List<Voucher> vouchers = voucherRepo.findAll();
//        return ResponseEntity.ok(vouchers);
//    }
//


    //////
//    @Scheduled(fixedRate = 600000) // 10 minutes = 10 * 60 * 1000 milliseconds
//    public void checkExpirationStatusNguoiDung() {
//        List<NguoiDungVoucher> nguoiDungVouchers = nguoiDungVoucherRepo.findAll();
//        LocalDateTime currentDate = LocalDateTime.now();
//
//
//        for (NguoiDungVoucher nguoiDungVoucher : nguoiDungVouchers) {
//            if (nguoiDungVoucher.getHanSuDung().isBefore(currentDate)) {
//                nguoiDungVoucher.setTrangThai(TrangThaiNguoiDungVoucher.HETHAN);
//            }
//        }
//        // Save the updated vouchers only if modifications were made
//        nguoiDungVoucherRepo.saveAll(nguoiDungVouchers);
//
//    }

    @GetMapping(value = "/12323")
    public ResponseEntity<?> layDuLieu44() {
        try {
     //       checkExpirationStatusNguoiDung();
            List<NguoiDungVoucher> vouchers = nguoiDungVoucherRepo.findAll();
            return ResponseEntity.ok(vouchers);
        } catch (Exception e) {
            // Handle the exception appropriately, log it, or return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving data");
        }
    }


    @RequestMapping(value = "/123", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieu123() throws IOException {
        return ResponseEntity.ok(nguoiDungVoucherRepo.getAllTang());
    }


    @PostMapping(value = "/addVoucher")
    public Voucher create(@RequestBody Voucher voucher) {

        // Tạo một chuỗi random từ các ký tự số, chữ cái và ký tự đặc biệt
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomPart = new StringBuilder();
        Random random = new Random();
        int length = 8 + random.nextInt(3);  // Độ dài từ 8 đến 10 ký tự
        for (int i = 0; i < length; i++) {
            randomPart.append(characters.charAt(random.nextInt(characters.length())));
        }

        // Kết hợp với chuỗi thông thường

//        voucher.setMaVoucher("V" + System.currentTimeMillis());
//        voucher.setMaVoucher(UUID.randomUUID().toString());
        return voucherRepo.save(voucher);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Voucher> viewUpdate(@PathVariable("id") Long id) {
        Optional<Voucher> voucherOptional = voucherRepo.findById(id);

        if (voucherOptional.isPresent()) {
            Voucher voucher = voucherOptional.get();
            return new ResponseEntity<>(voucher, HttpStatus.OK);
        } else {
            // Handle the case where the voucher with the given ID is not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Voucher> update(@RequestBody Voucher newVoucher, @PathVariable Long id) {
        Optional<Voucher> OV = voucherRepo.findById(id);
        LocalDate currentDate = LocalDate.now();

        if (OV.isPresent()) {
            Voucher oldVoucher = OV.get();
            oldVoucher.setGiaTriGiam(newVoucher.getGiaTriGiam());
            oldVoucher.setSoLuong(newVoucher.getSoLuong());
            oldVoucher.setTenVoucher(newVoucher.getTenVoucher());
            voucherRepo.save(oldVoucher);

            return new ResponseEntity<>(oldVoucher, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Voucher> voucher = voucherRepo.findById(id);

        if (voucher.isPresent()) {
            Voucher existingVoucher = voucher.get();
            if (existingVoucher.getTrangThai() == TrangThaiVoucher.DIENRA) {
                existingVoucher.setTrangThai(TrangThaiVoucher.NGUNG);
                voucherRepo.save(existingVoucher);
                return new ResponseEntity<>(existingVoucher, HttpStatus.OK);
            } else {
                existingVoucher.setTrangThai(TrangThaiVoucher.DIENRA);
                voucherRepo.save(existingVoucher);
                return new ResponseEntity<>(existingVoucher, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>("Voucher not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/searchByName")
    public List<Voucher> searchByName(@RequestParam String tenVoucher) {
        return voucherRepo.searchByTen(tenVoucher);
    }

    //them voucher

    @GetMapping("/giftvoucher")
    public ResponseEntity<?> layGiftVoucher() throws IOException {
        return ResponseEntity.ok(nguoiDungRepo.getAllTangVoucher());
    }

    //
    @GetMapping("/voucher-combox")
    public ResponseEntity<List<Voucher>> getAllVouchers() {
        List<Voucher> vouchers = voucherRepo.getVouCherHD();
        return new ResponseEntity<>(vouchers, HttpStatus.OK);
    }

    // Endpoint to add a voucher for all users


    @PostMapping("/addVoucherForAllUsers")
    public ResponseEntity<?> addVoucherForAllUsers(
            @RequestParam(name = "voucherId", required = false) Long voucherId,
            @RequestParam(name = "userIdToExclude", required = false) Long userIdToExclude) {
        try {
            if (voucherId == null) {
                // If voucherId is not provided in the request, try to get it from the /voucher-combox endpoint
                ResponseEntity<List<Voucher>> voucherResponse = getAllVouchers();

                if (voucherResponse.getStatusCode() == HttpStatus.OK && !voucherResponse.getBody().isEmpty()) {
                    // Use the first voucher's ID
                    voucherId = voucherResponse.getBody().get(0).getId();
                    System.out.println("Received voucherId: " + voucherId);
                } else {
                    return new ResponseEntity<>("No vouchers available.", HttpStatus.BAD_REQUEST);
                }
            }

            // Now, you have the voucherId and userIdToExclude, proceed to add it for all users
            voucherNguoiDungService.themVoucherChoTatCaNguoiDung(voucherId, userIdToExclude);

            return new ResponseEntity<>("Voucher added for all users successfully. Voucher ID: " + voucherId, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add voucher for all users: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/add-nguoidung")
    public ResponseEntity<?> addVoucherForSelectedUsers(
            @RequestParam(name = "nguoiDungId", required = false) List<Long> nguoiDungIds,
            @RequestParam(name = "voucherId", required = false) Long voucherId,
            @RequestParam(name = "userIdToExclude", required = false) Long userIdToExclude) {
        try {
            if (nguoiDungIds == null || nguoiDungIds.isEmpty() || voucherId == null) {
                return new ResponseEntity<>("Please provide a voucher and at least one user.", HttpStatus.BAD_REQUEST);
            }

            voucherNguoiDungService.themVoucherChoNguoiDung(nguoiDungIds, voucherId, userIdToExclude);
            return new ResponseEntity<>("Voucher added for nguoidung.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add voucher for selected users: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}






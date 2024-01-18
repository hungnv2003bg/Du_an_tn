package it.lab.controller;

import com.google.gson.*;
import it.lab.dto.VoucherDTO;
import it.lab.entity.Voucher;
import it.lab.iservice.IVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.time.LocalDateTime;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/voucher2")
public class VoucherController2 {
    @Autowired
    private IVoucherService _voucherService;
    Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new JsonDeserializer<LocalDateTime>() {
        @Override
        public LocalDateTime deserialize(JsonElement json, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
            return LocalDateTime.parse(json.getAsJsonPrimitive().getAsString());
        }
    }).create();

    @GetMapping(value = "layhetvoucher")
    public ResponseEntity<?> layHetVoucher() {
        return ResponseEntity.ok(_voucherService.layVoucher());
    }

    @PostMapping(value = "themvoucher")
    public ResponseEntity<?> themVoucher(@RequestBody String voucher) {
        _voucherService.themVoucher(gson.fromJson(voucher, VoucherDTO.class));
        return ResponseEntity.ok("");
    }

    @PostMapping(value = "suavoucher")
    public ResponseEntity<?> suaVoucher(@RequestBody VoucherDTO voucher) {
        return ResponseEntity.ok(_voucherService.suaVoucher(voucher));
    }

    @GetMapping(value = "xoavoucher")
    public ResponseEntity<?> suaVoucher(@RequestParam Long voucherId) {
        _voucherService.xoaVoucher(voucherId);
        return ResponseEntity.ok("");
    }

    @GetMapping(value = "laydanhsachnguoidungcovoucher")
    public ResponseEntity<?> layDanhSachNguoiDungVoucher(@RequestParam Long voucherId) {
        return ResponseEntity.ok(_voucherService.layHetVoucherNguoiDung(voucherId));
    }

    @GetMapping(value = "themvoucherchonguoidung")
    public ResponseEntity<?> themVoucherChoNguoiDung(@RequestParam Long nguoiDungId,
                                                     @RequestParam Long voucherId,
                                                     @RequestParam Integer soLuong) {
        return ResponseEntity.ok(_voucherService.themVoucherChoNguoiDung(nguoiDungId, voucherId, soLuong));
    }

    @GetMapping(value = "themtoanhethong")
    public ResponseEntity<?> themToanHeThong(@RequestParam Long voucherId,
                                             @RequestParam Integer soLuong) {
        return ResponseEntity.ok(_voucherService.phatChoToanHeThong(voucherId, soLuong));
    }

    @GetMapping(value = "layvouchernguoidung")
    public ResponseEntity<?> themToanHeThong(@RequestParam Long nguoiDungId) {
        return ResponseEntity.ok(_voucherService.layHetVoucherSuDungCuaNguoiDung(nguoiDungId));
    }



    @GetMapping(value = "doivoucherhoadon")
    public ResponseEntity<?> doiHoaDonVoucher(@RequestParam Long hoaDonId,
                                              @RequestParam Long voucherId
    ) {
        _voucherService.doiVoucherHoaDon(hoaDonId, voucherId);
        return ResponseEntity.ok("");
    }
}

package it.lab.controller;

import com.google.gson.*;
import it.lab.iservice.ICRMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/crm")
public class CRMController {
    @Autowired
    private ICRMService _crmService;
    Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new JsonDeserializer<LocalDateTime>() {
        @Override
        public LocalDateTime deserialize(JsonElement json, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
            return LocalDateTime.parse(json.getAsJsonPrimitive().getAsString());
        }
    }).create();

    @RequestMapping(value = "/laydulieusanphamyeuthich", method = RequestMethod.GET)
    public ResponseEntity<?> layDuLieuSanPhamYeuThich(Long userId) {
        return ResponseEntity.ok(_crmService.getSanPhamYeuThichUser(userId));
    }

    @RequestMapping(value = "/laydoanhthu12thang", method = RequestMethod.GET)
    public ResponseEntity<?> layDoanhThu12Thang(
            @RequestParam Integer nam
    ) {
        return ResponseEntity.ok(_crmService.doanhThuTheo12Thang(nam));
    }


    @RequestMapping(value = "/laydoanhso10sanphamtop", method = RequestMethod.GET)
    public ResponseEntity<?> layDoanhSo10SanPhamTop(@RequestParam Integer nam) {
        return ResponseEntity.ok(_crmService.thongKeBan12Thang(nam));
    }

    @RequestMapping(value = "/laydoanhsochitiet", method = RequestMethod.GET)
    public ResponseEntity<?> layDoanhSoChiTiet(@RequestParam Long sanPhamId, @RequestParam Long truoc, @RequestParam Long sau) {
        return ResponseEntity.ok(_crmService.thongKeChiTietCuaSanPham(sanPhamId, truoc, sau));
    }
}

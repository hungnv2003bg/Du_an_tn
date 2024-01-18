package it.lab.service;

import it.lab.entity.Voucher;
import it.lab.enums.TrangThaiVoucher;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoucherService {
    @Autowired
    private VoucherRepo voucherRepo;

    public void changeStatus() {
        // Lấy tất cả sản phẩm
        List<Voucher> vouchers = voucherRepo.findAll();

        for (Voucher voucher : vouchers) {
            voucher.setTrangThai(TrangThaiVoucher.NGUNG); // Assuming you want to set the status to DIENRA
        }

        // Lưu các thay đổi vào cơ sở dữ liệu
        voucherRepo.saveAll(vouchers);
    }


}

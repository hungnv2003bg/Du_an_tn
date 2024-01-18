package it.lab.service;

import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import it.lab.entity.Voucher;
import it.lab.enums.TrangThaiNguoiDungVoucher;
import it.lab.enums.TrangThaiVoucher;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.NguoiDungVoucherRepo;
import it.lab.repository.VoucherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class VoucherNguoiDungService {
    @Autowired
    private NguoiDungVoucherRepo nguoiDungVoucherRepo;
    @Autowired
    private VoucherRepo voucherRepo;
    @Autowired
    private NguoiDungRepo nguoiDungRepo;

    public void themVoucherChoTatCaNguoiDung(Long voucherId, Long userIdToExclude) {
        // Get the voucher with the specified ID
        Voucher voucher = voucherRepo.findById(voucherId).orElse(null);

        if (voucher != null) {
            // Log the current quantity before decrementing
            System.out.println("Current voucher quantity: " + voucher.getSoLuong());

            // Giảm số lượng của voucher đi 1 nếu soLuong không phải là null và lớn hơn 0
            Integer soLuong = voucher.getSoLuong();
            if (soLuong != null && soLuong > 0) {
                // Iterate through all users and apply the voucher
                List<NguoiDung> allUsers = nguoiDungRepo.getAllTangVoucher();
                int usersAffected = 0;

                // Move the voucherRepo.save(voucher) outside the loop
                try {
                    for (NguoiDung nguoiDung : allUsers) {
                        if (nguoiDung.getId().equals(userIdToExclude)) {
                            // Exclude the specified user from voucher decrement
                            continue;
                        }

                        // Log the updated quantity before saving
                        System.out.println("Updated voucher quantity: " + voucher.getSoLuong());

                        // Tạo mối quan hệ giữa người dùng và voucher
                        NguoiDungVoucher nguoiDungVoucher = new NguoiDungVoucher();
                        nguoiDungVoucher.setNguoiDung(nguoiDung);
                        nguoiDungVoucher.setVoucher(voucher);
                        nguoiDungVoucher.setTrangThai(TrangThaiNguoiDungVoucher.SUDUNG);

                        // Set other properties from the voucher to nguoiDungVoucher
                        nguoiDungVoucher.setHanSuDung(voucher.getNgayKetThuc());
                        nguoiDungVoucher.setGiaTriGiam(voucher.getGiaTriGiam());

                        // Thêm voucher cho người dùng
                        nguoiDungVoucherRepo.save(nguoiDungVoucher);
                        usersAffected++;
                    }

                    // Save the updated voucher after decrementing the quantity
                    voucher.setSoLuong(soLuong - usersAffected);
                    voucherRepo.save(voucher);
                } catch (VoucherOutOfStockException e) {
                    // Handle the exception for a specific user (optional)
                    // You may want to log the error or take other actions for individual users
                }
            } else if (soLuong == 0) {
                voucher.setTrangThai(TrangThaiVoucher.NGUNG);
                voucherRepo.save(voucher);
                System.out.println("Voucher đã hết, chúc bạn may mắn lần sau !!! ");
                throw new VoucherOutOfStockException("Voucher đã hết, chúc bạn may mắn lần sau !!! ");
            }
        } else {
            System.out.println("Voucher không tồn tại");
        }
    }







    public void themVoucherChoNguoiDung(List<Long> nguoiDungIds, Long voucherId, Long userIdToExclude) {
        try {
            // Kiểm tra xem voucher có tồn tại không
            Voucher voucher = voucherRepo.findById(voucherId).orElse(null);

            if (voucher != null) {
                // Log the current quantity before decrementing
                System.out.println("Current voucher quantity: " + voucher.getSoLuong());

                // Giảm số lượng của voucher đi 1 nếu soLuong không phải là null và lớn hơn 0
                Integer soLuong = voucher.getSoLuong();
                if (soLuong != null && soLuong > 0) {
                    int usersAddedCount = 0; // Counter for the number of users for whom the voucher was added

                    // Tạo danh sách người dùng từ danh sách ID
                    List<NguoiDung> nguoiDungs = nguoiDungRepo.findAllById(nguoiDungIds);

                    // Thêm voucher cho từng người dùng
                    for (NguoiDung nguoiDung : nguoiDungs) {
                        // Exclude the specified user from voucher decrement
                        if (nguoiDung.getId().equals(userIdToExclude)) {
                            continue;
                        }

                        // Log the updated quantity before saving for each user
                        System.out.println("Updated voucher quantity for user " + nguoiDung.getId() + ": " + voucher.getSoLuong());

                        // Save the updated voucher after decrementing the quantity for each user
                        voucher.setSoLuong(soLuong - 1);
                        voucherRepo.save(voucher);

                        NguoiDungVoucher nguoiDungVoucher = new NguoiDungVoucher();
                        nguoiDungVoucher.setNguoiDung(nguoiDung);
                        nguoiDungVoucher.setVoucher(voucher);
                        nguoiDungVoucher.setTrangThai(TrangThaiNguoiDungVoucher.SUDUNG);

                        // Set other properties from the voucher to nguoiDungVoucher
                        nguoiDungVoucher.setHanSuDung(voucher.getNgayKetThuc());
                        nguoiDungVoucher.setGiaTriGiam(voucher.getGiaTriGiam());

                        nguoiDungVoucherRepo.save(nguoiDungVoucher);
                        usersAddedCount++;
                    }

                    // Log the total number of users for whom the voucher was added
                    System.out.println("Voucher added for " + usersAddedCount + " users.");

                } else if (soLuong == 0) {
                    voucher.setTrangThai(TrangThaiVoucher.NGUNG);
                    voucherRepo.save(voucher);
                    System.out.println("Voucher đã hết, chúc bạn may mắn lần sau !!! ");
                    throw new VoucherOutOfStockException("Voucher đã hết, chúc bạn may mắn lần sau !!! ");
                }
            } else {
                System.out.println("Voucher không tồn tại");
            }
        } catch (Exception e) {
            System.out.println("Failed to add voucher for selected users: " + e.getMessage());
        }
    }



    public class VoucherOutOfStockException extends RuntimeException {
        public VoucherOutOfStockException(String message) {
            super(message);
        }
    }

}

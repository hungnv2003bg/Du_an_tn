package it.lab.iservice;

import it.lab.dto.NguoiDungVoucherDTO;
import it.lab.dto.VoucherDTO;
import it.lab.entity.Voucher;
import it.lab.modelcustom.respon.NguoiDungVoucherSoLuong;

import java.util.List;

public interface IVoucherService {
    public void themVoucher(VoucherDTO voucher);

    public int suaVoucher(VoucherDTO voucher);

    public void xoaVoucher(Long voucherId);

    public List<VoucherDTO> layVoucher();

    public List<NguoiDungVoucherSoLuong> layHetVoucherNguoiDung(Long voucherId);

    public int themVoucherChoNguoiDung(Long nguoiDungId, Long voucherId, Integer soLuong);

    public int phatChoToanHeThong(Long voucherId, Integer soLuong);


    public List<VoucherDTO> layHetVoucherSuDungCuaNguoiDung(Long nguoiDungId);

    public void doiVoucherHoaDon(Long hoaDonId, Long voucherId);
}

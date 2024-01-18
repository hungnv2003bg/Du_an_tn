

// import MyComponent from './Example/MyComponent';
import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { useGioHangStore } from "../../../home/giohangthanhtoan/useGioHangStore";
import { fixMoney } from "../../../../extensions/fixMoney";
import { useChiTietHoaDonStore } from "./useChiTietHoaDonStore";
function ModalDoiVoucher({ hoaDonId, khachHang, fetData }) {
    const [isMaGiamShow, setIsMaGiamShow] = useState(false);
    const [listVoucher, setListVoucher] = useState(undefined);

    async function handleLayVoucher() {
        const data = await useGioHangStore.actions.layVoucherNguoiDung(khachHang.id)
        setListVoucher(data.data)
    }
    async function handleDoiVoucher(voucherId) {
        const data = await useChiTietHoaDonStore.actions.doiVoucherHoaDon({
            hoaDonId: hoaDonId,
            voucherId: voucherId
        })
        fetData()
    }
    useEffect(() => {
        handleLayVoucher()
    }, [])
    return (
        <>
            <h6>Voucher áp dụng   <span
                style={{
                    cursor: "pointer",
                    color: "blue",
                    fontSize: "14px",
                }}
                onClick={() => {
                    setIsMaGiamShow(true)
                }}
            >
                chọn voucher
            </span></h6>
            <Modal
                title="Chọn voucher"
                open={isMaGiamShow}
                onOk={() => {
                    setIsMaGiamShow(false);
                }}
                onCancel={() => {
                    setIsMaGiamShow(false);
                }}
                centered
            >
                {
                    listVoucher && listVoucher.map((item) => {
                        return <>

                            <div className="voucher" style={{
                                height: "60px",
                                borderRadius: "5px",
                                padding: "4px",
                                display: 'flex',
                                alignItems: "center",
                                flexDirection: "row",
                                marginBottom: "4px"
                            }}
                                onClick={() => {
                                    handleDoiVoucher(item.id)
                                    setIsMaGiamShow(false)
                                }}
                            >
                                <div>
                                    <img style={{
                                        height: "46px",
                                        width: "auto"
                                    }} src="https://routine.vn/media/logo/websites/1/logo-black-2x.png" alt="s" />
                                </div>
                                <div style={{
                                    marginLeft: "12px"
                                }}>
                                    <p style={{
                                        marginBottom: "2px",
                                        fontSize: "14px",
                                        fontWeight: 550
                                    }}>{item.tenVoucher + " - " + item.maVoucher}</p>
                                    <p style={{
                                        marginBottom: "0",
                                        color: "red"
                                    }}>{"-" + fixMoney(item.giaTriGiam)}</p>
                                </div>
                            </div>
                        </>
                    })
                }
            </Modal>

        </>
    );
}

export default ModalDoiVoucher;

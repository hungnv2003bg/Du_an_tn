

// import MyComponent from './Example/MyComponent';
import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { fixMoney } from "../../../extensions/fixMoney";
import { useGioHangStore } from "../../home/giohangthanhtoan/useGioHangStore";
function ModalChonVoucher({ maGiamGia, setMaGiamGia, khachHang }) {
    const [isMaGiamShow, setIsMaGiamShow] = useState(false);
    const [listVoucher, setListVoucher] = useState(undefined);

    async function handleLayVoucher() {
        const data = await useGioHangStore.actions.layVoucherNguoiDung(khachHang.khachHangId)
        setListVoucher(data.data)
    }
    useEffect(() => {
        if (khachHang.khachHangId) {
            handleLayVoucher()
        }
    }, [khachHang])
    return (
        <>
            <Input value={maGiamGia ? maGiamGia.maVoucher + " - " + fixMoney(maGiamGia.giaTriGiam) : "Nhấn để chọn!"} onClick={() => {
                setIsMaGiamShow(true)
            }} />
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
                                    setMaGiamGia(item)
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

export default ModalChonVoucher;

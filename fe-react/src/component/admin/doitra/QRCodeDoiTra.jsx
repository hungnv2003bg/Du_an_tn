// import MyComponent from './Example/MyComponent';
import { Modal, notification } from "antd";
import { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
import { useBanTaiQuayStore } from "../bantaiquay/useBanTaiQuayStore";
import { useDoiTra } from "./useDoiTra";
function QRCodeDoiTra({ setOpen, open, handleChonSanPham }) {
    const [api, contextHolder] = notification.useNotification();
    const [i, setI] = useState(false);
    const handleScan = (data) => {
        if (i) {
            return;
        }
        if (data) {
            quetMa(data.text);
            setI(true)
        }
    };

    const handleError = (err) => {
        console.error(err);
    };
    async function quetMa(result) {
        const data = await useDoiTra.actions.laySanPhamChiTietByMa(result);
        if (!data.data) {
            openNotification(
                "error",
                "Hệ thống",
                "Mã QR không hợp lệ",
                "bottomRight"
            );
            setTimeout(() => {
                setOpen(false);
            }, 1500);
            return
        }
        if (data.data.soLuongTon <= 0) {
            openNotification(
                "warning",
                "Hệ thống",
                "Sản phẩm đã hết hàng",
                "bottomRight"
            );
            setTimeout(() => {
                setOpen(false);
            }, 1500);
            return
        }

        handleChonSanPham(data.data)
        setTimeout(() => {
            setOpen(false);
        }, 1500);
        return
        // if (data.data === "DACO") {
        //     openNotification(
        //         "warning",
        //         "Hệ thống",
        //         "Đã có sản phẩm trong giỏ",
        //         "bottomRight"
        //     );
        // }

    }

    const openNotification = (type, title, des, placement) => {
        if (type === "error") {
            api.error({
                message: title,
                description: des,
                placement,
            });
        }
        if (type === "warning") {
            api.warning({
                message: title,
                description: des,
                placement,
            });
        }
        if (type === "success") {
            api.success({
                message: title,
                description: des,
                placement,
            });
        }
    };
    return (
        <>
            {contextHolder}
            <Modal
                cancelButtonProps={{ style: { display: "none" } }}
                title="Quét mã QR"
                open={open}
                onOk={() => {
                    setOpen(false);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                width={640}
            >
                <QrScanner
                    onScan={handleScan}
                    onError={handleError}
                    style={{ width: "100%" }}
                />
            </Modal>
        </>
    );
}

export default QRCodeDoiTra;

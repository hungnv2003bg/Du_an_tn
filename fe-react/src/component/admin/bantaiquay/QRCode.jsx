// import MyComponent from './Example/MyComponent';
import { Modal, notification } from "antd";
import { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
import { useBanTaiQuayStore } from "./useBanTaiQuayStore";
function QRCode({ setOpen, open, hoaDonId, setData }) {
  const [api, contextHolder] = notification.useNotification();
  const [i, setI] = useState(false);
  const handleScan = (data) => {
    if (i) {
      return;
    }
    if (data) {
      quetMa(data.text);
      setI(true);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  async function quetMa(result) {
    const data = await useBanTaiQuayStore.actions.quetMa({
      maSp: result,
      hoaDonId: hoaDonId,
    });
    if (data.data === "HETHANG") {
      openNotification(
        "warning",
        "Hệ thống",
        "Sản phẩm đã hết hàng",
        "bottomRight"
      );
    }
    if (data.data === "THANHCONG") {
      openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
      setData();
    }
    if (data.data === "DACO") {
      openNotification(
        "warning",
        "Hệ thống",
        "Đã có sản phẩm trong giỏ",
        "bottomRight"
      );
    }
    if (data.data === "KHONGTONTAI") {
      openNotification(
        "error",
        "Hệ thống",
        "Mã QR không hợp lệ",
        "bottomRight"
      );
    }
    setTimeout(() => {
      setOpen(false);
    }, 1500);
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

export default QRCode;

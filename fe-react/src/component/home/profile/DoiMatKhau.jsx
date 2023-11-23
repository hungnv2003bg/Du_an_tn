import { Button, Col, Radio, Row, notification } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useParams } from "react-router-dom";
import { selectLanguage } from "../../../language/selectLanguage";
import { useSelector } from "react-redux";

function DoiMatKhau() {
  const language = useSelector(selectLanguage);
  const [matKhau, setMatKhau] = useState({
    matKhauCu: "",
    matKhauMoi: "",
    xacNhanMatKhau: "",
  });
  const param = useParams();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, title, des, placement) => {
    if (type === "error") {
      api.error({
        message: title,
        description: des,
        placement,
      });
    } else {
      api.success({
        message: title,
        description: des,
        placement,
      });
    }
  };
  const onChangeMatKhauCu = (e) => {
    setMatKhau({
      ...matKhau,
      matKhauCu: e.target.value,
    });
  };
  const onChangeMatKhauMoi = (e) => {
    setMatKhau({
      ...matKhau,
      matKhauMoi: e.target.value,
    });
  };
  const onChangeXacNhan = (e) => {
    setMatKhau({
      ...matKhau,
      xacNhanMatKhau: e.target.value,
    });
  };
  async function handleCapNhatThongTin() {
    if (matKhau.matKhauCu.length < 1) {
      openNotification(
        "error",
        language.systemNotification.system,
        "Vui lòng nhập mật khẩu",
        "bottomRight"
      );
      return;
    }
    if (matKhau.matKhauMoi.length < 8) {
      openNotification(
        "error",
        language.systemNotification.system,
        "Mật khẩu quá ngắn",
        "bottomRight"
      );
      return;
    }
    if (matKhau.matKhauMoi != matKhau.xacNhanMatKhau) {
      openNotification(
        "error",
        language.systemNotification.system,
        "Mật khẩu xác nhận không đúng",
        "bottomRight"
      );
      return;
    }
    const data = await useNguoiDungStore.actions.doiMatKhau({
      nguoiDungId: param.id,
      matKhauCu: matKhau.matKhauCu,
      matKhauMoi: matKhau.matKhauMoi,
    });
    if (data.data.status == "THANHCONG") {
      openNotification(
        "suscess",
        language.systemNotification.system,
        "Đổi mật khẩu thành công",
        "bottomRight"
      );
      setMatKhau({
        matKhauCu: "",
        matKhauMoi: "",
        xacNhanMatKhau: "",
      });
    }
    if (data.data.status == "THATBAI") {
      openNotification(
        "error",
        language.systemNotification.system,
        "Đổi mật khẩu thành thất bại",
        "bottomRight"
      );
    }
    if (data.data.status == "MATKHAUCUSAI") {
      openNotification(
        "error",
        language.systemNotification.system,
        "Mật khẩu hiện tại không đúng",
        "bottomRight"
      );
    }
  }
  return (
    <>
      {contextHolder}

      <h4
        style={{
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: "20px",
          marginBottom: "4px",
        }}
      >
        Đổi mật khẩu
      </h4>
      <p
        style={{
          marginBottom: "12px",
          fontWeight: 400,
          fontSize: "15px",
          fontStyle: "normal",
        }}
      >
        Bạn có thể đổi mật khẩu tài khoản ở đây
      </p>
      <Row>
        <Col span={13}>
          <p>
            Mật khẩu cũ
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </p>
          <input
            onChange={onChangeMatKhauCu}
            value={matKhau.matKhauCu}
            type="password"
            className="input-profile"
          />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "12px",
        }}
      >
        <Col span={13}>
          <p>
            Mật khẩu mới
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </p>
          <input
            onChange={onChangeMatKhauMoi}
            value={matKhau.matKhauMoi}
            type="password"
            className="input-profile"
          />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "12px",
        }}
      >
        <Col span={13}>
          <p>
            Xác nhận mật khẩu
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </p>
          <input
            onChange={onChangeXacNhan}
            value={matKhau.xacNhanMatKhau}
            type="password"
            className="input-profile"
          />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "12px",
        }}
      >
        <Col span={4}>
          <Button onClick={handleCapNhatThongTin} type="primary">
            Đổi mật khẩu
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default DoiMatKhau;

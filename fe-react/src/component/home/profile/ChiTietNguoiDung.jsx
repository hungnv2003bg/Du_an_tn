import { Button, Col, Radio, Row, Upload, message, notification } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useParams } from "react-router-dom";
import { selectLanguage } from "../../../language/selectLanguage";
import { useSelector } from "react-redux";

import { UploadOutlined } from "@ant-design/icons";
function ChiTietNguoiDung({ user }) {
  const language = useSelector(selectLanguage);
  const [nguoiDung, setNguoiDung] = useState(undefined);
  const [dungHinhAnh, setDungHinhAnh] = useState(false);
  const [hinhAnh, setHinhAnh] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const param = useParams();
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const props = {
    name: "file",
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Vui lòng chọn file PNG/JPEG!");
      setDungHinhAnh(false);
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Hình ảnh nhỏ hơn 2MB!");
      setDungHinhAnh(false);
      return;
    }
    getBase64(file, (url) => {
      setImageUrl(url);
    });
    setHinhAnh(file);
    setDungHinhAnh(true);
  };
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
  useEffect(() => {
    async function getNguoiDung() {
      const data = await useNguoiDungStore.actions.layThongTinNguoiDung(
        param.id ? param.id : -1
      );
      setNguoiDung(data.data);
    }
    getNguoiDung();
  }, []);
  const onChangeGioiTinh = (e) => {
    setNguoiDung({
      ...nguoiDung,
      gioiTinh: e.target.value === 1 ? true : false,
    });
  };
  const onChangeTen = (e) => {
    setNguoiDung({
      ...nguoiDung,
      ten: e.target.value,
    });
  };
  const onChangeHo = (e) => {
    setNguoiDung({
      ...nguoiDung,
      ho: e.target.value,
    });
  };
  async function handleCapNhatThongTin() {
    var form = new FormData();
    if (hinhAnh) {
      form.append("anhDaiDien", hinhAnh);
    }
    form.append("data", JSON.stringify(nguoiDung));
    const data = await useNguoiDungStore.actions.capNhatThongTin(form);
    if (data.data.status == "THANHCONG") {
      openNotification(
        "suscess",
        language.systemNotification.system,
        "Cập nhật dữ liệu cá nhân thành công",
        "bottomRight"
      );
    } else {
      openNotification(
        "error",
        language.systemNotification.system,
        "Cập nhật dữ liệu cá nhân thất bại!",
        "bottomRight"
      );
    }
  }
  return (
    <>
      {contextHolder}
      {nguoiDung ? (
        <>
          <h4
            style={{
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
              marginBottom: "4px",
            }}
          >
            Thông tin cá nhân
          </h4>
          <p
            style={{
              marginBottom: "12px",
              fontWeight: 400,
              fontSize: "15px",
              fontStyle: "normal",
            }}
          >
            Bạn có thể cập nhật thông tin của mình ở trang này
          </p>
          <Row
            style={{
              marginBottom: "12px",
            }}
          >
            <Col span={6}>
              {!dungHinhAnh ? (
                <img
                  src={nguoiDung && nguoiDung.anhDaiDien}
                  alt="avatar"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <Upload beforeUpload={beforeUpload} {...props} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <p>
                Họ
                <span
                  style={{
                    color: "red",
                  }}
                >
                  *
                </span>
              </p>
              <input
                onChange={onChangeHo}
                value={nguoiDung.ho}
                type="text"
                className="input-profile"
              />
            </Col>
            <Col span={1}></Col>
            <Col span={6}>
              <p>
                Tên
                <span
                  style={{
                    color: "red",
                  }}
                >
                  *
                </span>
              </p>
              <input
                onChange={onChangeTen}
                value={nguoiDung.ten}
                type="text"
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
                Email
                <span
                  style={{
                    color: "red",
                  }}
                >
                  *
                </span>
              </p>
              <input
                disabled
                value={nguoiDung.email}
                type="text"
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
                SĐT
                <span
                  style={{
                    color: "red",
                  }}
                >
                  *
                </span>
              </p>
              <input
                value={nguoiDung.soDienThoai}
                onChange={(e) => {
                  setNguoiDung({
                    ...nguoiDung,
                    soDienThoai: e.target.value,
                  });
                }}
                type="text"
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
              <p>Giới tính</p>
              <Radio.Group
                onChange={onChangeGioiTinh}
                value={nguoiDung.gioiTinh ? 1 : 2}
              >
                <Radio value={1}>Nam</Radio>
                <Radio value={2}>Nữ</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "12px",
            }}
          >
            <Col span={4}>
              <Button onClick={handleCapNhatThongTin} type="primary">
                Cập nhật
              </Button>
            </Col>
            <Col span={4}>
              <Button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location = "http://localhost:3000/";
                }}
              >
                Đăng xuất
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ChiTietNguoiDung;

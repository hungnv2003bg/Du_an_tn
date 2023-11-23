import { Button, Col, Radio, Row, notification } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useParams } from "react-router-dom";
import { selectLanguage } from "../../../language/selectLanguage";
import { useSelector } from "react-redux";

function ChiTietNguoiDung({ user }) {
  const language = useSelector(selectLanguage);
  const [nguoiDung, setNguoiDung] = useState(undefined);
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
      gioiTinh: e.target.value,
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
    const data = await useNguoiDungStore.actions.capNhatThongTin(nguoiDung);
    console.log(data);
    if (data.data.status == "THANHCONG") {
      openNotification(
        "suscess",
        language.systemNotification.system,
        "Cập nhật dự liệu cá nhân thành công",
        "bottomRight"
      );
    } else {
      openNotification(
        "error",
        language.systemNotification.system,
        "Cập nhật dự liệu cá nhân thất bại!",
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
                disabled
                value={nguoiDung.soDienThoai}
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
            <Col span={13}>
              <p>Xếp hạng</p>
              <p
                style={{
                  fontWeight: 700,
                }}
              >
                {nguoiDung.rankKhachHang.tenRank}
              </p>
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
          </Row>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ChiTietNguoiDung;

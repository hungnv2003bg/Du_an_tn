import { Button, Col, Divider, Radio, Row, Tag, notification } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useParams } from "react-router-dom";
import { selectLanguage } from "../../../language/selectLanguage";
import { useSelector } from "react-redux";
import { fixNgayThang } from "../../../extensions/fixNgayThang";
import ModalThemDiaChi from "./ModalThemDiaChi";
import ModalSuaDiaChi from "./ModalSuaDiaChi";

function DiaChiNhanHang() {
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
  const [diaChi, setDiaChi] = useState(undefined);
  async function handleLayDiaChi() {
    const data = await useNguoiDungStore.actions.layDiaChiNguoiDung(param.id);
    setDiaChi(data.data);
  }
  useEffect(() => {
    handleLayDiaChi();
  }, []);
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
        Địa chỉ nhận hàng
      </h4>
      <ModalThemDiaChi fetData={handleLayDiaChi} idNguoiDung={param.id} />
      <Divider />
      {diaChi &&
        diaChi.map((item) => {
          return (
            <>
              <Row>
                <Col span={24}>
                  <p>
                    {item.hoNguoiNhan + " " + item.nguoiNhan + " "}|{" "}
                    {item.soDienThoai}
                  </p>
                </Col>
                <Col span={24}>
                  <p>{item.chiTietDiaChi}</p>
                </Col>
                <Col span={24}>
                  <p>{item.xa + ", " + item.huyen + ", " + item.tinh}</p>
                </Col>
                <Col span={24}>
                  <Tag color="#2db7f5">{fixNgayThang(item.ngayTao)}</Tag>
                  <ModalSuaDiaChi fetData={handleLayDiaChi} data2={item} />
                </Col>
              </Row>
              <Divider />
            </>
          );
        })}
    </>
  );
}

export default DiaChiNhanHang;

import { selectLanguage } from "../../../../language/selectLanguage";
import "./style.css";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GrChapterAdd } from "react-icons/gr";
import { useChiTietHoaDonStore } from "./useChiTietHoaDonStore";
function AddSanPham({ id, hoaDonId, setData, record, fetData }) {
  const language = useSelector(selectLanguage);
  const [soLuong, setSoLuong] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
  const onChange = (value) => {
    if (!value) {
      return;
    }
    if (isNaN(value)) {
      return;
    }
    setSoLuong(value);
  };
  async function handleThem() {
    if (soLuong == 0) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập số lượng",
        "bottomRight"
      );
      return;
    }
    if (soLuong > record.soLuongTon) {
      openNotification(
        "error",
        "Hệ thống",
        "Sản phẩm không đủ số lượng",
        "bottomRight"
      );
      return;
    }
    await useChiTietHoaDonStore.actions.themSpHoaDon({
      hoaDonId: hoaDonId,
      spChiTietId: id,
      soLuong: soLuong,
    });
    openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
    setData();
    //  fetData()
    setIsModalOpen(false);
  }
  return (
    <>
      {contextHolder}
      <div
        style={{
          marginLeft: "4px",
          marginRight: "4px",
        }}
      >
        <Tooltip title="Thêm sản phẩm" onClick={showModal}>
          <Button
            style={{
              color: "green",
            }}
            shape="circle"
            icon={<GrChapterAdd />}
          />
        </Tooltip>
        <Modal
          title="Số lượng sản phẩm cần thêm"
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={handleThem}
          centered
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            min={1}
            max={record.soLuongTon}
            value={soLuong}
            onChange={onChange}
          />
        </Modal>
      </div>
    </>
  );
}

export default AddSanPham;

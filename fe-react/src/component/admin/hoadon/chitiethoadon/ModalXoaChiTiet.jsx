import "./style.css";
import { Button, Modal, Tooltip, notification } from "antd";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useChiTietHoaDonStore } from "./useChiTietHoaDonStore";
function ModalXoaChiTiet({ id, fetData, fetHoaDon }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleXoaChatLieu();
    fetHoaDon()
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
  async function handleXoaChatLieu() {
    const data = await useChiTietHoaDonStore.actions.xoaHoaDonChiTiet(id);
    openNotification("success", "Hệ thống", "Xóa thành công", "bottomRight");
    fetData();
    setIsModalOpen(false);
  }
  return (
    <>
      {contextHolder}
      <Tooltip title="Xóa" onClick={showModal}>
        <Button danger shape="circle" icon={<AiOutlineDelete />} />
      </Tooltip>
      <Modal
        title="Xóa sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        centered
      ></Modal>
    </>
  );
}

export default ModalXoaChiTiet;

import { selectLanguage } from "../../../../language/selectLanguage";
import "./style.css";
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Tooltip,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useChatLieuStore } from "./useChatLieuStore";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
function ModalXoa({ id, setData }) {
  const language = useSelector(selectLanguage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleXoaChatLieu();
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
    const data = await useChatLieuStore.actions.xoaChatLieuById(id);
    openNotification("success", "Hệ thống", "Xóa thành công", "bottomRight");
    setData(data.data.data);
    setIsModalOpen(false);
  }
  return (
    <>
      {contextHolder}
      <Tooltip title="Xóa" onClick={showModal}>
        <Button danger shape="circle" icon={<AiOutlineDelete />} />
      </Tooltip>
      <Modal
        title="Xóa chất liệu"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        centered
      ></Modal>
    </>
  );
}

export default ModalXoa;

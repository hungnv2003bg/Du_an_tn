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
import { useNhomSanPhamStore } from "./useNhomSanPhamStore";
import { useSelector } from "react-redux";
import { IoEyeSharp } from "react-icons/io5";
function ModalView({ id }) {
  const language = useSelector(selectLanguage);
  const [chatLieu, setChatLieu] = useState({
    id: id,
    tenNhom: "",
    ngayTao: "",
    ngayCapNhat: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    async function layDuLieu() {
      const data = await useNhomSanPhamStore.actions.layChatLieuById(id);
      setChatLieu(data.data);
    }
    if (isModalOpen) {
      layDuLieu();
    }
  }, [isModalOpen]);
  return (
    <>
      <Tooltip title="Cập nhật" onClick={showModal}>
        <Button
          style={{
            color: "blue",
          }}
          shape="circle"
          icon={<IoEyeSharp />}
        />
      </Tooltip>
      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        title="Thiết kế"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
      >
        <Form
          name="wrap"
          labelCol={{
            flex: "110px",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Mã thiết kế"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.maThietKe} />
          </Form.Item>
          <Form.Item
            label="Tên thiết kế"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.tenThietKe} />
          </Form.Item>
          <Form.Item
            label="Ngày tạo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.ngayTao} />
          </Form.Item>
          <Form.Item label="Ngày cập nhật">
            <Input disabled value={chatLieu.ngayCapNhat} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalView;

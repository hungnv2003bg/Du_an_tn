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
import { IoEyeSharp } from "react-icons/io5";
function ModalView({ id }) {
  const language = useSelector(selectLanguage);
  const [chatLieu, setChatLieu] = useState({
    id: id,
    tenChatLieu: "",
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
      const data = await useChatLieuStore.actions.layChatLieuById(id);
      setChatLieu(data.data);
    }
    if (isModalOpen) {
      layDuLieu();
    }
  }, [isModalOpen]);
  return (
    <>
      <Tooltip title="Xem" onClick={showModal}>
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
        title="Chất liệu"
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
            label="Mã chất liệu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.maChatLieu} />
          </Form.Item>
          <Form.Item
            label="Tên chất liệu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.tenChatLieu} />
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

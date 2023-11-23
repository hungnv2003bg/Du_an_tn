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
import { FaRegPenToSquare } from "react-icons/fa6";
function ModalCapNhat({ id, setData }) {
  const language = useSelector(selectLanguage);
  const [chatLieu, setChatLieu] = useState({
    id: id,
    tenChatLieu: "",
  });
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
  async function handleSuaChatLieu() {
    if (chatLieu.tenChatLieu == "") {
      return;
    }
    const data = await useChatLieuStore.actions.suaChatLieu(chatLieu);
    openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");
    setChatLieu({
      ...chatLieu,
      tenChatLieu: "",
    });
    setData(data.data.data);
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
        <Tooltip title="Cập nhật" onClick={showModal}>
          <Button
            style={{
              color: "green",
            }}
            shape="circle"
            icon={<FaRegPenToSquare />}
          />
        </Tooltip>
        <Modal
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          title="Sửa chất liệu"
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
              label="Tên chất liệu"
              name="Tên chất liệu"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setChatLieu({
                    ...chatLieu,
                    tenChatLieu: e.target.value,
                  });
                }}
                value={chatLieu.tenChatLieu}
              />
            </Form.Item>
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSuaChatLieu}
              >
                Sửa
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default ModalCapNhat;

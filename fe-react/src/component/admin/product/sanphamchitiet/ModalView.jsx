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
    mauSac: {},
    kichThuoc: {},
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
      <Tooltip title="Chi tiết" onClick={showModal}>
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
            label="Màu sắc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.mauSac.tenMau} />
          </Form.Item>
          <Form.Item
            label="Kích thước"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.kichThuoc.tenKichThuoc} />
          </Form.Item>
          <Form.Item
            label="Số lượng tồn"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.soLuongTon} />
          </Form.Item>
          <Form.Item
            label="Số lượng lỗi"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.soLuongLoi} />
          </Form.Item>
          <Form.Item
            label="Số lượng trả hàng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={chatLieu.soLuongTraHang} />
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
            <Input disabled value={chatLieu.ngayCapNhat ? chatLieu.ngayCapNhat : "Mới"} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalView;

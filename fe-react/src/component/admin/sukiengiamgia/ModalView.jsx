import { selectLanguage } from "../../../language/selectLanguage";
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
import { useSuKienGiamGiaStore } from "./useSuKienGiamGiaStore";
import { useSelector } from "react-redux";
import { IoEyeSharp } from "react-icons/io5";
function ModalView({ id }) {
  const language = useSelector(selectLanguage);
  const [suKienGiamGia, setSuKienGiamGia] = useState({
    id: id,
    tenSuKien: "",
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
      const data = await useSuKienGiamGiaStore.actions.laySuKienGiamGiaById(id);
      setSuKienGiamGia(data.data);
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
        title="Sự kiện giảm giá"
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
            label="Tên sự kiện"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={suKienGiamGia.tenSuKien} />
          </Form.Item>
          <Form.Item label="Logo sự kiện" >
            <img
              src={suKienGiamGia.logoSuKien} 
              style={{ width: '30%', height: '30%' }} 
            />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={suKienGiamGia.ngayBatDau} />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={suKienGiamGia.ngayKetThuc} />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input disabled value={suKienGiamGia.moTa} />
          </Form.Item>
          <Form.Item label="Trạng thái">
            <Input disabled value={suKienGiamGia.trangThai} />
          </Form.Item>
          <Form.Item label="Ngày tạo">
            <Input disabled value={suKienGiamGia.ngayTao} />
          </Form.Item>
          <Form.Item label="Ngày cập nhật">
            <Input disabled value={suKienGiamGia.ngayCapNhat} />
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
}

export default ModalView;

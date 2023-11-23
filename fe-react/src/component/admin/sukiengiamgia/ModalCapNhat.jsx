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
import { FaRegPenToSquare } from "react-icons/fa6";
function ModalCapNhat({ id, setData }) {
  const language = useSelector(selectLanguage);
  const [suKienGiamGia, setSuKienGiamGia] = useState({
    id: id,
    tenSuKien: "",
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
  async function handleSuaSuKienGiamGia() {
    if (suKienGiamGia.tenSuKien && suKienGiamGia.moTa && suKienGiamGia.ngayKetThuc && suKienGiamGia.trangThai && suKienGiamGia.logoSuKien ) {
      return;
    }
    const data = await useSuKienGiamGiaStore.actions.suaSuKienGiamGia(suKienGiamGia);
    openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");
    setSuKienGiamGia({
      ...suKienGiamGia,
      tenSuKien: "",
      moTa: "",
      ngayKetThuc: "",
      ngayBatDau:"2023-10-10",
      trangThai: "",
      logoSuKien:""

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
          title="Sửa sự kiện giảm giá"
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
              name="Tên sự kiện"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setSuKienGiamGia({
                    ...suKienGiamGia,
                    tenSuKien: e.target.value,
                  });
                }}
                value={suKienGiamGia.tenSuKien}
              />
            </Form.Item>
            <Form.Item
              label="Logo sự kiện"
              name="Logo sự kiện"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setSuKienGiamGia({
                    ...suKienGiamGia,
                    logoSukien: e.target.value,
                  });
                }}
                value={suKienGiamGia.logoSukien}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="Mô tả"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setSuKienGiamGia({
                    ...suKienGiamGia,
                    moTa: e.target.value,
                  });
                }}
                value={suKienGiamGia.moTa}
              />
            </Form.Item>
            <Form.Item
              label="Ngày kết thúc"
              name="Ngày kết thúc"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setSuKienGiamGia({
                    ...suKienGiamGia,
                    ngayKetThuc: e.target.value,
                  });
                }}
                value={suKienGiamGia.ngayKetThuc}
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="Trạng thái"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setSuKienGiamGia({
                    ...suKienGiamGia,
                    trangThai: e.target.value,
                  });
                }}
                value={suKienGiamGia.trangThai}
              />
            </Form.Item>
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSuaSuKienGiamGia}
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

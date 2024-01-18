import "./style.css";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Tooltip,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useGHN } from "../../../plugins/ghnapi";
import { checkEmpty } from "../../../extensions/checkEmpty";
import { useNguoiDungStore } from "./useNguoiDungStore";
function ModalSuaDiaChi({ fetData, data2 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
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
  const [diaChiMoi, setDiaChiMoi] = useState(data2);
  const [danhSachTinh, setDanhSachTinh] = useState(undefined);
  const [danhSachHuyen, setDanhSachHuyen] = useState(undefined);
  const [danhSachXa, setDanhSachXa] = useState(undefined);
  async function handleLayTinh() {
    const data = await useGHN.actions.layTinh();
    setDanhSachTinh(data.data.data);
  }
  async function handleChonHuyen(e) {
    setDiaChiMoi({
      ...diaChiMoi,
      tinhId: e.key,
      tinh: e.label,
    });
    const data = await useGHN.actions.layHuyen(e.value);
    setDanhSachHuyen(data.data.data);
  }
  async function handleChonXa(e) {
    setDiaChiMoi({
      ...diaChiMoi,
      huyenId: e.key,
      huyen: e.label,
    });
    const data = await useGHN.actions.layXa(e.value);
    setDanhSachXa(data.data.data);
  }
  async function handleChonXaChiTiet(e) {
    setDiaChiMoi({
      ...diaChiMoi,
      xaId: e.key,
      xa: e.label,
    });
  }
  async function handleSuaDiaChi() {
    if (!checkEmpty(diaChiMoi.hoNguoiNhan)) {
      openNotification("error", "Hệ thống", "Mời nhập họ", "bottomRight");
      return;
    }
    if (!checkEmpty(diaChiMoi.nguoiNhan)) {
      openNotification("error", "Hệ thống", "Mời nhập tên", "bottomRight");
      return;
    }
    if (!checkEmpty(diaChiMoi.soDienThoai)) {
      openNotification(
        "error",
        "Hệ thống",
        "Mời nhập số điện thoại",
        "bottomRight"
      );
      return;
    }
    if (!checkEmpty(diaChiMoi.chiTietDiaChi)) {
      openNotification(
        "error",
        "Hệ thống",
        "Mời nhập chi tiết địa chỉ",
        "bottomRight"
      );
      return;
    }
    const data = await useNguoiDungStore.actions.capNhatDiaChi(diaChiMoi);
    openNotification("success", "Hệ thống", "Cập nhật thành công", "bottomRight");
    fetData();
    setIsModalOpen(false);
  }
  useEffect(() => {
    handleLayTinh();
  }, []);
  return (
    <>
      {contextHolder}
      <Button
        style={{
          color: "blue",
        }}
        type="text"
        size="small"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Chỉnh sửa
      </Button>
      <Modal
        title="Cập nhật địa chỉ"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={() => {
          setIsModalOpen(false);
        }}
        width={800}
        centered
      >
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
          style={{
            maxWidth: 768,
          }}
          onFinish={handleSuaDiaChi}
        >
          <Form.Item
            label="Họ người nhận"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Họ người nhận",
              },
            ]}
          >
            <Input
              value={diaChiMoi.hoNguoiNhan}
              onChange={(e) => {
                setDiaChiMoi({
                  ...diaChiMoi,
                  hoNguoiNhan: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Tên người nhận"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Tên người nhận",
              },
            ]}
          >
            <Input
              value={diaChiMoi.nguoiNhan}
              onChange={(e) => {
                setDiaChiMoi({
                  ...diaChiMoi,
                  nguoiNhan: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Số điện thoại người nhận",
              },
            ]}
          >
            <Input
              value={diaChiMoi.soDienThoai}
              onChange={(e) => {
                setDiaChiMoi({
                  ...diaChiMoi,
                  soDienThoai: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Tỉnh/TP"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn Tỉnh/TP",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              showSearch
              labelInValue
              value={diaChiMoi.tinh}
              onChange={handleChonHuyen}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {danhSachTinh
                ? danhSachTinh.map((option) => (
                  <Select.Option
                    key={option.ProvinceID}
                    value={option.ProvinceID}
                  >
                    {option.NameExtension[0]}
                  </Select.Option>
                ))
                : ""}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quận/huyện"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn Quận/huyện",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              showSearch
              labelInValue
              value={diaChiMoi.huyen}
              onChange={handleChonXa}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {danhSachHuyen
                ? danhSachHuyen.map((option) => (
                  <Select.Option
                    key={option.DistrictID}
                    value={option.DistrictID}
                  >
                    {option.DistrictName}
                  </Select.Option>
                ))
                : ""}
            </Select>
          </Form.Item>
          <Form.Item
            label="Xã/phường"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn xã/phường",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              showSearch
              labelInValue
              value={diaChiMoi.tinh}
              onChange={handleChonXaChiTiet}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {danhSachXa
                ? danhSachXa.map((option) => (
                  <Select.Option
                    key={option.WardCode}
                    value={option.WardCode}
                  >
                    {option.NameExtension[0]}
                  </Select.Option>
                ))
                : ""}
            </Select>
          </Form.Item>
          <Form.Item
            label="Chi tiết địa chỉ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập chi tiết địa chỉ",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              value={diaChiMoi.chiTietDiaChi}
              onChange={(e) => {
                setDiaChiMoi({
                  ...diaChiMoi,
                  chiTietDiaChi: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Action">
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalSuaDiaChi;

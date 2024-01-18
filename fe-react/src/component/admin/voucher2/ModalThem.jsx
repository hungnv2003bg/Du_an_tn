import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
} from "antd";
import "./style.css";
import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useVoucher } from "./useVoucher";
import { checkEmpty } from "../../../extensions/checkEmpty";
function ModalThem({ fetchData }) {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voucher, setVoucher] = useState({});

  async function handleThemVoucher() {
    if (!checkEmpty(voucher.tenVoucher)) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập tên voucher",
        "bottomRight"
      );
      return;
    }
    if (isNaN(voucher.soLuong) || !voucher.soLuong) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập số lượng",
        "bottomRight"
      );
      return;
    }
    if (isNaN(voucher.giaTriGiam) || !voucher.giaTriGiam) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập giá trị giảm",
        "bottomRight"
      );
      return;
    }
    if (voucher.ngayKetThuc.length < 17) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập ngày kết thúc",
        "bottomRight"
      );
      return;
    }
    const data = await useVoucher.actions.themVoucher(voucher);
    fetchData();
    setIsModalOpen(false);
    form.resetFields();
    openNotification("success", "Hệ thống", "Tạo thành công", "bottomRight");
  }
  const formatter = (value) => {
    if (value === "" || value === undefined) {
      return value;
    }
    return String(parseInt(value, 10));
  };

  // Hàm parser để trả về giá trị số nguyên
  const parser = (value) => {
    if (value === "" || value === undefined) {
      return value;
    }
    return parseInt(value, 10);
  };
  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Tạo voucher
      </Button>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        title={"Tạo voucher"}
        open={isModalOpen}
        onOk={() => { }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
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
          onFinish={handleThemVoucher}
        >
          <Form.Item
            label="Tên voucher"
            name="Tên voucher"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên voucher",
              },
            ]}
          >
            <Input
              value={voucher.tenVoucher}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  tenVoucher: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="Số lượng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng",
              },
            ]}
          >
            <InputNumber
              formatter={formatter}
              parser={parser}
              style={{
                width: "100%",
              }}
              min={1}
              value={voucher.soLuong}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  soLuong: e,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Giá trị giảm"
            name="Giá trị giảm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá trị giảm",
              },
            ]}
          >
            <InputNumber
              formatter={(value) =>
                ` ${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\đ\s?|(,*)/g, "")}
              style={{
                width: "100%",
              }}
              min={1}
              value={voucher.giaTriGiam}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  giaTriGiam: e,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Ngày hết hạn"
            name="Ngày hết hạn"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày hết hạn",
              },
            ]}
          >
            <DatePicker
              style={{
                width: "100%",
              }}
              disabledDate={(e) => {
                const today = new Date();
                return e && e < today;
              }}
              onChange={(e, q) => {
                setVoucher({
                  ...voucher,
                  ngayKetThuc: q + "T00:00:00.000000",
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Action">
            <Button type="primary" htmlType="submit">
              Tạo voucher
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalThem;

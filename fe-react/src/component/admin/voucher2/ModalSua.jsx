import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
  Tooltip,
  notification,
} from "antd";
import "./style.css";
import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useVoucher } from "./useVoucher";
import { FaRegPenToSquare } from "react-icons/fa6";
import moment from "moment";
import { checkEmpty } from "../../../extensions/checkEmpty";
function ModalSua({ duLieu, fetchData }) {
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
  const [voucher, setVoucher] = useState(duLieu);

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
    const data = await useVoucher.actions.suaVouchet(voucher);
    if (data.data === 2) {
      openNotification("error", "Hệ thống", "Số lượng sửa đổi nhỏ hơn số Voucher đã phát", "bottomRight");
      return
    }
    fetchData();
    setIsModalOpen(false);
    openNotification("success", "Hệ thống", "Cập nhật thành công", "bottomRight");
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
      <Tooltip title="Cập nhật" style={{
      }}>
        <Button
          style={{
            color: "green",
            marginRight: "4px"

          }}
          shape="circle"
          icon={<FaRegPenToSquare />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </Tooltip>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        title={"Cập nhật voucher"}
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
              defaultValue={moment(voucher.ngayKetThuc)}
              onChange={(e, q) => {
                setVoucher({
                  ...voucher,
                  ngayKetThuc: q + "T00:00:00.000000",
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Trạng thái">
            <Switch
              checked={voucher.trangThai === "DIENRA" ? true : false}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  trangThai: e ? "DIENRA" : "NGUNG",
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

export default ModalSua;

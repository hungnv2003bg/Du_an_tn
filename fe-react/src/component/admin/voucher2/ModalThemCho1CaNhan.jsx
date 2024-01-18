import {
  Button,
  Form,
  InputNumber,
  Modal,
  Select,
  Tooltip,
  notification,
} from "antd";
import "./style.css";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useVoucher } from "./useVoucher";
import { FaPlus } from "react-icons/fa6";
import { useBanTaiQuayStore } from "../bantaiquay/useBanTaiQuayStore";
function ModalThemCho1CaNhan({ voucherId, fetchData }) {
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
  const [soLuong, setSoLuong] = useState(0);
  const [nguoiDungId, setNguoiDungId] = useState(undefined);
  const [form] = useForm();
  async function handleThemVoucher() {
    const data = await useVoucher.actions.themVoucherChoNguoiDung({
      soLuong: soLuong,
      voucherId: voucherId,
      nguoiDungId: nguoiDungId,
    });
    if (data.data === 2) {
      openNotification("error", "Hệ thống", "Không đủ voucher", "bottomRight");
      return;
    }
    fetchData();
    setIsModalOpen(false);
    form.resetFields();
    openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
  }
  const formatter = (value) => {
    if (value === "" || value === undefined) {
      return value;
    }
    return String(parseInt(value, 10));
  };
  const [danhSachKhachHang, setDanhSachKhachHang] = useState(undefined);
  async function layDanhSachKhachHang() {
    const data = await useBanTaiQuayStore.actions.layDanhSachKhachHang();
    setDanhSachKhachHang(data.data);
  }
  useEffect(() => {
    layDanhSachKhachHang();
  }, []);
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
      <Tooltip title="Phát cho cá nhân">
        <Button
          style={{
            color: "green",
          }}
          icon={<FaPlus />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Phát cho cá nhân
        </Button>
      </Tooltip>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        title={"Phát voucher cho cá nhân"}
        open={isModalOpen}
        onOk={() => {}}
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
            label="Người dùng"
            name="Người dùng"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn người dùng",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              showSearch
              labelInValue
              onChange={(e) => {
                setNguoiDungId(e.value);
              }}
              defaultValue={"Chọn khách hàng"}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {danhSachKhachHang
                ? danhSachKhachHang.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.ho +
                        " " +
                        option.ten +
                        " - " +
                        option.maNguoiDung +
                        " - " +
                        option.soDienThoai}
                    </Select.Option>
                  ))
                : ""}
            </Select>
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
              value={soLuong}
              onChange={(e) => {
                if (isNaN(e)) {
                  return;
                }
                setSoLuong(e);
              }}
            />
          </Form.Item>
          <Form.Item label="Action">
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalThemCho1CaNhan;

import { selectLanguage } from "../../../language/selectLanguage";
import "./style.css";
import { Button, Form, Input, Modal, Tooltip, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSanPhamStore } from "./useSanPhamStore";
import { useSelector } from "react-redux";
import { IoEyeSharp } from "react-icons/io5";
import dayjs from "dayjs";
function ModalView({ id }) {
  const language = useSelector(selectLanguage);
  const [sanPham, setSanPham] = useState({
    id: id,
    tenSanPham: "",
    ngayTao: "",
    ngayCapNhat: "",
    chatLieu: {},
    nhomSanPham: {},
    thietKe: {},
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
      const data = await useSanPhamStore.actions.laySanPhamById(id);
      setSanPham(data.data);
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
            margin: "0 10px",
          }}
          shape="circle"
          icon={<IoEyeSharp />}
        />
      </Tooltip>
      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        title="Sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            OK
          </Button>,
        ]}
        centered
        width={768}
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
            label="Mã sản phẩm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.maSanPham} />
          </Form.Item>
          <Form.Item
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.tenSanPham} />
          </Form.Item>
          <div style={{ display: "flex" }}>
            <Form.Item label="Hình ảnh 1">
              <img
                alt="Hình ảnh sản phẩm"
                src={sanPham.hinhAnh1}
                style={{ width: "50%", height: "50%" }}
              />
            </Form.Item>
            <Form.Item label="Hình ảnh 2">
              <img
                alt="Hình ảnh sản phẩm"
                src={sanPham.hinhAnh2}
                style={{ width: "50%", height: "50%" }}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Giá nhập"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.giaNhap} />
          </Form.Item>
          <Form.Item
            label="Giá bán"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.giaBan} />
          </Form.Item>
          <Form.Item label="Ngày tạo">
            <Input
              disabled
              value={
                sanPham.ngayTao
                  ? dayjs(sanPham.ngayTao).format("DD/MM/YYYY")
                  : "Mới"
              }
            />
          </Form.Item>
          <Form.Item label="Ngày cập nhật">
            <Input
              disabled
              value={
                sanPham.ngayCapNhat
                  ? dayjs(sanPham.ngayCapNhat).format("DD/MM/YYYY")
                  : "Mới"
              }
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea
              disabled
              value={sanPham.moTa}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            label="Trạng Thái"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              disabled
              value={
                sanPham.trangThai === "DANGBAN"
                  ? "Đang bán"
                  : sanPham.trangThai === "HETHANG"
                  ? "Hết hàng"
                  : ""
              }
            />
          </Form.Item>
          <Form.Item
            label="Chất liệu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.chatLieu.tenChatLieu} />
          </Form.Item>

          <Form.Item
            label="Thiết kế"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.thietKe.tenThietKe} />
          </Form.Item>

          <Form.Item
            label="Nhóm sản phẩm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.nhomSanPham.tenNhom} />
          </Form.Item>
          <Form.Item
            label="Số lượng tồn"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.soLuongTon} />
          </Form.Item>
          <Form.Item
            label="Số lượng đã bán"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.soLuongDaBan} />
          </Form.Item>
          <Form.Item
            label="Số lượng trả hàng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.soLuongTraHang} />
          </Form.Item>
          <Form.Item
            label="Số lượng lỗi"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.soLuongLoi} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalView;

import { selectLanguage } from "../../../../language/selectLanguage";
import "./style.css";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNhomSanPhamStore } from "./useNhomSanPhamStore";
import { useSelector } from "react-redux";
import { FaRegPenToSquare } from "react-icons/fa6";
function ModalCapNhat({ id, setData }) {
  const language = useSelector(selectLanguage);
  const [thuocTinh, setThuocTinh] = useState();
  const [sanPhamChiTiet, setSanPhamChiTiet] = useState(undefined);
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
  async function layDuLieu2() {
    const data = await useNhomSanPhamStore.actions.fetchThuocTinh();
    setThuocTinh(data.data);
  }
  useEffect(() => {
    async function layDuLieu() {
      const data = await useNhomSanPhamStore.actions.layChatLieuById(id);
      setSanPhamChiTiet({
        ...data.data,
        mauSacId: data.data.mauSac.id,
        sanPhamId: data.data.sanPham.id,
        kichThuocId: data.data.kichThuoc.id,
        id: data.data.id,
      });
    }
    if (isModalOpen) {
      layDuLieu();
      layDuLieu2();
    }
  }, [isModalOpen]);
  async function handleSuaChatLieu() {
    if (sanPhamChiTiet.soLuongTon < 1) {
      openNotification("error", "Hệ thống", "Nhập số lượng tồn", "bottomRight");
      return;
    }
    if (sanPhamChiTiet.soLuongLoi < 0 || sanPhamChiTiet.soLuongLoi == null) {
      openNotification("error", "Hệ thống", "Nhập số lượng lỗi", "bottomRight");
      return;
    }
    if (sanPhamChiTiet.soLuongTraHang < 0 || sanPhamChiTiet.soLuongTraHang == null) {
      openNotification(
        "error",
        "Hệ thống",
        "Nhập số lượng trả hàng",
        "bottomRight"
      );
      return;
    }
    const data = await useNhomSanPhamStore.actions.suaChatLieu(sanPhamChiTiet);
    if (!data.data.data) {
      openNotification(
        "error",
        "Hệ thống",
        "Đã tồn tại 1 chi tiết cùng thuộc tính",
        "bottomRight"
      );
      setIsModalOpen(false);
      return;
    }
    openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");
    setSanPhamChiTiet({
      ...sanPhamChiTiet,
      tenThietKe: "",
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
          title="Cập nhật sản phẩm chi tiết"
          open={isModalOpen}
          onCancel={handleCancel}
          centered
        >
          {sanPhamChiTiet ? (
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
              <Form.Item label="Màu sắc" name="Màu sắc">
                <Select
                  labelInValue
                  optionLabelProp="children"
                  style={{
                    width: "100%",
                  }}
                  defaultValue={sanPhamChiTiet.mauSac.tenMau}
                  onChange={(e) => {
                    setSanPhamChiTiet({
                      ...sanPhamChiTiet,
                      mauSacId: e.value,
                    });
                  }}
                >
                  {thuocTinh
                    ? thuocTinh.mauSacList.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.tenMau}
                      </Select.Option>
                    ))
                    : ""}
                </Select>
              </Form.Item>
              <Form.Item label="Kích thước" name="Kích thước">
                <Select
                  labelInValue
                  optionLabelProp="children"
                  style={{
                    width: "100%",
                  }}
                  defaultValue={sanPhamChiTiet.kichThuoc.tenKichThuoc}
                  onChange={(e) => {
                    setSanPhamChiTiet({
                      ...sanPhamChiTiet,
                      kichThuocId: e.value,
                    });
                  }}
                >
                  {thuocTinh
                    ? thuocTinh.kichThuocList.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.tenKichThuoc}
                      </Select.Option>
                    ))
                    : ""}
                </Select>
              </Form.Item>
              <Form.Item
                label="Số lượng tồn"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  value={sanPhamChiTiet.soLuongTon}
                  onChange={(e) => {
                    setSanPhamChiTiet({
                      ...sanPhamChiTiet,
                      soLuongTon: e,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Số lượng lỗi"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  value={sanPhamChiTiet.soLuongLoi}
                  onChange={(e) => {
                    setSanPhamChiTiet({
                      ...sanPhamChiTiet,
                      soLuongLoi: e,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Số lượng trả hàng"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  value={sanPhamChiTiet.soLuongTraHang}
                  onChange={(e) => {
                    setSanPhamChiTiet({
                      ...sanPhamChiTiet,
                      soLuongTraHang: e,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label=" ">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSuaChatLieu}
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          ) : (
            ""
          )}
        </Modal>
      </div>
    </>
  );
}

export default ModalCapNhat;

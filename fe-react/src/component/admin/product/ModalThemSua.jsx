import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Switch,
  message,
  Upload,
  notification,
} from "antd";
import "./style.css";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { useSanPhamStore } from "./useSanPhamStore";
import { useForm } from "antd/es/form/Form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
function ModalThemSua({ type, thuocTinh, fetchData }) {
  const [form] = useForm()
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
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [sanPham, setSanPham] = useState({
    tenSanPham: "",
    giaBan: 0,
    giaNhap: 0,
    soLuongTon: 0,
    moTa: "",
  });
  const [fileList, setFileList] = useState([]);
  const [hinhAnh, setHinhAnh] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function handleSetTenSP(e) {
    setSanPham({
      ...sanPham,
      tenSanPham: e.target.value,
    });
  }
  function handleSetGiaBan(e) {
    setSanPham({
      ...sanPham,
      giaBan: e,
    });
  }
  function handleSetGiaNhap(e) {
    setSanPham({
      ...sanPham,
      giaNhap: e,
    });
  }
  function handleSetMoTa(e) {
    setSanPham({
      ...sanPham,
      moTa: e.target.value,
    });
  }
  function handleSetSoLuong(e) {
    setSanPham({
      ...sanPham,
      soLuongTon: e,
    });
  }
  function handleSetThietKe(e) {
    setSanPham({
      ...sanPham,
      thietKeId: e.value,
    });
  }
  function handleSetNhom(e) {
    setSanPham({
      ...sanPham,
      nhomSanPhamId: e.value,
    });
  }
  function handleSetChatLieu(e) {
    setSanPham({
      ...sanPham,
      chatLieuId: e.value,
    });
  }
  const props = {
    beforeUpload: (file) => {
      return false;
    },
    onChange: (file) => {
      setFileList(file.fileList);
      if (file.fileList.length == 0) {
        return;
      }
      const isPNG =
        file.file.type === "image/png" ||
        file.file.type === "image/jpg" ||
        file.file.type === "image/jpeg";
      if (!isPNG) {
        message.error(`${file.file.name} không phải file hình ảnh`);
        return;
      }
      if (hinhAnh.length > 1) {
        message.error(`Đã đủ 2 hình ảnh`);
      }
      if (file.fileList[1]) {
        setHinhAnh([
          file.fileList[0].originFileObj,
          file.fileList[1].originFileObj,
        ]);
      } else {
        setHinhAnh([file.fileList[0].originFileObj]);
      }
    },
  };

  async function handleThemSanPham() {
    if (sanPham.tenSanPham == "") {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập tên sản phẩm",
        "bottomRight"
      );
      return;
    }
    if (sanPham.giaNhap <= 0) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập giá nhập",
        "bottomRight"
      );
      return;
    }
    if (sanPham.giaBan <= 0) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập giá bán",
        "bottomRight"
      );
      return;
    }
    if (!sanPham.thietKeId) {
      openNotification("error", "Hệ thống", "Thiếu thiết kế", "bottomRight");
      return;
    }
    if (!sanPham.chatLieuId) {
      openNotification("error", "Hệ thống", "Thiếu chất liệu", "bottomRight");
      return;
    }
    if (!sanPham.nhomSanPhamId) {
      openNotification(
        "error",
        "Hệ thống",
        "Thiếu nhóm sản phẩm",
        "bottomRight"
      );
      return;
    }
    if (!hinhAnh) {
      openNotification(
        "error",
        "Hệ thống",
        "Cần tối thiểu 2 hình ảnh",
        "bottomRight"
      );
      return;
    }
    if (hinhAnh.length < 2) {
      openNotification(
        "error",
        "Hệ thống",
        "Cần tối thiểu 2 hình ảnh",
        "bottomRight"
      );
      return;
    }

    setIsLoading(true);
    var form2 = new FormData();
    form2.append("file1", hinhAnh[0]);
    form2.append("file2", hinhAnh[1]);
    form2.append("data", JSON.stringify(sanPham));
    const data = await useSanPhamStore.actions.themSanPham(form2);
    if (data.data.status == "THANHCONG") {
      form.resetFields();
      openNotification(
        "success",
        "Hệ thống",
        "Thêm sản phẩm thành công",
        "bottomRight"
      );

      fetchData();
      setSanPham({
        tenSanPham: "",
        giaBan: 0,
        giaNhap: 0,
        soLuong: 0,
      });
    } else {
      openNotification(
        "error",
        "Hệ thống",
        "Thêm sản phẩm thất bại",
        "bottomRight"
      );
      setSanPham({
        tenSanPham: "",
        giaBan: 0,
        giaNhap: 0,
        soLuong: 0,
      });
    }
    setFileList([]);
    setIsModalOpen(false);
    setIsLoading(false);
  }
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Thêm sản phẩm
      </Button>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        width={768}
        title={type == 1 ? " Thêm sản phẩm" : "Sửa sản phẩm"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
        >
          <Form.Item label="Tên sản phẩm">
            <Input value={sanPham.tenSanPham} onChange={handleSetTenSP} />
          </Form.Item>

          <Form.Item label="Giá nhập">
            <InputNumber
              formatter={(value) => ` ${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\đ\s?|(,*)/g, '')}
              style={{
                width: "100%",
              }}
              min={0}
              value={sanPham.giaNhap}
              rules={[
                {
                  required: true,
                },
              ]}
              onChange={handleSetGiaNhap}
            />
          </Form.Item>
          <Form.Item label="Giá bán">
            <InputNumber
              formatter={(value) => ` ${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\đ\s?|(,*)/g, '')}
              style={{
                width: "100%",
              }}
              value={sanPham.giaBan}
              min={0}
              rules={[
                {
                  required: true,
                },
              ]}
              onChange={handleSetGiaBan}
            />
          </Form.Item>
          <Form.Item label="Thiết kế">
            <Select
              labelInValue
              optionLabelProp="children"
              style={{
                width: "100%",
              }}
              rules={[
                {
                  required: true,
                },
              ]}
              onChange={handleSetThietKe}
            >
              {thuocTinh
                ? thuocTinh.thietKeList.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.tenThietKe}
                  </Select.Option>
                ))
                : ""}
            </Select>
          </Form.Item>
          <Form.Item label="Chất liệu">
            <Select
              labelInValue
              optionLabelProp="children"
              style={{
                width: "100%",
              }}
              rules={[
                {
                  required: true,
                },
              ]}
              onChange={handleSetChatLieu}
            >
              {thuocTinh
                ? thuocTinh.chatLieuList.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.tenChatLieu}
                  </Select.Option>
                ))
                : ""}
            </Select>
          </Form.Item>
          <Form.Item label="Nhóm sản phẩm">
            <Select
              labelInValue
              optionLabelProp="children"
              style={{
                width: "100%",
              }}
              rules={[
                {
                  required: true,
                },
              ]}
              onChange={handleSetNhom}
            >
              {thuocTinh
                ? thuocTinh.nhomSanPhamList.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.tenNhom}
                  </Select.Option>
                ))
                : ""}
            </Select>
          </Form.Item>
          <Form.Item label="Thông tin chi tiết">
            <Input.TextArea value={sanPham.moTa} onChange={handleSetMoTa} />
          </Form.Item>

          <Form.Item label="Upload">
            <Upload
              listType="picture-card"
              multiple
              customRequest={() => { }}
              {...props}
              maxCount={2}
              fileList={fileList}
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Action">
            <Button
              loading={isLoading}
              onClick={() => {
                if (type == 1) {
                  handleThemSanPham();
                }
              }}
            >
              {type == 1 ? "Thêm sản phẩm" : "Sửa sản phẩm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalThemSua;

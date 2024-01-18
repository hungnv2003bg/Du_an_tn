import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Tooltip,
  notification,
  Checkbox,
  Radio,
  Select,
  Upload,
  message
} from "antd";
import { useForm } from "antd/es/form/Form";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { PlusOutlined } from "@ant-design/icons";

function ModalThemSua({ id, setData }) {
  const [form] = useForm()
  const [rankKhachHang, setRankKhachHang] = useState();
  const { Option } = Select;
  const [nguoiDung, setNguoiDung] = useState({
    id: id,
    ten: "",
    ho: "",
    email: "",
    matKhau: "",
    rankKhachHang: "",
    diem: "",
    gioiTinh: "",
    soDienThoai: "",
    anhDaiDien: "",
    quyens: []
  });
  const [fileList, setFileList] = useState([]);
  const [hinhAnh, setHinhAnh] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const props = {
    beforeUpload: (file) => {
      return false;
    },
    onChange: (file) => {
      setFileList(file.fileList);
      if (file.fileList.length === 0) {
        setHinhAnh([]);
        return;
      }
      const isImage = file.file.type === "image/png" || file.file.type === "image/jpg" || file.file.type === "image/jpeg";
      if (!isImage) {
        message.error(`${file.file.name} không phải file hình ảnh`);
        return;
      }
      setHinhAnh([file.fileList[0].originFileObj]);
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
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
  async function handleSuaNguoiDung() {
    if (!nguoiDung.ten.trim()) {
      openNotification("error", "Hệ thống", "Tên là bắt buộc", "bottomRight");
      return;
    }
    if (nguoiDung.matKhau) {
      if (nguoiDung.matKhau.length < 8) {
        openNotification("error", "Hệ thống", "Mật khẩu lớn hơn 8 ký tự", "bottomRight");
        return;
      }
    }
    setIsLoading(true);
    const formData = new FormData();
    if (hinhAnh.length > 0) {
      formData.append("anhDaiDien", hinhAnh[0]);
    }
    formData.append("trangThai", nguoiDung.trangThai ? "HOATDONG" : "BIKHOA");
    formData.append("data", JSON.stringify(nguoiDung));
    try {
      const response = await useNguoiDungStore.actions.suaNguoiDung(formData);
      if (response && response.data && response.data.status === "THANHCONG") {
        openNotification(
          "success",
          "Hệ thống",
          "Sửa thông tin người dùng thành công",
          "bottomRight"
        );
        await layDuLieu3();
        console.log("Sau Khi Sua Nguoi Dung:", nguoiDung);
      } else {
        throw new Error(response.data.message || "Sửa thông tin người dùng thất bại");
      }
    } catch (error) {
      openNotification("error", "Hệ thống", error.message, "bottomRight");
    } finally {
      setNguoiDung({ ten: "", anhDaiDien: null });
      setFileList([]);
      setHinhAnh([]);
      setIsLoading(false);
      setIsModalOpen(false);
    }
  }
  const options = [{
    label: "Khách hàng",
    value: "1"
  }, {
    label: "Nhân viên",
    value: "2"
  }, {
    label: "ADMIN",
    value: "3"
  },];

  async function layDuLieu2() {
    const data = await useNguoiDungStore.actions.layRankKhachHang();
    setRankKhachHang(data.data.data);
  }
  async function layDuLieu3() {
    const data = await useNguoiDungStore.actions.fetchNguoiDung();
    setData(data.data.data);
  }
  useEffect(() => {
    async function layDuLieu() {
      const data = await useNguoiDungStore.actions.layNguoiDungId(id);
      console.log("Lấy dữ liệu: ", data);
      setNguoiDung(data.data);
      setFileList([{ uid: '1', url: data.data.anhDaiDien, name: 'Ảnh đại diện' }]);
      form.setFieldsValue({
        trangThai: data.data.trangThai === 'HOATDONG',
        gioiTinh: data.data.gioiTinh ? "Nam" : "Nữ",

      });
    }
    if (isModalOpen) {
      layDuLieu();
      layDuLieu2();
    }
  }, [id, isModalOpen]);

  return (
    <>
      {contextHolder}
      <Tooltip title="Cập nhật" onClick={showModal}>
        <Button
          style={{
            color: "green",
            margin: "0 10px",
          }}
          shape="circle"
          icon={<FaRegPenToSquare />}
        />
      </Tooltip>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        title="Sửa Người Dùng"
        visible={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="submit" type="primary" onClick={handleSuaNguoiDung}>
            Sửa
          </Button>,
        ]}
      >
        <Form
          form={form}
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
            label="Họ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={nguoiDung.ho}
              onChange={(e) => {
                setNguoiDung({
                  ...nguoiDung,
                  ho: e.target.value,
                });
              }} />
          </Form.Item>
          <Form.Item label="Tên">
            <Input
              value={nguoiDung.ten}
              onChange={(e) => {
                setNguoiDung({
                  ...nguoiDung,
                  ten: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Mật Khẩu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                setNguoiDung({
                  ...nguoiDung,
                  matKhau: e.target.value,
                });
              }}
              value={nguoiDung.matKhau}
            />
          </Form.Item>
          <Form.Item
            label="Số Điện Thoại"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={nguoiDung.soDienThoai}
              onChange={(e) => {
                setNguoiDung({
                  ...nguoiDung,
                  s: e.target.value,
                });
              }} />
          </Form.Item>
          <Form.Item
            label="Quyền"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              defaultValue={nguoiDung.quyens}
              placeholder="Chọn quyền"
              onChange={(e) => {
                setNguoiDung({
                  ...nguoiDung,
                  quyen: e
                })
              }}
              options={options}
            />
          </Form.Item>


          <Form.Item
            label="Giới Tính"
            name="gioiTinh"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn giới tính!'
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => setNguoiDung({ ...nguoiDung, gioiTinh: e.target.value === "Nam" })}
            >
              <Radio value="Nam">Nam</Radio>
              <Radio value="Nữ">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Trạng Thái"
            name="trangThai"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn trạng thái!'
              },
            ]}
          >
            <Checkbox
              onChange={(e) => setNguoiDung({
                ...nguoiDung,
                trangThai: e.target.checked ? "HOATDONG" : "BIKHOA",
              })}
            >Hoạt động
            </Checkbox>
          </Form.Item>
          <Form.Item label="Ảnh đại diện">
            <Upload
              listType="picture-card"
              {...props}
              maxCount={1}
              fileList={fileList}
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Ảnh đại diện
                </div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalThemSua;
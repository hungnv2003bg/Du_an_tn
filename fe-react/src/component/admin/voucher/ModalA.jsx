import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Tooltip,
  notification,
} from "antd";
import { DatePicker } from 'antd';

const { Option } = Select;

function ModalA({ onActionSuccess }) {
  const [tenVoucher, setTenVoucher] = useState('');
  const [loaiGiam, setLoaiGiam] = useState('');
  const [giaTriGiam, setGiaTriGiam] = useState('');
  const [soLuong, setSoLuong] = useState('');
  const [ngayKetThuc, setNgayKetThuc] = useState('');
//   const [existingVouchers, setExistingVouchers] = useState([]);
const [test, setTest] = useState([]);



  const handleDateChange = (date) => {
    // Format the date string to include the time component (00:00:00)
    const formattedDate = `${date.toISOString().split('T')[0]}T00:00:00`;
    setNgayKetThuc(formattedDate);
  };



  
  // ...
  
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8089/api/voucher/test');
        const data = await response.json();
        console.log('Fetched existing vouchers:', data);
        setTest(data || []);
      } catch (error) {
        console.error('Error fetching existing vouchers:', error);
      }
    };
  
    fetchData();
  }, []);


  const handleClick = (e) => {
    e.preventDefault();
    console.log(test); // Kiểm tra giá trị của existingVouchers

    // Kiểm tra từng trường và hiển thị thông báo lỗi
    if (!tenVoucher || tenVoucher.trim() === "") {
      openNotification("error", "Lỗi", "Tên voucher không được để trống", "bottomRight");
      return;
    }
    if (!loaiGiam) {
      openNotification("error", "Lỗi", "Vui lòng chọn Loại giảm!", "bottomRight");
      return;
    }
    if (!giaTriGiam || giaTriGiam.trim() === "") {
      openNotification("error", "Lỗi", "Giá trị giảm không được để trống", "bottomRight");
      return;
    } else if (isNaN(giaTriGiam) || giaTriGiam <= 0) {
      openNotification("error", "Lỗi", "Giá trị giảm phải là một số dương lớn hơn 0!", "bottomRight");
      return;
    }
    if (loaiGiam === 'PHANTRAM' && (giaTriGiam < 0 || giaTriGiam > 100)) {
      openNotification("error", "Lỗi", "Giá trị giảm phần trăm phải nằm trong khoảng từ 0 đến 100!", "bottomRight");
      return;
    }
    if (loaiGiam === 'GIAMTHANG' && (giaTriGiam < 1000)) {
      openNotification("error", "Lỗi", "Bạn đang dùng tiền VIỆT đấy ít nhất hãy cho giảm 1000 đ", "bottomRight");
      return;
    }
    if (!soLuong) {
      openNotification("error", "Lỗi", "Số lượng không được để trống", "bottomRight");
      return;
    } else if (isNaN(soLuong) || soLuong <= 0) {
      openNotification("error", "Lỗi", "Số lượng phải là một số dương lớn hơn 0!", "bottomRight");
      return;
    }

    // Kiểm tra xem danh sách tên voucher đã được cập nhật hay chưa
    if (test.map(voucher => (typeof voucher === 'string' ? voucher.toLowerCase().trim() : voucher)).includes(tenVoucher.toLowerCase().trim())) {
        openNotification("error", "Lỗi", "Tên voucher đã tồn tại", "bottomRight");
        return;
    }
    

    // Gọi API để thêm voucher mới
    const voucher = { tenVoucher, loaiGiam, giaTriGiam, soLuong, ngayKetThuc };


    

   

    fetch("http://localhost:8089/api/voucher/addVoucher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voucher)
    }).then(() => {
      if (typeof onActionSuccess === 'function') {
        onActionSuccess();
      }

      openNotification("success", "Hệ thống", "Thêm Thành công", "bottomRight");

      setIsModalOpen(false);
      onActionSuccess();
      console.log("New voucher Added");
    })
    .catch((error) => {
      console.error("Error adding voucher:", error);
    });
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

  return (
    <>
      {contextHolder}
      <div
        style={{
          marginLeft: "4px",
          marginRight: "4px",
        }}
      >
        <Tooltip title="ADD" onClick={showModal}>
          <Button type="primary">Thêm dữ liệu</Button>
        </Tooltip>
        <Modal
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          title="Thêm voucher Mới"
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
              label="Tên voucher"
              name="Tên voucher"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                value={tenVoucher}
                onChange={(e) => setTenVoucher(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Loại voucher "
              name="Loại voucher"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select value={loaiGiam} onChange={(value) => setLoaiGiam(value)}>
                <Option value="GIAMTHANG">Giảm thẳng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Giá trị giảm"
              name="Giá trị giảm"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                value={giaTriGiam}
                onChange={(e) => setGiaTriGiam(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="Số lượng"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                value={soLuong}
                onChange={(e) => setSoLuong(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Ngày KT"
              name="Ngày KT"
              rules={[
                {
                  required: true,
                  message: 'Please select a date',
                },
              ]}
            >
              <DatePicker value={ngayKetThuc} onChange={handleDateChange} />
            </Form.Item>
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleClick}
              >
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default ModalA;

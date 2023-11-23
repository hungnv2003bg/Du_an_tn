import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import React, { useEffect, useState } from "react";
import { selectLanguage } from "../../../../language/selectLanguage";
import { fixMoney } from "../../../../extensions/fixMoney";
import { Button, Col, Input, Modal, Row, Tooltip, notification } from "antd";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useChiTietHoaDonStore } from "./useChiTietHoaDonStore";
import { IoEyeSharp } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
function ChiTietHoaDon({ hoaDonId }) {
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

  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
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
  const [hoaDonChiTiet, setHoaDonChiTiet] = useState(undefined)
  useEffect(() => {
    async function layDuLieu() {
      const data = await useChiTietHoaDonStore.actions.layChiTiet(hoaDonId)
      setHoaDonChiTiet(data.data.data)
    }
    if (isModalOpen) {
      layDuLieu();
    }
  }, [isModalOpen])
  return (
    <>{contextHolder}
      <Tooltip title="Xem" onClick={showModal}>
        <Button
          style={{
            color: "blue",
          }}
          shape="circle"
          icon={<IoEyeSharp />}
        />
      </Tooltip>
      {hoaDonChiTiet ? <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        width={1028} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Row>
          <h6>Thông tin hóa đơn</h6>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px"
        }}>
          <Col span={3} style={{
          }}>Mã HĐ:</Col>
          <Col span={8}><Input placeholder="" disabled value={hoaDonChiTiet.maHoaDon} /></Col>
          <Col span={3} offset={1}>Giá trị:</Col>
          <Col span={8}><Input disabled value={fixMoney(hoaDonChiTiet.giaTriHd)} /></Col>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px"
        }}>
          <Col span={3} style={{
          }}>Trạng thái:</Col>
          <Col span={8}><Input placeholder="" disabled value={hoaDonChiTiet.trangThai} /></Col>
          <Col span={3} offset={1}>Ngày giao:</Col>
          <Col span={8}><Input disabled value={hoaDonChiTiet.ngayGiao ? hoaDonChiTiet.ngayGiao : "Chưa giao"} /></Col>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px"
        }}>
          <Col span={3} style={{
          }}>Ngày tạo:</Col>
          <Col span={8}><Input placeholder="" disabled value={hoaDonChiTiet.ngayTao} /></Col>
          <Col span={3} offset={1}>Ngày cập nhật:</Col>
          <Col span={8}><Input disabled value={hoaDonChiTiet.ngayCapNhat} /></Col>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px",
          marginBottom: "14px"
        }}>  <Col span={3} >Ghi chú:</Col>
          <Col span={20} style={{
          }}> <TextArea rows={4} disabled value={hoaDonChiTiet.ghiChu} maxLength={6} /></Col>
        </Row>
        <Row style={{
          marginTop: "14px"
        }}>
          <h6>Thông tin khách hàng</h6>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px"
        }}>
          <Col span={3} style={{
          }}>Tên khách hàng:</Col>
          <Col span={8}><Input placeholder="" disabled value={hoaDonChiTiet.nguoiMua.ho + " " + hoaDonChiTiet.nguoiMua.ten} /></Col>
          <Col span={3} offset={1}>Mã khách hàng:</Col>
          <Col span={8}><Input disabled value={hoaDonChiTiet.nguoiMua.maNguoiDung} /></Col>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px"
        }}>
          <Col span={3} style={{
          }}>Email:</Col>
          <Col span={8}><Input disabled value={hoaDonChiTiet.nguoiMua.email} /></Col>
          <Col span={3} offset={1}>Số điện thoại:</Col>
          <Col span={8}><Input disabled value={hoaDonChiTiet.nguoiMua.soDienThoai} /></Col>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px",
          marginBottom: "14px"
        }}>
          <Col span={3} style={{
          }}>Điểm:</Col>
          <Col span={8}><Input disabled value={hoaDonChiTiet.nguoiMua.diem} /></Col>
          <Col span={3} offset={1}>Bậc:</Col>
          <Col span={8}><Input disabled value={hoaDonChiTiet.nguoiMua.maKhachHang} /></Col>
        </Row>
        <Row>
          <h6>Thông tin nhận hàng</h6>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px",
          marginBottom: "14px"
        }}>
          <Col span={2} style={{
          }}>Xã:</Col>
          <Col span={4}><Input disabled value={hoaDonChiTiet.diaChiGiao.xa} /></Col>
          <Col span={2} offset={1}>Huyện:</Col>
          <Col span={4}><Input disabled value={hoaDonChiTiet.diaChiGiao.huyen} /></Col>
          <Col span={2} offset={1}>Tỉnh:</Col>
          <Col span={4}><Input disabled value={hoaDonChiTiet.diaChiGiao.tinh} /></Col>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px",
        }}>
          <Col span={24} style={{
          }}>Chi tiết địa chỉ:</Col>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px",
          marginBottom: "14px"
        }}>
          <Col span={23} style={{
          }}> <TextArea rows={4} disabled value={hoaDonChiTiet.diaChiGiao.chiTietDiaChi} maxLength={6} /></Col>
        </Row>
        <Row>
          <h6>Thông tin giao hàng</h6>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px",
          marginBottom: "14px"
        }}>
          <Col span={3} style={{
          }}>Phương thức:</Col>
          <Col span={6}><Input disabled value={hoaDonChiTiet.phuongThucVanChuyen.tenPhuongThuc} /></Col>
        </Row>
        <Row>
          <h6>Thông tin thanh toán</h6>
        </Row>
        <Row style={{
          display: 'flex',
          alignItems: "center",
          marginTop: "14px",
          marginBottom: "14px"
        }}>
          <Col span={3} style={{
          }}>Phương thức:</Col>
          <Col span={6}><Input disabled value={hoaDonChiTiet.phuongThucThanhToan.tenPhuongThuc} /></Col>
        </Row>
      </Modal> : ""}
    </>
  );
}

export default ChiTietHoaDon;

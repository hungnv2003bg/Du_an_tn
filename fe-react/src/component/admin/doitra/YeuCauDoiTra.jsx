import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { RiRefundLine } from "react-icons/ri";
import TextArea from "antd/es/input/TextArea";
import { useDoiTra } from "./useDoiTra";
import { fixMoney } from "../../../extensions/fixMoney";
import DoiSanPham from "./DoiSanPham";

function YeuCauDoiTra({ hoaDonId, setData2 }) {
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
  const [api, contextHolder] = notification.useNotification();
  const [selectedChiTietHoaDon, setSelectedChiTietHoaDon] = useState(undefined);
  const [sanPhamDoi, setSanPhamDoi] = useState([]);
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
  const [ghiChu, setGhiChu] = useState([]);
  const [soLuong, setSoLuong] = useState([]);
  const [soLoi, setSoLoi] = useState([]);
  const [soDoi, setSoDoi] = useState([]);
  const [selectTrangThai, setSelectTrangThai] = useState([]);
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "sanPhamChiTiet",
      render: (sanPhamChiTiet) => (
        <>
          <div
            style={{
              display: "flex",
            }}
          >
            <Image
              src={sanPhamChiTiet.hinhAnh}
              style={{
                width: "80px",
                height: "120px",
              }}
            />
            <span
              style={{
                marginLeft: "4px",
              }}
            >
              {sanPhamChiTiet.tenSanPham}
            </span>
          </div>
        </>
      ),
      width: "25%",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      width: "15%",
      render: (soLuong2, record, number) => (
        <>
          <InputNumber
            min={1}
            max={soLuong2}
            formatter={formatter}
            parser={parser}
            onChange={(e) => {
              soLuong[number] = e;
              setSoLuong([...soLuong]);
            }}
          />
          /{soLuong2}
        </>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      width: "10%",
      render: (donGia) => <a>{fixMoney(donGia)}</a>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "donGia",
      width: "10%",
      render: (donGia, record) => <a>{fixMoney(donGia * record.soLuong)}</a>,
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      render: (_, record, number) => (
        <TextArea
          placeholder="Ghi chú"
          rows={4}
          onChange={(e) => {
            ghiChu[number] = e.target.value;
            setGhiChu([...ghiChu]);
          }}
        />
      ),
      width: "20%",
    },
    {
      title: "Hiện trạng sản phẩm",
      dataIndex: "hienTrangSanPham",
      render: (ghiChu, record, number) => (
        <>
          <p
            style={{
              marginBottom: "2px",
            }}
          >
            Đổi
          </p>
          <InputNumber
            min={0}
            formatter={formatter}
            parser={parser}
            onChange={(e) => {
              if (isNaN(e)) {
                soDoi[number] = 0;
                setSoDoi([...soDoi]);
                return;
              }
              soDoi[number] = e;
              setSoDoi([...soDoi]);
            }}
          />
          <p
            style={{
              marginBottom: "2px",
            }}
          >
            Lỗi
          </p>
          <InputNumber
            min={0}
            formatter={formatter}
            parser={parser}
            onChange={(e) => {
              if (isNaN(e)) {
                soLoi[number] = 0;
                setSoLoi([...soLoi]);
                return;
              }
              soLoi[number] = e;
              setSoLoi([...soLoi]);
            }}
          />
        </>
      ),
      width: "10%",
    },
  ];
  const [data, setData] = useState(undefined);
  async function handleLayChiTiet() {
    const data = await useDoiTra.actions.layChiTiet(hoaDonId);
    setData(data.data);
  }
  useEffect(() => {
    handleLayChiTiet();
  }, []);
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedChiTietHoaDon(selectedRowKeys);
    },
    selectedChiTietHoaDon,
  };
  async function handleDoiTra() {
    if (!selectedChiTietHoaDon) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng chọn 1 sản phẩm",
        "bottomRight"
      );
      return;
    }
    if (selectedChiTietHoaDon.length === 0) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng chọn 1 sản phẩm",
        "bottomRight"
      );
      return;
    }

    var duLieuDoiTra = [];
    for (var item of selectedChiTietHoaDon) {
      if (!soLuong[item]) {
        openNotification(
          "error",
          "Hệ thống",
          "Vui lòng nhập số lượng",
          "bottomRight"
        );
        return;
      }
      if (!ghiChu[item] || ghiChu[item] === "") {
        openNotification(
          "error",
          "Hệ thống",
          "Vui lòng nhập ghi chú cho lựa chọn thứ " + (Number(item) + 1),
          "bottomRight"
        );
        return;
      }
      if (!soLoi[item] && !soDoi[item]) {
        openNotification(
          "error",
          "Hệ thống",
          "Vui lòng nhập số lượng lỗi và đổi sản phẩm",
          "bottomRight"
        );
        return;
      }
      if (soLoi[item] + soDoi[item] !== soLuong[item]) {
        openNotification(
          "error",
          "Hệ thống",
          "Số lượng lỗi và đổi không tương ứng với số lượng chọn",
          "bottomRight"
        );
        return;
      }

      duLieuDoiTra[item] = {
        chiTietId: data[item].id,
        ghiChu: ghiChu[item],
        soLuong: soLuong[item],
        soLuongLoi: soLoi[item] ? soLoi[item] : 0,
        soLuongDoiTra: soDoi[item] ? soDoi[item] : 0,
      };
    }
    if (sanPhamDoi.length === 0) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng chọn sản phẩm muốn đổi!",
        "bottomRight"
      );
      return;
    }
    setDataDoiTra(duLieuDoiTra);
    setConfirmModal(true);
  }
  const [dataDoiTra, setDataDoiTra] = useState(undefined);
  const [confirmModal, setConfirmModal] = useState(false);
  async function handleTaoYeuCau() {
    const data = await useDoiTra.actions.taoYeuCau2({
      sanPhamDoi: sanPhamDoi,
      sanPhamTra: dataDoiTra,
      hoaDonId: hoaDonId,
    });
    if (data.data === 1) {
      openNotification(
        "success",
        "Hệ thống",
        "Đổi trả thành công",
        "bottomRight"
      );
      setData2();
      setIsModalOpen(false);

    } else {
      openNotification(
        "error",
        "Hệ thống",
        "Tổng giá trị hóa đơn sau khi đổi phải lớn hơn hoặc bằng giá trị cũ",
        "bottomRight"
      );
      return
    }
  }

  return (
    <>
      {contextHolder}
      <Tooltip title="Đổi trả">
        <Button
          style={{
            color: "blue",
            marginLeft: "4px",
          }}
          shape="circle"
          icon={<RiRefundLine />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </Tooltip>
      <Modal
        width={"100vw"}
        open={isModalOpen}
        onOk={handleDoiTra}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Row>
          <h6>Thông tin sản phẩm HD{hoaDonId}</h6>
        </Row>
        <Row
          style={{
            marginTop: "24px",
          }}
        >
          <Col span={24}>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={
                data &&
                data.map((item, index) => {
                  return {
                    ...item,
                    key: index,
                  };
                })
              }
            />
          </Col>
        </Row>
        <Row
          style={{
            width: "400px",
          }}
        >
          <DoiSanPham dataDoi={sanPhamDoi} setSanPhamDoi={setSanPhamDoi} />
        </Row>
      </Modal>
      <Modal
        title="Đổi trả sản phẩm"
        open={confirmModal}
        onOk={() => {
          handleTaoYeuCau();
          //    setConfirmModal(false);
        }}
        onCancel={() => {
          setConfirmModal(false);
        }}
        centered
      >
        <p>Xác nhận đổi trả</p>
      </Modal>
    </>
  );
}

export default YeuCauDoiTra;

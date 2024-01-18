import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Row,
  Space,
  Table,
  notification,
} from "antd";
import { selectLanguage } from "../../../../language/selectLanguage";
import { fixMoney } from "../../../../extensions/fixMoney";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useHoaDonChoStore } from "./useHoaDonChoStore";
import { fixNgayThang } from "../../../../extensions/fixNgayThang";
import ChiTietHoaDonChoXacNhan from "../chitiethoadon/ChiTietHoaDonChoXacNhan";
import sapXepTheoNgayTao from "../../../../extensions/sapXepNgayTao";

function ChoGiaoHang() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleXacNhanHoaDon();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    handleHuy();
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Mã HĐ",
      dataIndex: "maHoaDon",
      width: "10%",
      ...getColumnSearchProps("maHoaDon"),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenKhachHang",
      width: "20%",
      ...getColumnSearchProps("tenKhachHang"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: "15%",
      ...getColumnSearchProps("soDienThoai"),
    },
    {
      title: "Giá trị HĐ",
      dataIndex: "hoaDonChiTietList",
      width: "15%",
      render: (hoaDonChiTietList) => <span>
        {fixMoney(hoaDonChiTietList ?
          hoaDonChiTietList.reduce((pre, cur) => {
            return pre + (cur.soLuong * cur.donGia)
          }, 0) : 0)
        }
      </span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      width: "20%",
      render: (item) => <span>{fixNgayThang(item)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      width: "10%",
    },
    {
      title: "Thao tác",
      dataIndex: "key",
      width: "10%",
      align: "center",
      render: (id) => (
        <ChiTietHoaDonChoXacNhan
          fetHoaDon={layDuLieu}
          type2={true}
          hoaDonId={id}
          type={true}
          isChoXacNhan={false}
        />
      ),
    },
  ];
  const [data, setData] = useState([]);
  async function layDuLieu() {
    const ketQua = await useHoaDonChoStore.actions.fetchHoaDonCho();
    setData(ketQua.data.data);
  }
  useEffect(() => {
    layDuLieu();
  }, []);
  function handleCheckGia() {
    for (var item of selectedRowKeys) {
      var hoaDon = data.find((x) => {
        return x.key == item;
      })
      if (!hoaDon) {
        continue
      }
      const hoaDonChiTiet = hoaDon.hoaDon;
      var tongTien = hoaDonChiTiet.hoaDonChiTietList.reduce((pre, cur) => {
        return pre + (cur.soLuong * cur.donGia)
      }, 0) + hoaDonChiTiet.phiVanChuyen
      if (hoaDonChiTiet.voucherGiam) {
        tongTien -= hoaDonChiTiet.voucherGiam.giaTriGiam
      }
      if (tongTien < 0) {
        openNotification("error", "Hệ thống", "Hóa đơn " + hoaDonChiTiet.maHoaDon + " tổng tiền thanh toán nhỏ hơn 0đ", "bottomRight");
        return false
      }
    }
    return true
  }
  async function handleXacNhanHoaDon() {

    if (selectedRowKeys.length == 0) {
      openNotification("error", "Hệ thống", "Chưa chọn hóa đơn", "bottomRight");
      return;
    }
    if (!handleCheckGia()) {
      return
    }
    const ketQua = await useHoaDonChoStore.actions.xacNhanHoaDon(
      selectedRowKeys
    );
    if (ketQua.data.status == "THANHCONG") {
      for (var item of ketQua.data.data) {
        openNotification(
          "error",
          "Hệ thống",
          "Hóa đơn" + item + "sản phẩm đã hết hàng",
          "bottomRight"
        );
        return;
      }
      openNotification(
        "success",
        "Hệ thống",
        "Xác nhận thành công",
        "bottomRight"
      );
      layDuLieu();
    } else {
      openNotification("error", "Hệ thống", "Lỗi", "bottomRight");
    }
    setSelectedRowKeys([]);
  }
  async function handleHuy() {
    if (selectedRowKeys.length == 0) {
      openNotification("error", "Hệ thống", "Chưa chọn hóa đơn", "bottomRight");
      return;
    }
    const ketQua = await useHoaDonChoStore.actions.huyHoaDon(selectedRowKeys);
    if (ketQua.data.status == "THANHCONG") {
      openNotification("success", "Hệ thống", "Hủy thành công", "bottomRight");
      layDuLieu();
    } else {
      openNotification("error", "Hệ thống", "Lỗi", "bottomRight");
    }
    setSelectedRowKeys([]);
  }
  return (
    <>
      {contextHolder}
      <div className="choxacnhan">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sapXepTheoNgayTao(data)}
        />
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" danger onClick={showModal2}>
            Hủy
          </Button>
          <Button
            style={{
              marginLeft: "12px",
            }}
            type="primary"
            onClick={showModal}
          >
            Xác nhận
          </Button>
          <Modal
            title="Xác nhận hóa đơn"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
          >
            <p>Bạn có chắc muốn xác nhận hóa đơn</p>
          </Modal>
          <Modal
            title="Xác nhận hủy hóa đơn"
            open={isModalOpen2}
            onOk={handleOk2}
            onCancel={handleCancel2}
            centered
          >
            <p>Bạn có chắc muốn hủy hóa đơn</p>
          </Modal>
        </Row>
      </div>
    </>
  );
}

export default ChoGiaoHang;

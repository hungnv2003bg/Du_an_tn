import "./style.css";
import MenuAdmin from "../layout/menu/MenuAdmin";
import Header from "../layout/header/Header";
import React, { useEffect, useRef, useState } from "react";
import { } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import "./style.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { useVoucher } from "./useVoucher";
import { fixNgayThang } from "../../../extensions/fixNgayThang";
import { fixMoney } from "../../../extensions/fixMoney";
import ModalThem from "./ModalThem";
import ModalSua from "./ModalSua";
import { fixTrangThaiVoucher } from "../../../extensions/fixTrangThaiVoucher";
import ModalNguoiDungCuaVoucher from "./ModalNguoiDungCuaVoucher";
function Voucher2() {
  const searchInput = useRef(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
          placeholder={`Search ${dataIndex}`}
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
            Tìm
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
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
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
      title: "Mã Voucher",
      dataIndex: "maVoucher",
      width: "10%",
      ...getColumnSearchProps("maVoucher"),
      render: (maSanPham) => (
        <>
          <Tag color="success"> {maSanPham}</Tag>
        </>
      ),
    },
    {
      title: "Tên voucher",
      dataIndex: "tenVoucher",
      width: "10%",
      ...getColumnSearchProps("tenVoucher"),
      render: (tenVoucher) => <>{tenVoucher}</>,
    },
    {
      title: "Số lượng tạo",
      dataIndex: "soLuong",
      width: "10%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      width: "15%",
      render: (ngayTao) => (
        <>
          <span>{fixNgayThang(ngayTao)}</span>
        </>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngayKetThuc",
      width: "15%",
      render: (ngayKetThuc) => (
        <>
          <span>{fixNgayThang(ngayKetThuc)}</span>
        </>
      ),
    },
    {
      title: "Giá trị voucher",
      dataIndex: "giaTriGiam",
      width: "15%",
      render: (giaTriGiam) => (
        <>
          <span>{fixMoney(giaTriGiam)}</span>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      width: "10%",
      render: (trangThai) => (
        <>
          {trangThai === "DIENRA" ? (
            <Tag color="success"> {fixTrangThaiVoucher(trangThai)}</Tag>
          ) : (
            <Tag color="error"> {fixTrangThaiVoucher(trangThai)}</Tag>
          )}
        </>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "trangThai",
      width: "15%",
      render: (trangThai, record) => (
        <>
          <div>
            <ModalSua duLieu={record} fetchData={handleLayDuLieu} />
            {trangThai === "DIENRA" && <ModalNguoiDungCuaVoucher voucherId={record.id} />}
          </div>
        </>
      ),
    },
  ];
  const [data, setData] = useState(undefined);
  async function handleLayDuLieu() {
    const data = await useVoucher.actions.layVouchet();
    setData(data.data);
  }
  useEffect(() => {
    handleLayDuLieu();
  }, []);

  return (
    <>
      <Header />
      <MenuAdmin />
      <div className="body-container">
        <div className="content">
          <div className="content-hoadon">
            <div className="modalThem">
              <ModalThem fetchData={handleLayDuLieu} />
            </div>
            <Table
              columns={columns}
              dataSource={data}
              onChange={null}
              pagination={{
                position: ["bottomRight"],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Voucher2;

import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import { selectLanguage } from "../../../language/selectLanguage";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Image, Input, Space, Table, Tag } from "antd";
import { useSanPhamStore } from "./useSanPhamStore";
import { BsFillPencilFill } from "react-icons/bs";
import ModalThemSua from "./ModalThemSua";
import ModalView from "./ModalView";
import ModalSua from "./ModalSua";
function Product() {
  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
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
  const [filter, setFilter] = useState({
    thietKe: [],
    nhomSanPham: [],
    chatLieu: [],
  });
  const [sanPham, setSanPham] = useState(undefined);
  const [filteredInfo, setFilteredInfo] = useState({});
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "maSanPham",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("maSanPham"),
      render: (maSanPham) => (
        <>
          <Tag color="success"> {maSanPham}</Tag>
        </>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh1",
      key: "age",
      width: "10%",
      render: (hinhAnh1) => (
        <Image src={hinhAnh1} style={{ width: "120px", height: "180px" }} />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "address",
      width: "30%",
      ...getColumnSearchProps("tenSanPham"),
    },
    {
      title: "SLT",
      dataIndex: "soLuongTon",
      key: "address",
      width: "5%",
      sorter: (a, b) => a.soLuongTon - b.soLuongTon,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Chất liệu",
      dataIndex: "chatLieu",
      key: "address",
      width: "10%",
      render: (chatLieu) => <span>{chatLieu.tenChatLieu}</span>,
      // filters: filter.chatLieu,
      // filteredValue: filteredInfo.address || null,
      // onFilter: (value, record) => record.chatLieu.tenChatLieu.includes(value),
    },
    {
      title: "Nhóm sản phẩm",
      dataIndex: "nhomSanPham",
      key: "address",
      width: "10%",
      render: (nhomSanPham) => <span>{nhomSanPham.tenNhom}</span>,
      // filters: filter.nhomSanPham,
      // filteredValue: filteredInfo.address || null,
      // onFilter: (value, record) => record.nhomSanPham.tenNhom.includes(value),
    },
    {
      title: "Thiết kế",
      dataIndex: "thietKe",
      key: "address",
      width: "10%",
      render: (thietKe) => <span>{thietKe.tenThietKe}</span>,
      // filters: filter.thietKe,
      // filteredValue: filteredInfo.address || null,
      // onFilter: (value, record) => record.thietKe.tenThietKe.includes(value),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "maThietKe",
      align: "center",
      width: "15%",
      render: (id) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ModalView id={id} />
          <ModalSua id={id} thuocTinh={thuocTinh} setData={fetchData} />
        </div>
      ),
    },
  ];
  function handleSetFilter(source) {
    if (!source) {
      return
    }
    const thietKe = [];
    const nhomSanPham = [];
    const chatLieu = [];
    for (var item of source) {
      if (
        !thietKe.some((item2) => {
          return item2.id == item.thietKe.id;
        })
      ) {
        thietKe.push({
          id: item.thietKe.id,
          text: item.thietKe.tenThietKe,
          value: item.thietKe.tenThietKe,
        });
      }
    }
    if (
      !nhomSanPham.some((item2) => {
        return item2.id == item.nhomSanPham.id;
      })
    ) {
      nhomSanPham.push({
        id: item.nhomSanPham.id,
        text: item.nhomSanPham.tenNhom,
        value: item.nhomSanPham.tenNhom,
      });
    }
    if (
      !chatLieu.some((item2) => {
        return item2.id == item.chatLieu.id;
      })
    ) {
      chatLieu.push({
        id: item.chatLieu.id,
        text: item.chatLieu.tenChatLieu,
        value: item.chatLieu.tenChatLieu,
      });
    }
    setFilter({
      thietKe: thietKe,
      nhomSanPham: nhomSanPham,
      chatLieu: chatLieu,
    });
  }
  const [thuocTinh, setThuocTinh] = useState(undefined);
  const fetchData = async () => {
    const data = await useSanPhamStore.actions.layHetSanPham();
    if (data.data.data.length == 0) {
      return
    }
    setSanPham(data.data.data);
    handleSetFilter(data.data.data);
    // dispath(productSlice.actions.setSanPham(data));
    // dispath(productSlice.actions.setIsLoading(false));
  };
  useEffect(() => {
    // dispath(productSlice.actions.setIsLoading(true));
    const fetchThuocTinh = async () => {
      const data = await useSanPhamStore.actions.fetchThuocTinh();
      setThuocTinh(data.data);
    };
    fetchData();
    fetchThuocTinh();
  }, []);
  const onChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
    console.log(filters);
  };
  return (
    <>
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <div className="modalThem">
              <ModalThemSua
                type={1}
                thuocTinh={thuocTinh}
                fetchData={fetchData}
              />
            </div>
            <div className="table-sanpham background-color">
              <Table
                columns={columns}
                dataSource={sanPham}
                onChange={onChange}
                pagination={{
                  position: ["bottomRight"],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

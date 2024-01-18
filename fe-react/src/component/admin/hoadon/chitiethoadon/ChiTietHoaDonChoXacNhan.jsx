import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import React, { useEffect, useState } from "react";
import { selectLanguage } from "../../../../language/selectLanguage";
import { fixMoney } from "../../../../extensions/fixMoney";
import {
  Button,
  Col,
  Divider,
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
import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";
import Highlighter from "react-highlight-words";
import { useChiTietHoaDonStore } from "./useChiTietHoaDonStore";
import { IoEyeSharp } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePostAdd } from "react-icons/md";
import ModalView from "../../product/sanphamchitiet/ModalView";
import AddSanPham from "./AddSanPham";
import { useGHN } from "../../../../plugins/ghnapi";
import InHoaDon from "../InHoaDon";
import { fixNgayThang } from "../../../../extensions/fixNgayThang";
import { useNguoiDungStore } from "../../../home/profile/useNguoiDungStore";
import ModalThemDiaChi from "./ModalThemDiaChi";
import ModalXoaChiTiet from "./ModalXoaChiTiet";
import ModalChonVoucher from "../../bantaiquay/ModalChonVoucher";
import ModalDoiVoucher from "./ModalDoiVoucher";
function ChiTietHoaDonChoXacNhan({
  fetHoaDon,
  hoaDonId,
  type2 = false,
  type = false,
  showDoi = false,
  tuChoi = false,
  isChoXacNhan = true,
}) {
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
  const [isModalDiaChi, setModalDiaChi] = useState(false);

  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [hoaDonChiTiet, setHoaDonChiTiet] = useState(undefined);
  async function layDuLieu() {
    const data = await useChiTietHoaDonStore.actions.layChiTiet(hoaDonId);
    setHoaDonChiTiet(data.data.data);
  }

  const [data, setData] = useState(undefined);
  async function layDuLieu2() {
    const data = await useChiTietHoaDonStore.actions.fetchChatLieu();
    setData(data.data.data);
  }
  useEffect(() => {
    if (isModalOpen) {
      layDuLieu();
    }
    if (isModalOpen3) {
      layDuLieu2();
    }
    if (isModalDiaChi) {
      handleLayDiaChi();
    }
  }, [isModalOpen, isModalOpen3, isModalDiaChi]);
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
  async function handleThayDoiSoLuong(e, record) {
    if (e > record.sanPhamChiTiet.sanPham.soLuongTon) {
      openNotification("error", "Hệ thống", "Không đủ sản phẩm", "bottomRight");
      return;
    }
    await useChiTietHoaDonStore.actions.thayDoiSoLuong({
      chiTietId: record.id,
      soLuongMoi: e,
    });
    handleLayPhiVanChuyenGHN();
    fetHoaDon();
  }

  const columns2 = [
    {
      title: "Màu sắc",
      dataIndex: "mauSac",
      key: "mauSac",
      width: "12.5%",
      render: (mauSac) => <>{mauSac.tenMau}</>,
    },
    {
      title: "Kích thước",
      dataIndex: "kichThuoc",
      key: "kichThuoc",
      width: "12.5%",
      render: (kichThuoc) => <>{kichThuoc.tenKichThuoc}</>,
    },
    {
      title: "Số lượng tồn",
      dataIndex: "soLuongTon",
      key: "soLuongTon",
      width: "10%",
      render: (soLuongTon) => <>{soLuongTon ? soLuongTon : 0}</>,
    },
    {
      title: "Đã bán",
      dataIndex: "soLuongDaBan",
      key: "soLuongDaBan",
      width: "10%",
      render: (soLuongDaBan) => <>{soLuongDaBan ? soLuongDaBan : 0}</>,
    },
    {
      title: "Số lượng lỗi",
      dataIndex: "soLuongLoi",
      key: "soLuongLoi",
      width: "10%",
      render: (soLuongLoi) => <>{soLuongLoi ? soLuongLoi : 0}</>,
    },
    {
      title: "Số lượng trả hàng",
      dataIndex: "soLuongTraHang",
      key: "soLuongTraHang",
      width: "10%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      width: "10%",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
      width: "10%",
      render: (ngayCapNhat) => (
        <>{ngayCapNhat ? ngayCapNhat : <Tag color="processing">Mới</Tag>}</>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "maThietKe",
      align: "center",
      width: "15%",
      render: (id, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ModalView id={id} />
          <AddSanPham
            id={id}
            hoaDonId={hoaDonId}
            setData={handleLayPhiVanChuyenGHN}
            record={record}
          />
        </div>
      ),
    },
  ];

  //
  const columnsDoi = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "sanPhamChiTiet",
      key: "name",
      width: "15%",
      render: (sanPhamChiTiet) => (
        <Image
          src={sanPhamChiTiet.hinhAnh}
          style={{ width: "120px", height: "180px" }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "sanPhamChiTiet",
      key: "sanPhamChiTiet",
      width: "35%",
      render: (sanPhamChiTiet) => (
        <span>
          {sanPhamChiTiet.sanPham.tenSanPham}
          <Tag color="success">{sanPhamChiTiet.mauSac.tenMau}</Tag>
          <Tag color="processing">{sanPhamChiTiet.kichThuoc.tenKichThuoc}</Tag>
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      width: "10%",
      render: (soLuong, record) => (
        <InputNumber
          min={0}
          max={record.sanPhamChiTiet.soLuongTon}
          value={soLuong}
          disabled={isChoXacNhan}
          onChange={(e) => {
            if (!e) {
              return;
            }
            if (!isNaN(e)) {
              handleThayDoiSoLuong(e, record);
              fetHoaDon();
            } else {
              return;
            }
          }}
        />
      ),
    },
    {
      title: "Số lượng tồn",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (id, record) => <>{record.sanPhamChiTiet.soLuongTon}</>,
    },
    {
      title: "Giá nhập",
      dataIndex: "sanPhamChiTiet",
      key: "sanPhamChiTiet",
      width: "10%",
      render: (sanPhamChiTiet) => (
        <span>{fixMoney(sanPhamChiTiet.sanPham.giaNhap)}</span>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
      width: "10%",
      render: (donGia) => <span>{fixMoney(donGia)}</span>,
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (id) => (
        <>
          <ModalXoaChiTiet id={id} fetData={layDuLieu} fetHoaDon={fetHoaDon} />
        </>
      ),
    },
  ];
  //

  const [dataChiTiet, setDataChiTiet] = useState(undefined);
  async function handleSearchSelect(e) {
    const data =
      await useChiTietHoaDonStore.actions.fetchSanPhamChiTietCuaSanPham(
        e.value
      );
    setDataChiTiet(data.data.data);
  }
  async function handleLayPhiVanChuyenGHN() {
    if (hoaDonChiTiet.phuongThucVanChuyen.maPhuongThuc == "GHN") {
      const giaShip = await useGHN.actions.layGia({
        gia: hoaDonChiTiet.giaTriHd - hoaDonChiTiet.phiVanChuyen,
        denHuyen: hoaDonChiTiet.diaChiGiao.id % 2 === 0 ? "1444" : "1204",
        denXa: hoaDonChiTiet.diaChiGiao.id % 2 === 0 ? "20314" : "120416",
      });
      await useChiTietHoaDonStore.actions.thayDoiPhiVanChuyen({
        phiVanChuyenMoi: giaShip.data.data.total,
        hoaDonId: hoaDonId,
      });
    }
    layDuLieu();
  }
  const [diaChi, setDiaChi] = useState(undefined);
  async function handleLayDiaChi() {
    const data = await useNguoiDungStore.actions.layDiaChiNguoiDung(
      hoaDonChiTiet.nguoiMua.id
    );
    setDiaChi(data.data);
  }
  async function handleDoiDiaChi(diaChiId) {
    const data = await useChiTietHoaDonStore.actions.doiDiaChi({
      diaChiId: diaChiId,
      hoaDonId: hoaDonId,
    });
    layDuLieu();
    setModalDiaChi(false);
    openNotification(
      "success",
      "Hệ thống",
      "Đổi địa chỉ thành công!",
      "bottomRight"
    );
    handleLayPhiVanChuyenGHN();
    fetHoaDon();
  }
  return (
    <>
      {contextHolder}
      <Tooltip title="Xem" onClick={showModal}>
        <Button
          style={{
            color: "blue",
          }}
          shape="circle"
          icon={<IoEyeSharp />}
        />
      </Tooltip>
      <Modal
        title="Chọn địa chỉ"
        width={768}
        open={isModalDiaChi}
        onOk={() => {
          setModalDiaChi(false);
        }}
        onCancel={() => {
          setModalDiaChi(false);
        }}
        centered
      >
        <ModalThemDiaChi
          fetData={handleLayDiaChi}
          idNguoiDung={hoaDonChiTiet && hoaDonChiTiet.nguoiMua.id}
        />
        {diaChi &&
          diaChi.map((item) => {
            return (
              <>
                <Row>
                  <Col span={24}>
                    <p>
                      {item.hoNguoiNhan + " " + item.nguoiNhan + " "}|{" "}
                      {item.soDienThoai}
                      <Tag
                        color="blue"
                        style={{
                          marginLeft: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDoiDiaChi(item.id);
                        }}
                      >
                        Chọn
                      </Tag>
                    </p>
                  </Col>
                  <Col span={24}>
                    <p>{item.chiTietDiaChi}</p>
                  </Col>
                  <Col span={24}>
                    <p>{item.xa + ", " + item.huyen + ", " + item.tinh}</p>
                  </Col>
                  <Col span={24}>
                    <Tag color="#2db7f5">{fixNgayThang(item.ngayTao)}</Tag>
                  </Col>
                </Row>
                <Divider />
              </>
            );
          })}
      </Modal>
      {hoaDonChiTiet ? (
        <Modal
          cancelButtonProps={{ style: { display: "none" } }}
          width={1028}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row>
            <h6>Thông tin hóa đơn</h6>
            <Col
              style={{
                marginTop: "4px",
              }}
              span={24}
            >
              {!type && <InHoaDon data={hoaDonChiTiet} />}
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Mã HĐ:
            </Col>
            <Col span={8}>
              <Input placeholder="" disabled value={hoaDonChiTiet.maHoaDon} />
            </Col>
            <Col span={3} offset={1}>
              Giá trị:
            </Col>
            <Col span={8}>
              <Input
                disabled
                value={fixMoney(
                  hoaDonChiTiet.hoaDonChiTietList.reduce((pre, cur) => {
                    return pre + cur.soLuong * cur.donGia;
                  }, 0)
                )}
              />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Trạng thái:
            </Col>
            <Col span={8}>
              <Input placeholder="" disabled value={hoaDonChiTiet.trangThai} />
            </Col>
            <Col span={3} offset={1}>
              Ngày giao:
            </Col>
            <Col span={8}>
              <Input
                disabled
                value={
                  hoaDonChiTiet.ngayGiao
                    ? fixNgayThang(hoaDonChiTiet.ngayGiao)
                    : "Chưa giao"
                }
              />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Ngày tạo:
            </Col>
            <Col span={8}>
              <Input
                placeholder=""
                disabled
                value={
                  hoaDonChiTiet.ngayTao && fixNgayThang(hoaDonChiTiet.ngayTao)
                }
              />
            </Col>
            <Col span={3} offset={1}>
              Ngày cập nhật:
            </Col>
            <Col span={8}>
              <Input
                disabled
                value={
                  hoaDonChiTiet.ngayCapNhat &&
                  fixNgayThang(hoaDonChiTiet.ngayCapNhat)
                }
              />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
              marginBottom: "14px",
            }}
          >
            {" "}
            <Col span={3}>Ghi chú:</Col>
            <Col span={20} style={{}}>
              {" "}
              <TextArea
                rows={4}
                disabled
                value={hoaDonChiTiet.ghiChu}
                maxLength={6}
              />
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "14px",
            }}
          >
            <h6>Thông tin khách hàng</h6>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Tên khách hàng:
            </Col>
            <Col span={8}>
              <Input
                placeholder=""
                disabled
                value={
                  hoaDonChiTiet.nguoiMua.ho + " " + hoaDonChiTiet.nguoiMua.ten
                }
              />
            </Col>
            <Col span={3} offset={1}>
              Mã khách hàng:
            </Col>
            <Col span={8}>
              <Input disabled value={hoaDonChiTiet.nguoiMua.maNguoiDung} />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Email:
            </Col>
            <Col span={8}>
              <Input disabled value={hoaDonChiTiet.nguoiMua.email} />
            </Col>
            <Col span={3} offset={1}>
              Số điện thoại:
            </Col>
            <Col span={8}>
              <Input disabled value={hoaDonChiTiet.nguoiMua.soDienThoai} />
            </Col>
          </Row>

          <Row
            style={{
              marginTop: "8px",
            }}
          >
            <h6>
              Thông tin giao hàng{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "blue",
                  fontSize: "14px",
                }}
                onClick={() => {
                  setModalDiaChi(true);
                }}
              >
                đổi địa chỉ
              </span>
            </h6>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
              marginBottom: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Họ tên người nhận:
            </Col>
            <Col span={6}>
              <Input
                disabled
                value={
                  hoaDonChiTiet.diaChiGiao &&
                  hoaDonChiTiet.diaChiGiao.hoNguoiNhan +
                    " " +
                    hoaDonChiTiet.diaChiGiao.nguoiNhan
                }
              />
            </Col>
            <Col span={3} style={{}} offset={1}>
              SDT người nhận:
            </Col>
            <Col span={6}>
              <Input
                disabled
                value={
                  hoaDonChiTiet.diaChiGiao &&
                  hoaDonChiTiet.diaChiGiao.soDienThoai
                }
              />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
              marginBottom: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Xã:
            </Col>
            <Col span={4}>
              <Input
                disabled
                value={hoaDonChiTiet.diaChiGiao && hoaDonChiTiet.diaChiGiao.xa}
              />
            </Col>
            <Col span={2} offset={1}>
              Huyện:
            </Col>
            <Col span={4}>
              <Input
                disabled
                value={
                  hoaDonChiTiet.diaChiGiao && hoaDonChiTiet.diaChiGiao.huyen
                }
              />
            </Col>
            <Col span={2} offset={1}>
              Tỉnh:
            </Col>
            <Col span={4}>
              <Input
                disabled
                value={
                  hoaDonChiTiet.diaChiGiao && hoaDonChiTiet.diaChiGiao.tinh
                }
              />
            </Col>
          </Row>

          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
            }}
          >
            <Col span={24} style={{}}>
              Chi tiết địa chỉ:
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
              marginBottom: "14px",
            }}
          >
            <Col span={23} style={{}}>
              {" "}
              <TextArea
                rows={4}
                disabled
                value={
                  hoaDonChiTiet.diaChiGiao &&
                  hoaDonChiTiet.diaChiGiao.chiTietDiaChi
                }
                maxLength={6}
              />
            </Col>
          </Row>
          <Row>
            <h6>Phương thức giao hàng</h6>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
              marginBottom: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Phương thức:
            </Col>
            <Col span={8}>
              <Input
                disabled
                value={hoaDonChiTiet.phuongThucVanChuyen.tenPhuongThuc}
              />
            </Col>
            <Col span={3} style={{}} offset={1}>
              Phí vận chuyển:
            </Col>
            <Col span={8}>
              <Input
                disabled
                value={fixMoney(
                  hoaDonChiTiet.phiVanChuyen ? hoaDonChiTiet.phiVanChuyen : 0
                )}
              />
            </Col>
          </Row>
          <Row>
            <ModalDoiVoucher
              fetData={layDuLieu}
              hoaDonId={hoaDonChiTiet.id}
              khachHang={hoaDonChiTiet.nguoiMua}
            />
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
              marginBottom: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Mã giảm giá:
            </Col>
            <Col span={8}>
              <Input
                disabled
                value={
                  hoaDonChiTiet.voucherGiam
                    ? hoaDonChiTiet.voucherGiam.voucher.tenVoucher
                    : "Chưa chọn"
                }
              />
            </Col>
            <Col span={3} style={{}} offset={1}>
              Giá trị giảm:
            </Col>
            <Col span={8}>
              <Input
                disabled
                value={
                  hoaDonChiTiet.voucherGiam
                    ? fixMoney(hoaDonChiTiet.voucherGiam.giaTriGiam)
                    : 0
                }
              />
            </Col>
          </Row>
          <Row>
            <h6>Phương thức thanh toán</h6>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
              marginBottom: "14px",
            }}
          >
            <Col span={3} style={{}}>
              Phương thức:
            </Col>
            <Col span={8}>
              <Input
                disabled
                value={hoaDonChiTiet.phuongThucThanhToan.tenPhuongThuc}
              />
            </Col>
            <Col span={3} style={{}} offset={1}>
              Số tiền:
            </Col>
            <Col span={8}>
              <Input
                disabled
                value={fixMoney(
                  hoaDonChiTiet.hoaDonChiTietList.reduce((pre, cur) => {
                    return pre + cur.soLuong * cur.donGia;
                  }, 0) +
                    hoaDonChiTiet.phiVanChuyen -
                    (hoaDonChiTiet.voucherGiam
                      ? hoaDonChiTiet.voucherGiam.giaTriGiam
                      : 0)
                )}
              />
            </Col>
          </Row>
          {tuChoi && (
            <Row>
              <Col span={24}>
                <h6>Lý do từ chối</h6>
              </Col>
              <Col
                span={23}
                style={{
                  marginTop: "12px",
                  marginBottom: "12px",
                }}
              >
                <TextArea
                  rows={4}
                  disabled
                  value={hoaDonChiTiet.lyDoTuChoiDoi}
                  maxLength={6}
                />
              </Col>
            </Row>
          )}

          <Row>
            <Col span={11}>
              <h6>Thông tin sản phẩm </h6>
            </Col>
            {type2 ? (
              <Col
                span={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  icon={<MdOutlinePostAdd />}
                  onClick={setIsModalOpen3}
                  title="Thêm sản phẩm"
                  type="primary"
                >
                  Thêm sản phẩm
                </Button>
                <Modal
                  width={1268}
                  title="Thêm sản phẩm"
                  open={isModalOpen3}
                  onOk={() => {
                    setIsModalOpen3(false);
                  }}
                  onCancel={() => {
                    setIsModalOpen3(false);
                  }}
                  centered
                >
                  <Row>
                    <Col span={12}>
                      <Select
                        style={{
                          width: "100%",
                        }}
                        showSearch
                        labelInValue
                        defaultValue={"Chọn sản phẩm"}
                        onChange={handleSearchSelect}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {data
                          ? data.map((option) => (
                              <Select.Option key={option.id} value={option.id}>
                                {option.tenSanPham}
                              </Select.Option>
                            ))
                          : ""}
                      </Select>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                    }}
                  >
                    <Col span={24}>
                      <Table
                        columns={columns2}
                        dataSource={dataChiTiet}
                        pagination={{ pageSize: 10 }}
                      />
                    </Col>
                  </Row>
                </Modal>
              </Col>
            ) : (
              ""
            )}
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "14px",
              marginBottom: "14px",
            }}
          >
            <Col span={23}>
              <Table
                columns={columnsDoi}
                dataSource={hoaDonChiTiet.hoaDonChiTietList}
              />
            </Col>
          </Row>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default ChiTietHoaDonChoXacNhan;

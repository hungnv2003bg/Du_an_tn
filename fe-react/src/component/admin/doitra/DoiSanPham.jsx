import {
    Button,
    Col,
    Image,
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
import "./style.css";
import React, { useEffect, useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import QRCodeDoiTra from "./QRCodeDoiTra";
import { GrScan } from "react-icons/gr";
import { useBanTaiQuayStore } from "../bantaiquay/useBanTaiQuayStore";
import { useDoiTra } from "./useDoiTra";
import { fixMoney } from "../../../extensions/fixMoney";
import { AiOutlineDelete } from "react-icons/ai";
function DoiSanPham({ dataDoi, setSanPhamDoi }) {
    const formatter = value => {
        if (value === '' || value === undefined) {
            return value;
        }
        return String(parseInt(value, 10));
    };

    // Hàm parser để trả về giá trị số nguyên
    const parser = value => {
        if (value === '' || value === undefined) {
            return value;
        }
        return parseInt(value, 10);
    };
    const [isShow, setIsShow] = useState(false);
    const [sanPhamChiTiet, setSanPhamChiTiet] = useState(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [modal, setModal] = useState([]);
    const openNotification = (type, title, des, placement) => {
        if (type === "error") {
            api.error({
                message: title,
                description: des,
                placement,
            });
        }
        if (type === "warning") {
            api.warning({
                message: title,
                description: des,
                placement,
            });
        }
        if (type === "success") {
            api.success({
                message: title,
                description: des,
                placement,
            });
        }
    };
    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            key: "hinhAnh",
            render: (hinhAnh) => (
                <Image src={hinhAnh} style={{ width: "80px", height: "120px" }} />
            ),
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "tenSanPham",
            key: "tenSanPham",
            render: (tenSanPham) => <span>{tenSanPham}</span>,
        },
        {
            title: "Số lượng",
            render: (tenSanPham, record, number) => (
                <InputNumber
                    formatter={formatter}
                    parser={parser}
                    onChange={(e) => {
                        if (!e) {
                            return
                        }
                        if (isNaN(e)) {
                            return
                        }
                        data[number].soLuongDoi = e
                        setData([...data])
                    }}
                    min={1}
                    value={data[number].soLuongDoi}
                    max={record.soLuongTon}
                />
            ),
        },
        {
            title: "Đơn giá",
            dataIndex: "giaBan",
            key: "giaBan",
            render: (giaBan) => <span>{fixMoney(giaBan)}</span>,
        },
        {
            title: "Số lượng tồn",
            dataIndex: "soLuongTon",
            key: "soLuongTon",
            render: (soLuongTon) => <span>{soLuongTon}</span>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record, number) => (
                <>
                    <Tooltip title="Xóa">
                        <Button
                            danger
                            shape="circle"
                            onClick={() => {
                                modal[number] = true;
                                setModal([...modal]);
                            }}
                            icon={<AiOutlineDelete />}
                        />
                    </Tooltip>
                    <Modal
                        title="Xóa sản phẩm"
                        open={modal[number]}
                        onCancel={() => {
                            modal[number] = false;
                            setModal([...modal]);
                        }}
                        onOk={() => {
                            var mang = data.filter((item) => {
                                return item.id !== data[number].id;
                            });
                            modal[number] = false;
                            setData(mang);
                            setModal([...modal]);
                        }}
                        centered
                    ></Modal>
                </>
            ),
        },
    ];
    async function handleChonSanPham(e) {
        const dataSearch = await useDoiTra.actions.laySanPhamChiTietById(e.key);
        if (dataSearch.data) {
            if (
                data.some((item) => {
                    return item.id === dataSearch.data.id;
                })
            ) {
                openNotification(
                    "warning",
                    "Hệ thống",
                    "Sản phẩm đã có",
                    "bottomRight"
                );
                return;
            }
            if (dataSearch.data.soLuongTon <= 0) {
                openNotification(
                    "error",
                    "Hệ thống",
                    "Sản phẩm hết hàng",
                    "bottomRight"
                );
                return;
            }
            setData([...data, dataSearch.data]);
        }
    }
    function handleChonSanPham2(data2) {
        if (
            data.some((item) => {
                return item.id === data2.id;
            })
        ) {
            openNotification("warning", "Hệ thống", "Sản phẩm đã có", "bottomRight");
            return;
        }
        openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
        setData([...data, data2]);
        return;
    }
    async function layDuLieuSanPham() {
        const data = await useBanTaiQuayStore.actions.fetSanPhamChiTiet();
        setSanPhamChiTiet(data.data);
    }
    useEffect(() => {
        layDuLieuSanPham();
    }, []);
    return (
        <>
            {contextHolder}
            <Tooltip
                title="Đổi sản phẩm"
            >
                <Button
                    style={{
                        color: "green",
                        width: "200px",
                        marginTop: "4px",
                    }}
                    onClick={() => {
                        setIsShow(true);
                    }}
                    icon={<FaRegPenToSquare />}
                >
                    Đổi sản phẩm
                </Button>
                {data &&
                    data.map((item) => {
                        return (
                            <>
                                <div>
                                    <span>{item.tenSanPham} X</span>
                                    <span style={{
                                        color: 'red'
                                    }}>{item.soLuongDoi}</span>
                                </div>
                            </>
                        );
                    })}
            </Tooltip>
            <Modal
                title="Đổi sản phẩm"
                open={isShow}
                width={1268}
                onOk={() => {
                    for (var item of data) {
                        if (!item.soLuongDoi) {
                            openNotification(
                                "error",
                                "Hệ thống",
                                "Chưa chọn số lượng",
                                "bottomRight"
                            );
                            return;
                        }
                    }
                    setSanPhamDoi([...data]);
                    setIsShow(false);
                }}
                onCancel={() => {
                    setIsShow(false);
                }}
            >
                <Row
                    style={{
                        marginBottom: "12px",
                    }}
                >
                    <Col span={18}>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            showSearch
                            labelInValue
                            defaultValue={"Chọn sản phẩm"}
                            onChange={handleChonSanPham}
                            filterOption={(input, option) =>
                                option.children[0].toLowerCase().indexOf(input.toLowerCase()) >=
                                0
                            }
                        >
                            {sanPhamChiTiet
                                ? sanPhamChiTiet.map((option) => (
                                    <Select.Option key={option.id} value={option.id}>
                                        {option.tenSanPham}
                                        <Tag
                                            color="success"
                                            style={{
                                                marginLeft: "4px",
                                            }}
                                        >
                                            {option.mauSac.tenMau}
                                        </Tag>
                                        <Tag color="processing">
                                            {option.kichThuoc.tenKichThuoc}
                                        </Tag>
                                        <span
                                            style={{
                                                fontWeight: "700",
                                                marginLeft: "12px",
                                            }}
                                        >
                                            Số lượng còn: {option.soLuongTon}
                                        </span>
                                    </Select.Option>
                                ))
                                : ""}
                        </Select>
                    </Col>
                    <Col span={3} offset={1}>
                        <Button
                            icon={<GrScan />}
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        >
                            Quét mã
                        </Button>
                        {isOpen && (
                            <QRCodeDoiTra
                                setOpen={setIsOpen}
                                open={isOpen}
                                handleChonSanPham={handleChonSanPham2}
                            />
                        )}
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={data}
                    style={{
                        width: "100%",
                    }}
                />
            </Modal>
        </>
    );
}

export default DoiSanPham;

import {
    Button,
    Modal,
    Table,
    Tooltip,
    notification,
} from "antd";
import "./style.css";
import React, { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { useVoucher } from "./useVoucher";
import ModalThemVoucherChoNguoiDung from "./ModalThemVoucherChoNguoiDung";
import ModalThemToanHeThong from "./ModalThemToanHeThong";
import ModalThemCho1CaNhan from "./ModalThemCho1CaNhan";
function ModalNguoiDungCuaVoucher({ voucherId }) {
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
    const columns = [
        {
            title: "Người dùng",
            dataIndex: "nguoiDungDTO",
            width: "30%",
            render: (nguoiDungDTO, record) => (
                <>
                    <div style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>

                        <div style={{
                            height: '40px',
                            width: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            borderRadius: "50%",
                            border: "1px solid black"
                        }}>
                            <img src={nguoiDungDTO.anhDaiDien} style={{ width: "auto", height: "40px" }} />
                        </div>
                        <span style={{
                            lineHeight: "40px",
                            marginLeft: "4px"
                        }}>{nguoiDungDTO.ho + " " + nguoiDungDTO.ten}</span>
                    </div>
                </>
            ),
        },
        {
            title: "Đã sử dụng",
            dataIndex: "daDung",
            width: "13.33%",
            render: (daDung) => (
                <>
                    <div>
                        {daDung}
                    </div>
                </>
            ),
        },
        {
            title: "Chưa dùng",
            dataIndex: "chuaDung",
            width: "13.33%",
            render: (chuaDung) => (
                <>
                    <div>
                        {chuaDung}
                    </div>
                </>
            ),
        },
        {
            title: "Hết hạn",
            dataIndex: "hetHan",
            width: "13.33%",
            render: (hetHan) => (
                <>
                    <div>
                        {hetHan}
                    </div>
                </>
            ),
        },
        {
            title: "Tổng số lượng",
            dataIndex: "chuaDung",
            width: "15%",
            render: (chuaDung, record) => (
                <>
                    {record.daDung + record.chuaDung + record.hetHan}
                </>
            ),
        },
        {
            title: "Thao tác",
            dataIndex: "nguoiDungDTO",
            width: "15%",
            render: (nguoiDungDTO, record) => (
                <>
                    <ModalThemVoucherChoNguoiDung nguoiDungId={nguoiDungDTO.id} voucherId={voucherId} fetchData={handleLayNguoiDung} />
                </>
            ),
        },
    ]
    const [data, setData] = useState(undefined)
    const [isModalOpen, setIsModalOpen] = useState(false);
    async function handleLayNguoiDung() {
        const data = await useVoucher.actions.layNguoiDungVoucher(voucherId)
        setData(data.data)
    }
    useEffect(() => {
        if (isModalOpen) {
            handleLayNguoiDung()
        }
    }, [isModalOpen])
    return (
        <>
            {contextHolder}
            <Tooltip title="Thông tin">
                <Button
                    style={{
                        color: "green",
                    }}
                    shape="circle"
                    icon={<MdInfoOutline />}
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                />
            </Tooltip>
            <Modal
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
                title={"Thông tin"}
                open={isModalOpen}
                onOk={() => { }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                centered
                width={800}
            >
                <ModalThemToanHeThong voucherId={voucherId} fetchData={handleLayNguoiDung} />
                <ModalThemCho1CaNhan voucherId={voucherId} fetchData={handleLayNguoiDung} />
                <Table
                    columns={columns}
                    dataSource={data}
                    onChange={null}
                    pagination={{
                        position: ["bottomRight"],
                    }}
                />
            </Modal>
        </>
    );
}

export default ModalNguoiDungCuaVoucher;

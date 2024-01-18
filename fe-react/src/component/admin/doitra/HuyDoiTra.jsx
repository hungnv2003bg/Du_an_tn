import "./style.css";
import {
    Button,
    Form,
    Input,
    Modal,
    Row,
    Table,
    Tooltip,
    notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDoiTra } from "./useDoiTra";
function HuyDoiTra({ id, setData }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        hanldeHuyYeuCau(id);
        setIsModalOpen(false);
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
    async function hanldeHuyYeuCau() {
        const data = await useDoiTra.actions.huyYeuCau(id)
        if (data.data) {
            openNotification(
                "success",
                "Hệ thống",
                "Hủy thành công",
                "bottomRight"
            );
            setData()
        } else {
            openNotification(
                "error",
                "Hệ thống",
                "Hủy thất bại",
                "bottomRight"
            );
        }
    }
    return (
        <>
            {contextHolder}
            <Tooltip title="Từ chối đổi trả" onClick={showModal}>
                <Button style={{
                    marginLeft: "4px"
                }} danger shape="circle" icon={<AiOutlineDelete />} />
            </Tooltip>
            <Modal
                title="Từ chối yêu cầu"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                centered
            ></Modal>
        </>
    );
}

export default HuyDoiTra;

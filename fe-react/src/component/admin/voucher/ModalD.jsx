import React, { useState } from 'react';
import { Button, Modal, Space, notification } from 'antd';
import { AiOutlineDelete } from "react-icons/ai";


import axios from 'axios';
const ModalD = ({ recordId, onActionSuccess }) => {
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
    const [open, setOpen] = useState(false);
    const showModal = () => {
        console.log(recordId);
        setOpen(true);
    };
    const handleOk = () => {
        handleClickDelete(recordId)

        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleClickDelete = async (id) => {

        await axios.patch(`http://localhost:8089/api/voucher/delete/${id}`);
        onActionSuccess();
        openNotification("success", "Hệ thống", "Đổi trạng thái thành công ~", "bottomRight");
    }
    return (
        <>{contextHolder}
            <Space>

                <Button danger shape="circle" icon={<AiOutlineDelete />} onClick={showModal}>

                </Button>

            </Space>
            <Modal
                open={open}
                title="Đổi trạng thái voucher"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>

                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >

                {/* <h1>hello ma voucher</h1>
                <input palaceholder="Mã voucher" value={recordId} ></input> */}
            </Modal>
        </>
    );
};
export default ModalD;
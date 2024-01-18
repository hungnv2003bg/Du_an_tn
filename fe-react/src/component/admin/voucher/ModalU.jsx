import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Modal, Space, notification } from 'antd';
import { FaRegPenToSquare } from "react-icons/fa6";

import {
    Button,
    Form,
    Input,
    Modal,
    Tooltip,
    Select,
    notification,
    Space
} from "antd";
import axios from 'axios';
const ModalU = ({ recordId, onActionSuccess }) => {


    const { Option } = Select;
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
    const handleOk = async () => {
        // Kiểm tra điều kiện validation
        const validationErrors = validateForm();

        if (validationErrors.length === 0) {
            // Gọi hàm cập nhật với dữ liệu từ state editVoucherData và recordId
            await updateVoucher(recordId, editVoucherData);
            onActionSuccess();
            setOpen(false);
        } else {
            // Hiển thị thông báo nếu validation không thành công
            validationErrors.forEach((error) => {
                openNotification("error", "Hệ thống", error, "bottomRight");
            });
        }
    };

    // Hàm kiểm tra validation và trả về mảng chứa các thông báo lỗi
    const validateForm = () => {
        const errors = [];


        if (!editVoucherData.tenVoucher) {
            errors.push("Vui lòng nhập Tên voucher!");
        }

        if (!editVoucherData.soLuong) {
            errors.push("Vui lòng nhập Số lượng!");
        } else if (isNaN(editVoucherData.soLuong) || editVoucherData.soLuong <= 0) {
            errors.push("Số lượng phải là một số dương!");
        }

        if (!editVoucherData.loaiGiam) {
            errors.push("Vui lòng chọn Loại giảm!");
        } else {
            if (editVoucherData.loaiGiam === 'PHANTRAM' && (editVoucherData.giaTriGiam < 0 || editVoucherData.giaTriGiam > 100)) {
                errors.push("Giá trị giảm phần trăm phải nằm trong khoảng từ 0 đến 100!");
            }
            if (editVoucherData.loaiGiam === 'GIAMTHANG' && (editVoucherData.giaTriGiam < 1000)) {
                errors.push("Bạn đang dùng tiền VIỆT đấy ít nhất hãy cho giảm 1000 đ");
            }
        }

        if (!editVoucherData.giaTriGiam) {
            errors.push("Vui lòng nhập Giá trị giảm!");
        } else if (isNaN(editVoucherData.giaTriGiam)) {
            errors.push("Giá trị giảm phải là một số dương lớn hơn 0!");
        }
        return errors;

    };
    const handleCancel = () => {
        setOpen(false);
    };
    const [editVoucherData, setEditVoucherData] = useState({
        tenVoucher: '',
        maVoucher: '',
        loaiGiam: 'PHANTRAM', // Giá trị mặc định là PHANTRAM
        giaTriGiam: '',
        soLuong: '',
    });

    const updateVoucher = async (id, data) => {
        try {
            await axios.put(`http://localhost:8089/api/voucher/update/${id}`, data);
            openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");

        } catch (error) {
            console.error("Error updating voucher:", error);
        }
    };
    useEffect(() => {
        // Gọi handleClickEdit khi recordId thay đổi
        handleClickEdit(recordId);
    }, [recordId]);

    const handleClickEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8089/api/voucher/${id}`);
            const data = response.data;
            console.log(data)
            console.log("Initial tenVoucher value:", data.tenVoucher);

            // Cập nhật state để hiển thị dữ liệu trên form
            setEditVoucherData({
                tenVoucher: data.tenVoucher,
                maVoucher: data.maVoucher,
                loaiGiam: data.loaiGiam,
                giaTriGiam: data.giaTriGiam,
                soLuong: data.soLuong,
            });
        } catch (error) {
            console.error(`Error fetching voucher with id ${id}:`, error);
        }
    };


    return (
        <>{contextHolder}
            <Space>

                <Button style={{
                    color: "green",
                }}
                    shape="circle"
                    icon={<FaRegPenToSquare />}
                    onClick={showModal}>

                </Button>

            </Space>
            <Modal
                open={open}
                title="Cập nhật voucher"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>

                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Tên voucher :</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="Tên voucher"
                        value={editVoucherData.tenVoucher}
                        onChange={(e) => {
                            setEditVoucherData({ ...editVoucherData, tenVoucher: e.target.value })
                        }
                        } />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Loại giảm :</span>
                    <Select
                        style={{ flex: '1' }}
                        value={editVoucherData.loaiGiam}
                        onChange={(value) => setEditVoucherData({ ...editVoucherData, loaiGiam: value })}
                    >
                        <Option value="PHANTRAM">PHANTRAM</Option>
                        <Option value="GIAMTHANG">GIAMTHANG</Option>
                    </Select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Giá trị giảm :</span>
                    <Input size="medium" placeholder="Giá trị giảm" style={{ flex: '1' }}
                        value={editVoucherData.giaTriGiam}
                        onChange={(e) => setEditVoucherData({ ...editVoucherData, giaTriGiam: e.target.value })}
                    /></div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Số lượng :</span>
                    <Input size="medium" placeholder="Số lượng"
                        value={editVoucherData.soLuong} style={{ flex: '1' }}
                        onChange={(e) => setEditVoucherData({ ...editVoucherData, soLuong: e.target.value })}
                    /></div>
            </Modal>
        </>
    );
};
export default ModalU;
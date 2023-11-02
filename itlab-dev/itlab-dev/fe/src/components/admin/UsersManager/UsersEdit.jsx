import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form, Input } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Title from "antd/es/typography/Title";
import UserApi from "../../../api/security/UserApi";
import LoadingSpin from "../../loading/LoadingSpin";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "${label} không được để trống",
    types: {
        number: "${label} không đúng định dạng số",
    },
};
const UsersEdit = () => {
    const { addToast } = useToasts();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { id } = useParams();
    useEffect(() => {
        const getUserDetail = async (id) => {
            const { user } = await UserApi.getUser(id);
            form.setFieldsValue(user);
        };
        getUserDetail(id);
    }, [form, id]);

    const onHandleSubmit = () => {
        form.validateFields().then(async (item) => {
            const formData = {
                Name: item.userName,
                Phone: item.phone,
                Email: item.email,
                Address: item.address,
            };
            const formDataApi = new FormData();
            setLoading(true);
            formDataApi.append("userName", formData.Name);
            formDataApi.append("phone", formData.Phone);
            formDataApi.append("email", formData.Email);
            formDataApi.append("address", formData.Address);
            try {
                await UserApi.updateUser(id, formDataApi);
                setLoading(false);
                addToast("Cập nhật thông tin thành công!", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 1500,
                });
                history.push(`/admin/account`);
            } catch (error) {
                addToast("Cập nhật thông tin thất bại!", {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 1500,
                });
            }
        });
    };

    return (
        <>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Cập nhật sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-3">
                <Title level={4} className="text-uppercase text-center">
                    Cập nhật thông tin
                </Title>
                {loading && <LoadingSpin />}
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 3, offset: 1 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    validateMessages={validateMessages}
                    onFinish={onHandleSubmit}
                >
                    <Form.Item
                        label="Họ & Tên"
                        name="userName"
                        rules={[{ required: true }]}
                    >
                        <Input style={{ height: 30 }} placeholder="Nhập tên..." />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập số điện thoại..."
                            type="number"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập email..."
                            type="email"
                            readOnly
                        />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true }]}
                    >
                        <Input style={{ height: 30 }} placeholder="Nhập địa chỉ..." />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                        <Button type="primary" htmlType="submit" block>
                            Cập nhật thông tin
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default UsersEdit;

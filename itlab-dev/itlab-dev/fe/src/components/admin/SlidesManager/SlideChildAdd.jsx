import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import LoadingSpin from "../../loading/LoadingSpin";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import SlideApi from "../../../api/slide/SlideApi";
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "* ${label} không được để trống",
};
const SlideChildAdd = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { addToast } = useToasts();
    const history = useHistory();
    const [form] = Form.useForm();
    const onHandleSubmit = () => {
        form.validateFields().then(async (item) => {
            const formData = {
                slidesId: id,
                slides: [
                    {
                        title: item.title,
                        slideImage: item.slideImage,
                        subTitle: item.subTitle,
                        url: item.url,
                    }
                ]
            };
            await SlideApi.createItemSlide(formData);
            addToast("Thêm mới slideshow thành công!", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 1000,
            });
            history.push(`/admin/slides`);
        });
    };

    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Tạo slideshow</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-3">
                <Title level={4} className="text-uppercase text-center">
                    Thêm slideshow
                </Title>
                {loading && (
                    <div>
                        <LoadingSpin />
                    </div>
                )}
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    form={form}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label="Tiêu đề chính"
                        name="title"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Tiêu đề chính của slideshow"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập tiêu đề chính của slideshow..."
                        />
                    </Form.Item>
                    <Form.Item
                        label="Tiêu đề phụ"
                        name="subTitle"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Tiêu đề phụ của slideshow"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập tiêu đề phụ slideshow..."
                        />
                    </Form.Item>
                    <Form.Item
                        label="Đường dẫn ảnh"
                        name="slideImage"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Đường dẫn ảnh của slideshow"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập tiêu đề phụ slideshow..."
                        />
                    </Form.Item>
                    <Form.Item
                        label="Đường dẫn URL"
                        name="url"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Đường dẫn URL của slideshow"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập đường dẫn URL của slideshow..."
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onHandleSubmit}
                            block
                        >
                            Thêm mới slideshow
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default SlideChildAdd;

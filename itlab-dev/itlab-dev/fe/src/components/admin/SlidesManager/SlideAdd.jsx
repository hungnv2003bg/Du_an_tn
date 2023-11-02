import React, { useState } from 'react'
import { Breadcrumb, Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useToasts } from 'react-toast-notifications';
import SlideApi from '../../../api/slide/SlideApi';
import LoadingSpin from '../../loading/LoadingSpin';
import Title from 'antd/es/skeleton/Title';

const { TextArea } = Input;
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "* ${label} không được để trống",
    types: {
        number: "* ${label} không đúng định dạng số",
    },
};

const SlideAdd = () => {
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();
    const history = useHistory();
    const [form] = Form.useForm();

    const onHandleSubmit = () => {
        form.validateFields().then(async (item) => {
            const formDataApi = new FormData();
            const formData = {
                slidesName: item.slidesName,
            };
            await SlideApi.createSlide({ slidesName: item.slidesName });
            addToast("Thêm mới thành công!", {
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
                <Breadcrumb.Item>Tạo slide</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-3">
                <Title level={4} className="text-uppercase text-center">
                    Thêm Slide
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
                        label="Tên slide"
                        name="slidesName"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Tên slide"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập tên slide..."
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
    )
}
export default SlideAdd
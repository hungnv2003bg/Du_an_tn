// import MyComponent from './Example/MyComponent';
import {
    Button,
    Col,
    Input,
    InputNumber,
    Modal,
    Row,
    Spin,
    notification,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useGpt } from "../../../plugins/gpt";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { taoSuKien } from "./context";
import { useCrm } from "./crmStore";
import { isValidDateFormat } from "../../../extensions/testDay";
const { RangePicker } = DatePicker;
function TaoSuKienGoiY({ suKien }) {
    const [isShow, setIsShow] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [text, setText] = useState(undefined);
    const [dataSus, setDataSus] = useState({
        tenSuKien: "Đang chờ",
        moTa: "Sự kiện giảm giá",
    });

    const dateFormat = "DD/MM/YYYY";
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
    async function handleSendContext2GPT(context) {
        const data = await useGpt.actions.chat(context);
        var dataNew =
            "{" +
            data.data.choices[0].message.content.split("}")[0].split("{")[1] +
            "}";
        dataNew = JSON.parse(dataNew.replaceAll("\n", ""));
        setDataSus(dataNew);
        setText(true);
    }

    async function handleTaoSuKien() {
        if (!isValidDateFormat(dataSus.ngayBatDau)) {
            openNotification(
                "error",
                "Hệ thống",
                "Ngày bắt đầu không chính xác",
                "bottomRight"
            );
            return;
        }
        if (!isValidDateFormat(dataSus.ngayKetThuc)) {
            openNotification(
                "error",
                "Hệ thống",
                "Ngày kết thúc không chính xác",
                "bottomRight"
            );
            return;
        }
        if (dataSus.tenSuKien == "") {
            openNotification(
                "error",
                "Hệ thống",
                "Vui lòng nhập tên sự kiện",
                "bottomRight"
            );
            return;
        }
        if (dataSus.moTa == "") {
            openNotification(
                "error",
                "Hệ thống",
                "Vui lòng nhập mô tả",
                "bottomRight"
            );
            return;
        }
        if (!dataSus.giaTriGiam) {
            openNotification(
                "error",
                "Hệ thống",
                "Vui lòng nhập giá trị giảm",
                "bottomRight"
            );
            return;
        }
        const data = await useCrm.actions.taoSuKien(dataSus);
        if (data.data) {
            openNotification("success", "Hệ thống", "Tạo thành công", "bottomRight");
        }
    }
    useEffect(() => {
        if (isShow) {
            handleSendContext2GPT(taoSuKien(suKien));
        }
    }, [isShow]);
    return (
        <>
            {contextHolder}
            <span
                onClick={() => {
                    setIsShow(true);
                }}
                className="sussgest"
            >
                {" "}
                {suKien}
            </span>
            <Modal
                title={"Tạo sự kiện giảm giá " + suKien}
                open={isShow}
                onOk={() => {
                    handleTaoSuKien();
                    setIsShow(false);
                }}
                onCancel={() => {
                    setIsShow(false);
                }}
            >
                {text ? (
                    <>
                        <Row>
                            <Col span={24}>Tên sự kiện:</Col>
                            <Col span={24}>
                                <Input
                                    placeholder="Tên sự kiện"
                                    value={dataSus && dataSus.tenSuKien}
                                />
                            </Col>
                        </Row>
                        <Row
                            style={{
                                marginTop: "4px",
                            }}
                        >
                            <Col span={24}>Ngày bắt đầu - ngày kết thúc:</Col>
                            <Col span={24}>
                                <RangePicker
                                    value={[
                                        dayjs(dataSus && dataSus.ngayBatDau, dateFormat),
                                        dayjs(dataSus && dataSus.ngayKetThuc, dateFormat),
                                    ]}
                                    format={dateFormat}
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row
                            style={{
                                marginTop: "4px",
                            }}
                        >
                            <Col span={24}>% giảm:</Col>
                            <Col span={24}>
                                <InputNumber
                                    placeholder="% giảm"
                                    style={{
                                        width: "100%",
                                    }}
                                    value={dataSus && dataSus.giaTriGiam}
                                />
                            </Col>
                        </Row>
                        <Row
                            style={{
                                marginTop: "4px",
                            }}
                        >
                            <Col span={24}>Mô tả:</Col>
                            <Col span={24}>
                                <TextArea
                                    placeholder="% giảm"
                                    rows={4}
                                    value={dataSus && dataSus.moTa}
                                />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                )}
            </Modal>
        </>
    );
}

export default TaoSuKienGoiY;

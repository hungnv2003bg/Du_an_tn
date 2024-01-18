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
import { DatePicker, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { modal } from "./context";
import GoiYTheoThang from "./GoiYTheoThang";
import { useCrm } from "./crmStore";
import { isValidDateFormat } from "../../../extensions/testDay";
const { RangePicker } = DatePicker;
function ModalTaoSuKien({ profit }) {
    const [isShow, setIsShow] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [text, setText] = useState(undefined);
    const [dataSus, setDataSus] = useState({
        tenSuKien: "Đang chờ",
        moTa: "Sự kiện giảm giá",
    });
    const [isFetching, setIsFetching] = useState(false);

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
        setText(data.data.choices[0].message.content.split("}"));
        handleSetText(data.data.choices[0].message.content.split("}")[1]);
        var dataNew =
            "{" +
            data.data.choices[0].message.content.split("}")[0].split("{")[1] +
            "}";
        dataNew = JSON.parse(dataNew.replaceAll("\n", ""));
        setDataSus(dataNew);
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
    const showContentSpan = useRef(undefined);
    function handleSetText(content) {
        let i = 0;
        let dataChat = "";
        const interval = setInterval(() => {
            if (i === content.length) {
                clearInterval(interval);
                setIsFetching(true);
            }
            if (content[i] != undefined) {
                dataChat = dataChat + content[i];
                if (showContentSpan.current?.innerHTML) {
                    showContentSpan.current.innerHTML = dataChat;
                }
                i++;
            }
        }, 1);
    }

    useEffect(() => {
        if (isShow) {
            handleSendContext2GPT(modal(profit));
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
                tạo sự kiện giảm giá
            </span>
            <Modal
                title="Tạo sự kiện giảm giá"
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
                                    onChange={(e) => {
                                        setDataSus({
                                            ...dataSus,
                                            tenSuKien: e.target.value,
                                        });
                                    }}
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
                                    onChange={(e) => {
                                        setDataSus({
                                            ...dataSus,
                                            data: e,
                                        });
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
                                    onChange={(e) => {
                                        setDataSus({
                                            ...dataSus,
                                            giaTriGiam: e,
                                        });
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
                                    onChange={(e) => {
                                        setDataSus({
                                            ...dataSus,
                                            moTa: e.target.value,
                                        });
                                    }}
                                />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                )}
                <Row
                    style={{
                        marginTop: "12px",
                    }}
                >
                    <span ref={showContentSpan}></span>
                </Row>
                {isFetching && (
                    <>
                        <Row
                            style={{
                                marginTop: "12px",
                            }}
                        >
                            <span
                                style={{
                                    color: "red",
                                }}
                            >
                                Trên đây là gợi ý của tôi về sự kiện giảm giá bạn có thể chỉnh
                                sửa lại tùy theo nhu cầu và cung ứng của cửa hàng hiện tại.{" "}
                                <span
                                    style={{
                                        color: "black",
                                    }}
                                >
                                    Tạo sự kiện giảm giá theo từng tháng
                                </span>
                            </span>
                        </Row>
                        <Row
                            style={{
                                marginTop: "12px",
                            }}
                        >
                            <Col span={24}>
                                <GoiYTheoThang thang={1} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={2} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={3} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={4} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={5} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={6} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={7} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={8} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={9} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={10} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={11} profit={profit} />
                            </Col>
                            <Col span={24}>
                                <GoiYTheoThang thang={12} profit={profit} />
                            </Col>
                        </Row>
                    </>
                )}
            </Modal>
        </>
    );
}

export default ModalTaoSuKien;
